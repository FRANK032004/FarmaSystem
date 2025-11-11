// ========================================
// MÓDULO: PUNTO DE VENTA (POS)
// ========================================

const POS = {
    carrito: [],
    clienteSeleccionado: null,
    
    render: function() {
        return `
            <div class="pos-module">
                <h1 class="page-title">
                    <i class="fas fa-cash-register"></i> Punto de Venta
                </h1>
                
                <div class="pos-grid">
                    <!-- Panel de productos -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-search"></i> Buscar Producto
                            </h3>
                        </div>
                        
                        <div class="product-search">
                            <input type="text" 
                                   class="form-control" 
                                   id="searchProduct" 
                                   placeholder="Buscar por nombre, categoría o laboratorio..."
                                   autocomplete="off">
                            <div class="search-results" id="searchResults"></div>
                        </div>
                        
                        <div id="cartItems" style="max-height: 400px; overflow-y: auto;">
                            ${this.renderCarrito()}
                        </div>
                    </div>
                    
                    <!-- Panel de pago -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-file-invoice-dollar"></i> Resumen de Venta
                            </h3>
                        </div>
                        
                        <div class="form-group">
                            <label>Cliente (Opcional)</label>
                            <select class="form-control" id="selectCliente">
                                <option value="">Público General</option>
                                ${this.renderOpcionesClientes()}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Tipo de Comprobante</label>
                            <select class="form-control" id="tipoComprobante">
                                <option value="Boleta">Boleta</option>
                                <option value="Factura">Factura</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Método de Pago</label>
                            <select class="form-control" id="metodoPago">
                                <option value="Efectivo">Efectivo</option>
                                <option value="Tarjeta">Tarjeta</option>
                                <option value="Yape/Plin">Yape/Plin</option>
                            </select>
                        </div>
                        
                        <div class="cart-summary">
                            <div class="cart-summary-row">
                                <span>Subtotal:</span>
                                <span id="subtotal">${formatMoney(this.calcularSubtotal())}</span>
                            </div>
                            <div class="cart-summary-row">
                                <span>IGV (18%):</span>
                                <span id="igv">${formatMoney(this.calcularIGV())}</span>
                            </div>
                            <div class="cart-summary-row total">
                                <span>TOTAL:</span>
                                <span id="total">${formatMoney(this.calcularTotal())}</span>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px; display: flex; gap: 10px;">
                            <button class="btn btn-danger" id="btnLimpiarCarrito" style="flex: 1;">
                                <i class="fas fa-trash"></i> Limpiar
                            </button>
                            <button class="btn btn-success" id="btnProcesarVenta" style="flex: 2;" ${this.carrito.length === 0 ? 'disabled' : ''}>
                                <i class="fas fa-check"></i> Procesar Venta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderCarrito: function() {
        if (this.carrito.length === 0) {
            return `
                <div style="text-align: center; padding: 40px; color: #9ca3af;">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px;"></i>
                    <p>El carrito está vacío</p>
                    <p style="font-size: 0.9rem;">Busque y agregue productos para comenzar</p>
                </div>
            `;
        }
        
        let html = '';
        this.carrito.forEach((item, index) => {
            html += `
                <div class="cart-item">
                    <div style="flex: 1;">
                        <strong>${item.nombre}</strong>
                        <div style="font-size: 0.85rem; color: #6b7280;">
                            ${formatMoney(item.precio)} x ${item.cantidad} = ${formatMoney(item.subtotal)}
                        </div>
                    </div>
                    <div class="quantity-control">
                        <button onclick="POS.cambiarCantidad(${index}, -1)">-</button>
                        <input type="number" value="${item.cantidad}" min="1" max="${item.stockDisponible}"
                               onchange="POS.actualizarCantidad(${index}, this.value)">
                        <button onclick="POS.cambiarCantidad(${index}, 1)">+</button>
                    </div>
                    <button class="btn btn-danger" onclick="POS.eliminarItem(${index})" style="padding: 5px 10px;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });
        
        return html;
    },
    
    renderOpcionesClientes: function() {
        const clientes = db.getClientes();
        return clientes.map(c => 
            `<option value="${c.id}">${c.nombres} ${c.apellidos} - ${c.dni}</option>`
        ).join('');
    },
    
    agregarProducto: function(producto) {
        // Verificar si ya está en el carrito
        const index = this.carrito.findIndex(item => item.productoId === producto.id);
        
        if (index !== -1) {
            // Si ya existe, incrementar cantidad
            if (this.carrito[index].cantidad < producto.stock) {
                this.carrito[index].cantidad++;
                this.carrito[index].subtotal = this.carrito[index].cantidad * this.carrito[index].precio;
            } else {
                showNotification('No hay suficiente stock disponible', 'warning');
                return;
            }
        } else {
            // Si no existe, agregar nuevo
            if (producto.stock === 0) {
                showNotification('Producto sin stock', 'danger');
                return;
            }
            
            this.carrito.push({
                productoId: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1,
                stockDisponible: producto.stock,
                subtotal: producto.precio,
                requiereReceta: producto.requiereReceta
            });
        }
        
        this.actualizarVista();
        showNotification(`${producto.nombre} agregado al carrito`, 'success');
    },
    
    eliminarItem: function(index) {
        this.carrito.splice(index, 1);
        this.actualizarVista();
    },
    
    cambiarCantidad: function(index, cambio) {
        const item = this.carrito[index];
        const nuevaCantidad = item.cantidad + cambio;
        
        if (nuevaCantidad < 1) {
            this.eliminarItem(index);
            return;
        }
        
        if (nuevaCantidad > item.stockDisponible) {
            showNotification('No hay suficiente stock', 'warning');
            return;
        }
        
        item.cantidad = nuevaCantidad;
        item.subtotal = item.cantidad * item.precio;
        this.actualizarVista();
    },
    
    actualizarCantidad: function(index, valor) {
        const cantidad = parseInt(valor);
        const item = this.carrito[index];
        
        if (cantidad < 1) {
            this.eliminarItem(index);
            return;
        }
        
        if (cantidad > item.stockDisponible) {
            showNotification('No hay suficiente stock', 'warning');
            return;
        }
        
        item.cantidad = cantidad;
        item.subtotal = item.cantidad * item.precio;
        this.actualizarVista();
    },
    
    limpiarCarrito: function() {
        if (this.carrito.length === 0) return;
        
        confirmar('¿Desea limpiar el carrito?', (confirmado) => {
            if (confirmado) {
                this.carrito = [];
                this.actualizarVista();
                showNotification('Carrito limpiado', 'info');
            }
        });
    },
    
    calcularSubtotal: function() {
        const total = this.carrito.reduce((sum, item) => sum + item.subtotal, 0);
        return total / 1.18; // Remover IGV para obtener subtotal
    },
    
    calcularIGV: function() {
        const subtotal = this.calcularSubtotal();
        return subtotal * 0.18;
    },
    
    calcularTotal: function() {
        return this.carrito.reduce((sum, item) => sum + item.subtotal, 0);
    },
    
    procesarVenta: function() {
        if (this.carrito.length === 0) {
            showNotification('El carrito está vacío', 'warning');
            return;
        }
        
        // Verificar productos con receta
        const productosConReceta = this.carrito.filter(item => item.requiereReceta);
        if (productosConReceta.length > 0) {
            const nombres = productosConReceta.map(p => p.nombre).join(', ');
            showNotification(`ADVERTENCIA: Los siguientes productos requieren receta médica: ${nombres}`, 'warning');
        }
        
        const tipoComprobante = document.getElementById('tipoComprobante').value;
        const metodoPago = document.getElementById('metodoPago').value;
        const clienteId = document.getElementById('selectCliente').value;
        
        const venta = {
            numeroComprobante: generarNumeroComprobante(tipoComprobante),
            tipoComprobante: tipoComprobante,
            metodoPago: metodoPago,
            clienteId: clienteId ? parseInt(clienteId) : null,
            items: this.carrito.map(item => ({...item})),
            subtotal: this.calcularSubtotal(),
            igv: this.calcularIGV(),
            total: this.calcularTotal()
        };
        
        db.addVenta(venta);
        
        // Mostrar comprobante
        this.mostrarComprobante(venta);
        
        // Limpiar carrito
        this.carrito = [];
        this.actualizarVista();
        
        showNotification('Venta procesada exitosamente', 'success');
    },
    
    mostrarComprobante: function(venta) {
        const cliente = venta.clienteId ? db.getCliente(venta.clienteId) : null;
        
        let html = `
            <div class="modal active">
                <div class="modal-content modal-large">
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2><i class="fas fa-receipt"></i> ${venta.tipoComprobante}</h2>
                        <h3>${venta.numeroComprobante}</h3>
                        <p>${formatDateTime(venta.fecha)}</p>
                    </div>
                    
                    <div style="margin-bottom: 20px; padding: 15px; background: var(--light); border-radius: 8px;">
                        <strong>Cliente:</strong> ${cliente ? `${cliente.nombres} ${cliente.apellidos} - DNI: ${cliente.dni}` : 'Público General'}<br>
                        <strong>Método de Pago:</strong> ${venta.metodoPago}
                    </div>
                    
                    <table style="margin-bottom: 20px;">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cant.</th>
                                <th>P. Unit.</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        venta.items.forEach(item => {
            html += `
                <tr>
                    <td>${item.nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${formatMoney(item.precio)}</td>
                    <td>${formatMoney(item.subtotal)}</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                    
                    <div style="text-align: right; font-size: 1.1rem;">
                        <p>Subtotal: ${formatMoney(venta.subtotal)}</p>
                        <p>IGV (18%): ${formatMoney(venta.igv)}</p>
                        <p style="font-size: 1.3rem; font-weight: bold; color: var(--primary);">
                            TOTAL: ${formatMoney(venta.total)}
                        </p>
                    </div>
                    
                    <div style="margin-top: 30px; text-align: center;">
                        <button class="btn btn-primary" onclick="window.print()">
                            <i class="fas fa-print"></i> Imprimir
                        </button>
                        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                            <i class="fas fa-times"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', html);
    },
    
    actualizarVista: function() {
        document.getElementById('cartItems').innerHTML = this.renderCarrito();
        document.getElementById('subtotal').textContent = formatMoney(this.calcularSubtotal());
        document.getElementById('igv').textContent = formatMoney(this.calcularIGV());
        document.getElementById('total').textContent = formatMoney(this.calcularTotal());
        
        // Actualizar estado del botón Procesar Venta
        const btnProcesarVenta = document.getElementById('btnProcesarVenta');
        if (btnProcesarVenta) {
            btnProcesarVenta.disabled = this.carrito.length === 0;
        }
    },
    
    init: function() {
        // Event listeners para botones
        setTimeout(() => {
            const btnProcesarVenta = document.getElementById('btnProcesarVenta');
            const btnLimpiarCarrito = document.getElementById('btnLimpiarCarrito');
            
            if (btnProcesarVenta) {
                btnProcesarVenta.addEventListener('click', () => {
                    POS.procesarVenta();
                });
            }
            
            if (btnLimpiarCarrito) {
                btnLimpiarCarrito.addEventListener('click', () => {
                    POS.limpiarCarrito();
                });
            }
        }, 100);
        
        // Búsqueda de productos
        setTimeout(() => {
            const searchInput = document.getElementById('searchProduct');
            const searchResults = document.getElementById('searchResults');
            
            if (searchInput) {
                searchInput.addEventListener('input', function(e) {
                    const termino = e.target.value.trim();
                    
                    if (termino.length < 2) {
                        searchResults.innerHTML = '';
                        searchResults.style.display = 'none';
                        return;
                    }
                    
                    const productos = buscarProductos(termino);
                    
                    if (productos.length === 0) {
                        searchResults.innerHTML = '<div style="padding: 15px; text-align: center; color: #9ca3af;">No se encontraron productos</div>';
                        searchResults.style.display = 'block';
                        return;
                    }
                    
                    let html = '';
                    productos.slice(0, 10).forEach(producto => {
                        html += `
                            <div class="search-result-item" onclick="POS.agregarProducto(${JSON.stringify(producto).replace(/"/g, '&quot;')})">
                                <strong>${producto.nombre}</strong>
                                <div style="font-size: 0.85rem; color: #6b7280;">
                                    ${producto.categoria} - ${formatMoney(producto.precio)} - Stock: ${producto.stock}
                                    ${producto.requiereReceta ? '<span class="badge badge-warning">Requiere Receta</span>' : ''}
                                </div>
                            </div>
                        `;
                    });
                    
                    searchResults.innerHTML = html;
                    searchResults.style.display = 'block';
                });
                
                // Cerrar resultados al hacer clic fuera
                document.addEventListener('click', function(e) {
                    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                        searchResults.style.display = 'none';
                    }
                });
            }
        }, 100);
    }
};

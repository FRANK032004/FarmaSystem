// ========================================
// MÓDULO: PROVEEDORES Y COMPRAS
// ========================================

const Proveedores = {
    vistaActual: 'proveedores', // 'proveedores' o 'compras'
    
    render: function() {
        return `
            <div class="proveedores-module">
                <h1 class="page-title">
                    <i class="fas fa-truck"></i> Proveedores y Compras
                </h1>
                
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    <strong>Gestión de Compras:</strong> Este módulo le permite administrar proveedores, 
                    realizar órdenes de compra y recepcionar mercadería para actualizar el inventario automáticamente.
                </div>
                
                <!-- Pestañas -->
                <div class="card">
                    <div style="display: flex; gap: 10px; border-bottom: 2px solid var(--light); padding-bottom: 10px;">
                        <button class="btn ${this.vistaActual === 'proveedores' ? 'btn-primary' : 'btn-secondary'}" 
                                onclick="Proveedores.cambiarVista('proveedores')">
                            <i class="fas fa-building"></i> Proveedores
                        </button>
                        <button class="btn ${this.vistaActual === 'compras' ? 'btn-primary' : 'btn-secondary'}" 
                                onclick="Proveedores.cambiarVista('compras')">
                            <i class="fas fa-shopping-cart"></i> Órdenes de Compra
                        </button>
                    </div>
                </div>
                
                <div id="contenidoProveedores">
                    ${this.vistaActual === 'proveedores' ? this.renderProveedores() : this.renderCompras()}
                </div>
            </div>
        `;
    },
    
    // ========================================
    // VISTA DE PROVEEDORES
    // ========================================
    renderProveedores: function() {
        const proveedores = db.getProveedores();
        
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-building"></i> Listado de Proveedores
                    </h3>
                    <button class="btn btn-primary" onclick="Proveedores.mostrarFormularioProveedor()">
                        <i class="fas fa-plus"></i> Nuevo Proveedor
                    </button>
                </div>
                
                <div class="stats-grid" style="margin-bottom: 20px;">
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Proveedores</h3>
                            <p>${proveedores.length}</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon green">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Promedio Calificación</h3>
                            <p>${(proveedores.reduce((sum, p) => sum + p.calificacion, 0) / proveedores.length || 0).toFixed(1)} ⭐</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon orange">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Compras Realizadas</h3>
                            <p>${db.getCompras().length}</p>
                        </div>
                    </div>
                </div>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Proveedor</th>
                                <th>RUC</th>
                                <th>Contacto</th>
                                <th>Teléfono</th>
                                <th>Categorías</th>
                                <th>Calificación</th>
                                <th>Crédito</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderFilasProveedores(proveedores)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    renderFilasProveedores: function(proveedores) {
        if (proveedores.length === 0) {
            return '<tr><td colspan="9" class="text-center">No hay proveedores registrados</td></tr>';
        }
        
        return proveedores.map(p => `
            <tr>
                <td><strong>${p.id}</strong></td>
                <td><strong>${p.nombre}</strong></td>
                <td>${p.ruc}</td>
                <td>${p.contacto}</td>
                <td>${p.telefono}</td>
                <td><small>${p.categoriaProductos.join(', ')}</small></td>
                <td>${'⭐'.repeat(p.calificacion)}</td>
                <td>${p.diasCredito} días</td>
                <td>
                    <button class="btn btn-success" onclick='Proveedores.nuevaCompra(${p.id})' 
                            style="padding: 5px 10px; margin-right: 5px;" title="Nueva Compra">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="btn btn-info" onclick='Proveedores.verDetallesProveedor(${JSON.stringify(p).replace(/'/g, "\\'")})'
                            style="padding: 5px 10px; margin-right: 5px;" title="Ver Detalles">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-primary" onclick='Proveedores.editarProveedor(${JSON.stringify(p).replace(/'/g, "\\'")})'
                            style="padding: 5px 10px; margin-right: 5px;" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="Proveedores.eliminarProveedor(${p.id})"
                            style="padding: 5px 10px;" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },
    
    // ========================================
    // VISTA DE COMPRAS
    // ========================================
    renderCompras: function() {
        const compras = db.getCompras();
        const pendientes = compras.filter(c => c.estado === 'Pendiente');
        const recibidas = compras.filter(c => c.estado === 'Recibida');
        const totalInvertido = compras.reduce((sum, c) => sum + c.total, 0);
        
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-shopping-cart"></i> Órdenes de Compra
                    </h3>
                    <button class="btn btn-primary" onclick="Proveedores.mostrarFormularioCompra()">
                        <i class="fas fa-plus"></i> Nueva Orden de Compra
                    </button>
                </div>
                
                <div class="stats-grid" style="margin-bottom: 20px;">
                    <div class="stat-card">
                        <div class="stat-icon orange">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Órdenes Pendientes</h3>
                            <p>${pendientes.length}</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon green">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Órdenes Recibidas</h3>
                            <p>${recibidas.length}</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Invertido</h3>
                            <p>${formatMoney(totalInvertido)}</p>
                        </div>
                    </div>
                </div>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>N° Orden</th>
                                <th>Fecha</th>
                                <th>Proveedor</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderFilasCompras(compras)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    renderFilasCompras: function(compras) {
        if (compras.length === 0) {
            return '<tr><td colspan="7" class="text-center">No hay órdenes de compra registradas</td></tr>';
        }
        
        return compras.slice().reverse().map(c => {
            const proveedor = db.getProveedor(c.proveedorId);
            const estadoClass = c.estado === 'Recibida' ? 'badge-success' : 'badge-warning';
            
            return `
                <tr>
                    <td><strong>OC-${String(c.id).padStart(6, '0')}</strong></td>
                    <td>${formatDate(c.fecha)}</td>
                    <td>${proveedor ? proveedor.nombre : 'N/A'}</td>
                    <td>${c.items.length} productos</td>
                    <td><strong>${formatMoney(c.total)}</strong></td>
                    <td><span class="badge ${estadoClass}">${c.estado}</span></td>
                    <td>
                        <button class="btn btn-info" onclick='Proveedores.verDetallesCompra(${JSON.stringify(c).replace(/'/g, "\\'")})'
                                style="padding: 5px 10px; margin-right: 5px;">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${c.estado === 'Pendiente' ? `
                            <button class="btn btn-success" onclick="Proveedores.recibirCompra(${c.id})"
                                    style="padding: 5px 10px;">
                                <i class="fas fa-check"></i> Recibir
                            </button>
                        ` : `
                            <span class="badge badge-success">
                                <i class="fas fa-check-circle"></i> Recibida
                            </span>
                        `}
                    </td>
                </tr>
            `;
        }).join('');
    },
    
    // ========================================
    // FORMULARIOS
    // ========================================
    mostrarFormularioProveedor: function(proveedor = null) {
        const esEdicion = proveedor !== null;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2>
                    <i class="fas fa-${esEdicion ? 'edit' : 'plus'}"></i>
                    ${esEdicion ? 'Editar' : 'Nuevo'} Proveedor
                </h2>
                
                <form id="formProveedor" onsubmit="event.preventDefault(); Proveedores.guardarProveedor(${esEdicion})">
                    <input type="hidden" id="proveedorId" value="${proveedor ? proveedor.id : ''}">
                    
                    <h3 style="color: var(--primary); margin: 20px 0 15px 0;">Datos de la Empresa</h3>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nombre de la Empresa *</label>
                            <input type="text" class="form-control" id="proveedorNombre" 
                                   value="${proveedor ? proveedor.nombre : ''}" required>
                        </div>
                        <div class="form-group">
                            <label>RUC *</label>
                            <input type="text" class="form-control" id="proveedorRuc" 
                                   value="${proveedor ? proveedor.ruc : ''}"
                                   pattern="[0-9]{11}" maxlength="11" required>
                            <small>11 dígitos</small>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Dirección *</label>
                        <input type="text" class="form-control" id="proveedorDireccion" 
                               value="${proveedor ? proveedor.direccion : ''}" required>
                    </div>
                    
                    <h3 style="color: var(--primary); margin: 25px 0 15px 0;">Información de Contacto</h3>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Persona de Contacto *</label>
                            <input type="text" class="form-control" id="proveedorContacto" 
                                   value="${proveedor ? proveedor.contacto : ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Teléfono *</label>
                            <input type="text" class="form-control" id="proveedorTelefono" 
                                   value="${proveedor ? proveedor.telefono : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" class="form-control" id="proveedorEmail" 
                               value="${proveedor ? proveedor.email : ''}" required>
                    </div>
                    
                    <h3 style="color: var(--primary); margin: 25px 0 15px 0;">Información Comercial</h3>
                    
                    <div class="form-group">
                        <label>Categorías de Productos *</label>
                        <input type="text" class="form-control" id="proveedorCategorias" 
                               value="${proveedor ? proveedor.categoriaProductos.join(', ') : ''}"
                               placeholder="Ej: Medicamentos, Vitaminas, Equipos médicos" required>
                        <small>Separar por comas</small>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Días de Crédito</label>
                            <input type="number" class="form-control" id="proveedorDiasCredito" 
                                   value="${proveedor ? proveedor.diasCredito : 30}" min="0" max="180">
                        </div>
                        ${esEdicion ? `
                            <div class="form-group">
                                <label>Calificación (1-5 estrellas)</label>
                                <select class="form-control" id="proveedorCalificacion">
                                    ${[1,2,3,4,5].map(n => `
                                        <option value="${n}" ${proveedor.calificacion === n ? 'selected' : ''}>
                                            ${'⭐'.repeat(n)} (${n})
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Guardar
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    mostrarFormularioCompra: function() {
        const proveedores = db.getProveedores();
        
        if (proveedores.length === 0) {
            showNotification('Debe registrar proveedores primero', 'warning');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2><i class="fas fa-shopping-cart"></i> Nueva Orden de Compra</h2>
                
                <form id="formCompra" onsubmit="event.preventDefault(); Proveedores.guardarCompra()">
                    <div class="form-group">
                        <label>Seleccionar Proveedor *</label>
                        <select class="form-control" id="compraProveedor" required>
                            <option value="">Seleccionar...</option>
                            ${proveedores.map(p => `
                                <option value="${p.id}">${p.nombre} - ${p.ruc}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <h3 style="color: var(--primary); margin: 25px 0 15px 0;">
                        <i class="fas fa-list"></i> Productos a Ordenar
                    </h3>
                    
                    <div id="productosCompra">
                        <div class="producto-compra-item" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr auto; gap: 10px; margin-bottom: 10px; align-items: end;">
                            <div class="form-group" style="margin: 0;">
                                <label>Producto</label>
                                <input type="text" class="form-control" name="nombreProducto" placeholder="Nombre del producto" required>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label>Cantidad</label>
                                <input type="number" class="form-control" name="cantidad" min="1" value="1" required>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label>Costo Unit.</label>
                                <input type="number" class="form-control" name="costoUnitario" step="0.01" min="0" placeholder="0.00" required>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label>P. Venta</label>
                                <input type="number" class="form-control" name="precioVenta" step="0.01" min="0" placeholder="0.00" required>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label>Lote</label>
                                <input type="text" class="form-control" name="lote" placeholder="L2024..." required>
                            </div>
                            <div class="form-group" style="margin: 0;">
                                <label>Vencimiento</label>
                                <input type="date" class="form-control" name="vencimiento" required>
                            </div>
                            <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()" style="padding: 10px 15px;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    
                    <button type="button" class="btn btn-secondary" onclick="Proveedores.agregarProductoCompra()" style="margin-top: 10px;">
                        <i class="fas fa-plus"></i> Agregar Producto
                    </button>
                    
                    <div style="margin-top: 30px; padding: 20px; background: var(--light); border-radius: 8px;">
                        <h3 style="color: var(--primary);">Resumen de la Orden</h3>
                        <p><strong>Total de productos:</strong> <span id="totalProductos">1</span></p>
                        <p style="font-size: 1.3rem; color: var(--primary);"><strong>TOTAL:</strong> <span id="totalCompra">S/ 0.00</span></p>
                    </div>
                    
                    <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Generar Orden
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Actualizar total al cambiar valores
        const form = document.getElementById('formCompra');
        form.addEventListener('input', () => this.actualizarTotalCompra());
    },
    
    agregarProductoCompra: function() {
        const container = document.getElementById('productosCompra');
        const div = document.createElement('div');
        div.className = 'producto-compra-item';
        div.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr auto; gap: 10px; margin-bottom: 10px; align-items: end;';
        div.innerHTML = `
            <div class="form-group" style="margin: 0;">
                <input type="text" class="form-control" name="nombreProducto" placeholder="Nombre del producto" required>
            </div>
            <div class="form-group" style="margin: 0;">
                <input type="number" class="form-control" name="cantidad" min="1" value="1" required>
            </div>
            <div class="form-group" style="margin: 0;">
                <input type="number" class="form-control" name="costoUnitario" step="0.01" min="0" placeholder="0.00" required>
            </div>
            <div class="form-group" style="margin: 0;">
                <input type="number" class="form-control" name="precioVenta" step="0.01" min="0" placeholder="0.00" required>
            </div>
            <div class="form-group" style="margin: 0;">
                <input type="text" class="form-control" name="lote" placeholder="L2024..." required>
            </div>
            <div class="form-group" style="margin: 0;">
                <input type="date" class="form-control" name="vencimiento" required>
            </div>
            <button type="button" class="btn btn-danger" onclick="this.parentElement.remove(); Proveedores.actualizarTotalCompra();" style="padding: 10px 15px;">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(div);
        this.actualizarTotalCompra();
    },
    
    actualizarTotalCompra: function() {
        const items = document.querySelectorAll('.producto-compra-item');
        let total = 0;
        
        items.forEach(item => {
            const cantidad = parseFloat(item.querySelector('[name="cantidad"]').value) || 0;
            const costo = parseFloat(item.querySelector('[name="costoUnitario"]').value) || 0;
            total += cantidad * costo;
        });
        
        document.getElementById('totalProductos').textContent = items.length;
        document.getElementById('totalCompra').textContent = formatMoney(total);
    },
    
    nuevaCompra: function(proveedorId) {
        this.mostrarFormularioCompra();
        setTimeout(() => {
            document.getElementById('compraProveedor').value = proveedorId;
        }, 100);
    },
    
    // ========================================
    // GUARDAR DATOS
    // ========================================
    guardarProveedor: function(esEdicion) {
        const categorias = document.getElementById('proveedorCategorias').value
            .split(',')
            .map(c => c.trim())
            .filter(c => c);
        
        const data = {
            nombre: document.getElementById('proveedorNombre').value,
            ruc: document.getElementById('proveedorRuc').value,
            contacto: document.getElementById('proveedorContacto').value,
            telefono: document.getElementById('proveedorTelefono').value,
            email: document.getElementById('proveedorEmail').value,
            direccion: document.getElementById('proveedorDireccion').value,
            categoriaProductos: categorias,
            diasCredito: parseInt(document.getElementById('proveedorDiasCredito').value)
        };
        
        if (esEdicion) {
            const id = parseInt(document.getElementById('proveedorId').value);
            data.calificacion = parseInt(document.getElementById('proveedorCalificacion').value);
            db.updateProveedor(id, data);
            showNotification('Proveedor actualizado exitosamente', 'success');
        } else {
            db.addProveedor(data);
            showNotification('Proveedor registrado exitosamente', 'success');
        }
        
        document.querySelector('.modal').remove();
        app.changeModule('proveedores');
    },
    
    guardarCompra: function() {
        const proveedorId = parseInt(document.getElementById('compraProveedor').value);
        const items = [];
        
        document.querySelectorAll('.producto-compra-item').forEach(item => {
            const cantidad = parseInt(item.querySelector('[name="cantidad"]').value);
            const costoUnitario = parseFloat(item.querySelector('[name="costoUnitario"]').value);
            const precioVenta = parseFloat(item.querySelector('[name="precioVenta"]').value);
            
            items.push({
                nombreProducto: item.querySelector('[name="nombreProducto"]').value,
                cantidad: cantidad,
                costoUnitario: costoUnitario,
                precioVenta: precioVenta,
                lote: item.querySelector('[name="lote"]').value,
                vencimiento: item.querySelector('[name="vencimiento"]').value,
                subtotal: cantidad * costoUnitario
            });
        });
        
        const total = items.reduce((sum, item) => sum + item.subtotal, 0);
        
        const compra = {
            proveedorId: proveedorId,
            items: items,
            total: total
        };
        
        db.addCompra(compra);
        showNotification('Orden de compra generada exitosamente', 'success');
        
        document.querySelector('.modal').remove();
        this.vistaActual = 'compras';
        app.changeModule('proveedores');
    },
    
    recibirCompra: function(id) {
        confirmar('¿Confirma que ha recibido esta compra? El inventario se actualizará automáticamente.', (confirmado) => {
            if (confirmado) {
                db.updateCompra(id, { estado: 'Recibida', fechaRecepcion: new Date().toISOString() });
                showNotification('Compra recibida. Inventario actualizado.', 'success');
                app.changeModule('proveedores');
            }
        });
    },
    
    // ========================================
    // VER DETALLES
    // ========================================
    verDetallesProveedor: function(proveedor) {
        const compras = db.getCompras().filter(c => c.proveedorId === proveedor.id);
        const totalComprado = compras.reduce((sum, c) => sum + c.total, 0);
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2><i class="fas fa-building"></i> Detalles del Proveedor</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin: 25px 0;">
                    <div>
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Información de la Empresa</h3>
                        <p><strong>Razón Social:</strong> ${proveedor.nombre}</p>
                        <p><strong>RUC:</strong> ${proveedor.ruc}</p>
                        <p><strong>Dirección:</strong> ${proveedor.direccion}</p>
                        <p><strong>Categorías:</strong> ${proveedor.categoriaProductos.join(', ')}</p>
                    </div>
                    <div>
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Información de Contacto</h3>
                        <p><strong>Contacto:</strong> ${proveedor.contacto}</p>
                        <p><strong>Teléfono:</strong> ${proveedor.telefono}</p>
                        <p><strong>Email:</strong> ${proveedor.email}</p>
                        <p><strong>Días de Crédito:</strong> ${proveedor.diasCredito} días</p>
                    </div>
                </div>
                
                <div class="stats-grid" style="margin: 25px 0;">
                    <div class="stat-card">
                        <div class="stat-icon green">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Calificación</h3>
                            <p>${'⭐'.repeat(proveedor.calificacion)} (${proveedor.calificacion}/5)</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Compras</h3>
                            <p>${compras.length}</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon orange">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Comprado</h3>
                            <p>${formatMoney(totalComprado)}</p>
                        </div>
                    </div>
                </div>
                
                ${compras.length > 0 ? `
                    <h3 style="color: var(--primary); margin: 25px 0 15px 0;">
                        <i class="fas fa-history"></i> Historial de Compras
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>N° Orden</th>
                                <th>Fecha</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${compras.slice().reverse().map(c => `
                                <tr>
                                    <td>OC-${String(c.id).padStart(6, '0')}</td>
                                    <td>${formatDate(c.fecha)}</td>
                                    <td>${c.items.length} productos</td>
                                    <td>${formatMoney(c.total)}</td>
                                    <td><span class="badge badge-${c.estado === 'Recibida' ? 'success' : 'warning'}">${c.estado}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : '<p class="text-center" style="color: #9ca3af; padding: 20px;">No hay compras registradas con este proveedor</p>'}
                
                <div style="margin-top: 25px; text-align: center;">
                    <button class="btn btn-success" onclick="Proveedores.nuevaCompra(${proveedor.id}); this.closest('.modal').remove();">
                        <i class="fas fa-shopping-cart"></i> Nueva Compra
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    verDetallesCompra: function(compra) {
        const proveedor = db.getProveedor(compra.proveedorId);
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2><i class="fas fa-file-invoice"></i> Orden de Compra</h2>
                    <h3>OC-${String(compra.id).padStart(6, '0')}</h3>
                    <p>${formatDateTime(compra.fecha)}</p>
                    <span class="badge badge-${compra.estado === 'Recibida' ? 'success' : 'warning'}" 
                          style="font-size: 1rem; padding: 8px 16px;">
                        ${compra.estado}
                    </span>
                </div>
                
                <div style="background: var(--light); padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                    <h3 style="color: var(--primary); margin-bottom: 10px;">
                        <i class="fas fa-building"></i> Proveedor
                    </h3>
                    <p><strong>${proveedor ? proveedor.nombre : 'N/A'}</strong></p>
                    <p>RUC: ${proveedor ? proveedor.ruc : 'N/A'}</p>
                    <p>Contacto: ${proveedor ? proveedor.contacto : 'N/A'} - ${proveedor ? proveedor.telefono : 'N/A'}</p>
                </div>
                
                <h3 style="color: var(--primary); margin-bottom: 15px;">
                    <i class="fas fa-list"></i> Productos Ordenados
                </h3>
                <table style="margin-bottom: 25px;">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Costo Unit.</th>
                            <th>P. Venta</th>
                            <th>Lote</th>
                            <th>Vencimiento</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${compra.items.map(item => `
                            <tr>
                                <td><strong>${item.nombreProducto}</strong></td>
                                <td>${item.cantidad}</td>
                                <td>${formatMoney(item.costoUnitario)}</td>
                                <td>${formatMoney(item.precioVenta)}</td>
                                <td>${item.lote}</td>
                                <td>${formatDate(item.vencimiento)}</td>
                                <td>${formatMoney(item.subtotal)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div style="text-align: right; font-size: 1.2rem;">
                    <p style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">
                        TOTAL: ${formatMoney(compra.total)}
                    </p>
                </div>
                
                ${compra.estado === 'Recibida' ? `
                    <div class="alert alert-success" style="margin-top: 20px;">
                        <i class="fas fa-check-circle"></i>
                        <strong>Compra Recibida:</strong> ${formatDateTime(compra.fechaRecepcion)}
                        <br>El inventario fue actualizado automáticamente.
                    </div>
                ` : ''}
                
                <div style="margin-top: 25px; text-align: center; display: flex; gap: 10px; justify-content: center;">
                    ${compra.estado === 'Pendiente' ? `
                        <button class="btn btn-success" onclick="Proveedores.recibirCompra(${compra.id}); this.closest('.modal').remove();">
                            <i class="fas fa-check"></i> Marcar como Recibida
                        </button>
                    ` : ''}
                    <button class="btn btn-primary" onclick="window.print()">
                        <i class="fas fa-print"></i> Imprimir
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    // ========================================
    // OTRAS FUNCIONES
    // ========================================
    editarProveedor: function(proveedor) {
        this.mostrarFormularioProveedor(proveedor);
    },
    
    eliminarProveedor: function(id) {
        const proveedor = db.getProveedor(id);
        const compras = db.getCompras().filter(c => c.proveedorId === id);
        
        if (compras.length > 0) {
            showNotification('No puede eliminar un proveedor con compras registradas', 'danger');
            return;
        }
        
        confirmar(`¿Está seguro de eliminar al proveedor "${proveedor.nombre}"?`, (confirmado) => {
            if (confirmado) {
                db.deleteProveedor(id);
                showNotification('Proveedor eliminado', 'success');
                app.changeModule('proveedores');
            }
        });
    },
    
    cambiarVista: function(vista) {
        this.vistaActual = vista;
        app.changeModule('proveedores');
    },
    
    init: function() {
        // Inicialización si es necesaria
    }
};

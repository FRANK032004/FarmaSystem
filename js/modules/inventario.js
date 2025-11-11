// ========================================
// MÓDULO: INVENTARIO
// ========================================

const Inventario = {
    filtroCategoria: 'todos',
    filtroStock: 'todos',
    
    render: function() {
        return `
            <div class="inventario-module">
                <h1 class="page-title">
                    <i class="fas fa-boxes"></i> Gestión de Inventario
                </h1>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-filter"></i> Filtros y Acciones
                        </h3>
                        <button class="btn btn-primary" onclick="Inventario.mostrarFormularioProducto()">
                            <i class="fas fa-plus"></i> Nuevo Producto
                        </button>
                    </div>
                    
                    <div class="form-row" style="margin-bottom: 20px;">
                        <div class="form-group">
                            <label>Buscar Producto</label>
                            <input type="text" class="form-control" id="searchInventario" placeholder="Nombre, categoría, laboratorio...">
                        </div>
                        <div class="form-group">
                            <label>Categoría</label>
                            <select class="form-control" id="filtroCategoria" onchange="Inventario.aplicarFiltros()">
                                <option value="todos">Todas las categorías</option>
                                ${this.renderOpcionesCategorias()}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Estado de Stock</label>
                            <select class="form-control" id="filtroStock" onchange="Inventario.aplicarFiltros()">
                                <option value="todos">Todos</option>
                                <option value="normal">Stock Normal</option>
                                <option value="bajo">Stock Bajo</option>
                                <option value="agotado">Agotado</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="table-container">
                        <table id="tablaInventario">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Laboratorio</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Lote</th>
                                    <th>Vencimiento</th>
                                    <th>Receta</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="inventarioBody">
                                ${this.renderProductos()}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Alertas de vencimiento -->
                ${this.renderAlertasVencimiento()}
            </div>
        `;
    },
    
    renderOpcionesCategorias: function() {
        const categorias = getCategorias();
        return categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    },
    
    renderProductos: function(productos = null) {
        if (!productos) {
            productos = db.getProductos();
        }
        
        if (productos.length === 0) {
            return '<tr><td colspan="10" class="text-center">No se encontraron productos</td></tr>';
        }
        
        return productos.map(p => {
            const diasVenc = diasHastaVencimiento(p.vencimiento);
            const vencidoClass = diasVenc < 0 ? 'danger' : diasVenc <= 90 ? 'warning' : 'success';
            
            return `
                <tr>
                    <td><strong>${p.id}</strong></td>
                    <td>${p.nombre}</td>
                    <td>${p.categoria}</td>
                    <td>${p.laboratorio}</td>
                    <td>${formatMoney(p.precio)}</td>
                    <td>
                        <span class="badge ${getStockBadgeClass(p.stock, p.minStock)}">
                            ${p.stock} und.
                        </span>
                    </td>
                    <td>${p.lote}</td>
                    <td>
                        <span class="badge badge-${vencidoClass}">
                            ${formatDate(p.vencimiento)}
                            ${diasVenc < 0 ? '(VENCIDO)' : diasVenc <= 90 ? `(${diasVenc}d)` : ''}
                        </span>
                    </td>
                    <td>
                        ${p.requiereReceta ? '<span class="badge badge-warning">Sí</span>' : '<span class="badge badge-info">No</span>'}
                    </td>
                    <td>
                        <button class="btn btn-primary" onclick='Inventario.editarProducto(${JSON.stringify(p).replace(/'/g, "\\'")})' style="padding: 5px 10px; margin-right: 5px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" onclick="Inventario.eliminarProducto(${p.id})" style="padding: 5px 10px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },
    
    renderAlertasVencimiento: function() {
        const vencidos = getProductosVencidos();
        const proximosVencer = getProductosProximosVencer();
        
        if (vencidos.length === 0 && proximosVencer.length === 0) {
            return '';
        }
        
        let html = '<div class="card" style="margin-top: 25px;"><div class="card-header"><h3 class="card-title"><i class="fas fa-exclamation-triangle"></i> Alertas de Vencimiento</h3></div>';
        
        if (vencidos.length > 0) {
            html += `
                <div class="alert alert-danger">
                    <strong>Productos Vencidos (${vencidos.length}):</strong>
                    ${vencidos.map(p => `${p.nombre} (Lote: ${p.lote})`).join(', ')}
                </div>
            `;
        }
        
        if (proximosVencer.length > 0) {
            html += `
                <div class="alert alert-warning">
                    <strong>Próximos a Vencer (${proximosVencer.length}):</strong>
                    ${proximosVencer.map(p => `${p.nombre} (${diasHastaVencimiento(p.vencimiento)} días)`).join(', ')}
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    },
    
    aplicarFiltros: function() {
        const busqueda = document.getElementById('searchInventario').value.toLowerCase();
        const categoria = document.getElementById('filtroCategoria').value;
        const stock = document.getElementById('filtroStock').value;
        
        let productos = db.getProductos();
        
        // Filtro de búsqueda
        if (busqueda) {
            productos = productos.filter(p => 
                p.nombre.toLowerCase().includes(busqueda) ||
                p.categoria.toLowerCase().includes(busqueda) ||
                p.laboratorio.toLowerCase().includes(busqueda)
            );
        }
        
        // Filtro de categoría
        if (categoria !== 'todos') {
            productos = productos.filter(p => p.categoria === categoria);
        }
        
        // Filtro de stock
        if (stock === 'bajo') {
            productos = productos.filter(p => p.stock <= p.minStock && p.stock > 0);
        } else if (stock === 'agotado') {
            productos = productos.filter(p => p.stock === 0);
        } else if (stock === 'normal') {
            productos = productos.filter(p => p.stock > p.minStock);
        }
        
        document.getElementById('inventarioBody').innerHTML = this.renderProductos(productos);
    },
    
    mostrarFormularioProducto: function(producto = null) {
        const esEdicion = producto !== null;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2>
                    <i class="fas fa-${esEdicion ? 'edit' : 'plus'}"></i> 
                    ${esEdicion ? 'Editar' : 'Nuevo'} Producto
                </h2>
                
                <form id="formProducto" onsubmit="event.preventDefault(); Inventario.guardarProducto(${esEdicion})">
                    <input type="hidden" id="productoId" value="${producto ? producto.id : ''}">
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nombre del Producto *</label>
                            <input type="text" class="form-control" id="productoNombre" 
                                   value="${producto ? producto.nombre : ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Categoría *</label>
                            <select class="form-control" id="productoCategoria" required>
                                <option value="">Seleccionar...</option>
                                ${getCategorias().map(cat => 
                                    `<option value="${cat}" ${producto && producto.categoria === cat ? 'selected' : ''}>${cat}</option>`
                                ).join('')}
                                <option value="NUEVA">+ Nueva Categoría</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Laboratorio *</label>
                            <input type="text" class="form-control" id="productoLaboratorio" 
                                   value="${producto ? producto.laboratorio : ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Precio Unitario (S/) *</label>
                            <input type="number" class="form-control" id="productoPrecio" step="0.01" min="0"
                                   value="${producto ? producto.precio : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Stock Actual *</label>
                            <input type="number" class="form-control" id="productoStock" min="0"
                                   value="${producto ? producto.stock : ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Stock Mínimo *</label>
                            <input type="number" class="form-control" id="productoMinStock" min="0"
                                   value="${producto ? producto.minStock : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Lote *</label>
                            <input type="text" class="form-control" id="productoLote" 
                                   value="${producto ? producto.lote : ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Fecha de Vencimiento *</label>
                            <input type="date" class="form-control" id="productoVencimiento" 
                                   value="${producto ? producto.vencimiento : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="productoRequiereReceta" 
                                   ${producto && producto.requiereReceta ? 'checked' : ''}>
                            ¿Requiere Receta Médica?
                        </label>
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
        
        // Manejar nueva categoría
        document.getElementById('productoCategoria').addEventListener('change', function(e) {
            if (e.target.value === 'NUEVA') {
                const nueva = prompt('Ingrese el nombre de la nueva categoría:');
                if (nueva) {
                    const option = document.createElement('option');
                    option.value = nueva;
                    option.text = nueva;
                    option.selected = true;
                    e.target.add(option, e.target.options.length - 1);
                }
            }
        });
    },
    
    guardarProducto: function(esEdicion) {
        const data = {
            nombre: document.getElementById('productoNombre').value,
            categoria: document.getElementById('productoCategoria').value,
            laboratorio: document.getElementById('productoLaboratorio').value,
            precio: parseFloat(document.getElementById('productoPrecio').value),
            stock: parseInt(document.getElementById('productoStock').value),
            minStock: parseInt(document.getElementById('productoMinStock').value),
            lote: document.getElementById('productoLote').value,
            vencimiento: document.getElementById('productoVencimiento').value,
            requiereReceta: document.getElementById('productoRequiereReceta').checked
        };
        
        if (esEdicion) {
            const id = parseInt(document.getElementById('productoId').value);
            db.updateProducto(id, data);
            showNotification('Producto actualizado exitosamente', 'success');
        } else {
            db.addProducto(data);
            showNotification('Producto agregado exitosamente', 'success');
        }
        
        document.querySelector('.modal').remove();
        app.changeModule('inventario');
    },
    
    editarProducto: function(producto) {
        this.mostrarFormularioProducto(producto);
    },
    
    eliminarProducto: function(id) {
        const producto = db.getProducto(id);
        confirmar(`¿Está seguro de eliminar "${producto.nombre}"?`, (confirmado) => {
            if (confirmado) {
                db.deleteProducto(id);
                showNotification('Producto eliminado', 'success');
                app.changeModule('inventario');
            }
        });
    },
    
    init: function() {
        setTimeout(() => {
            const searchInput = document.getElementById('searchInventario');
            if (searchInput) {
                searchInput.addEventListener('input', () => this.aplicarFiltros());
            }
        }, 100);
    }
};

// ========================================
// MÓDULO: DASHBOARD
// ========================================

const Dashboard = {
    render: function() {
        const productos = db.getProductos();
        const clientes = db.getClientes();
        const proveedores = db.getProveedores();
        const compras = db.getCompras();
        const ventasHoy = getVentasHoy();
        const ventasMes = getVentasMes();
        const stockBajo = getProductosStockBajo();
        const sinStock = getProductosSinStock();
        const proximosVencer = getProductosProximosVencer();
        const vencidos = getProductosVencidos();
        
        const totalVentasHoy = calcularTotalVentas(ventasHoy);
        const totalVentasMes = calcularTotalVentas(ventasMes);
        const comprasPendientes = compras.filter(c => c.estado === 'Pendiente');
        
        return `
            <div class="dashboard">
                <h1 class="page-title">
                    <i class="fas fa-home"></i> Dashboard - Panel de Control
                </h1>
                
                <!-- Estadísticas principales -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Ventas Hoy</h3>
                            <p>${formatMoney(totalVentasHoy)}</p>
                            <small>${ventasHoy.length} transacciones</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon green">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Ventas del Mes</h3>
                            <p>${formatMoney(totalVentasMes)}</p>
                            <small>${ventasMes.length} transacciones</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon orange">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Productos</h3>
                            <p>${productos.length}</p>
                            <small>${productos.reduce((sum, p) => sum + p.stock, 0)} unidades</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Clientes Registrados</h3>
                            <p>${clientes.length}</p>
                            <small>Base de datos</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon purple">
                            <i class="fas fa-truck"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Proveedores Activos</h3>
                            <p>${proveedores.length}</p>
                            <small>${comprasPendientes.length} órdenes pendientes</small>
                        </div>
                    </div>
                </div>
                
                <!-- Alertas -->
                ${this.renderAlertas(stockBajo, sinStock, proximosVencer, vencidos)}
                
                <!-- Gráficos y tablas -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-top: 25px;">
                    ${this.renderProductosMasVendidos()}
                    ${this.renderUltimasVentas()}
                </div>
            </div>
        `;
    },
    
    renderAlertas: function(stockBajo, sinStock, proximosVencer, vencidos) {
        let html = '<div class="alerts-section">';
        
        if (vencidos.length > 0) {
            html += `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>¡ATENCIÓN!</strong> Hay ${vencidos.length} producto(s) vencido(s).
                    <a href="#" onclick="app.changeModule('inventario')" style="margin-left: 10px; color: inherit; text-decoration: underline;">Ver detalles</a>
                </div>
            `;
        }
        
        if (proximosVencer.length > 0) {
            html += `
                <div class="alert alert-warning">
                    <i class="fas fa-clock"></i>
                    <strong>Alerta:</strong> ${proximosVencer.length} producto(s) próximo(s) a vencer (menos de 90 días).
                    <a href="#" onclick="app.changeModule('inventario')" style="margin-left: 10px; color: inherit; text-decoration: underline;">Ver detalles</a>
                </div>
            `;
        }
        
        if (sinStock.length > 0) {
            html += `
                <div class="alert alert-danger">
                    <i class="fas fa-box-open"></i>
                    <strong>Sin Stock:</strong> ${sinStock.length} producto(s) agotado(s).
                    <a href="#" onclick="app.changeModule('inventario')" style="margin-left: 10px; color: inherit; text-decoration: underline;">Ver inventario</a>
                </div>
            `;
        }
        
        if (stockBajo.length > 0) {
            html += `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-circle"></i>
                    <strong>Stock Bajo:</strong> ${stockBajo.length} producto(s) con stock bajo.
                    <a href="#" onclick="app.changeModule('inventario')" style="margin-left: 10px; color: inherit; text-decoration: underline;">Revisar</a>
                </div>
            `;
        }
        
        if (stockBajo.length === 0 && sinStock.length === 0 && proximosVencer.length === 0 && vencidos.length === 0) {
            html += `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle"></i>
                    <strong>Todo en orden:</strong> No hay alertas pendientes en este momento.
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    },
    
    renderProductosMasVendidos: function() {
        const masVendidos = getProductosMasVendidos(5);
        
        let html = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-trophy"></i> Productos Más Vendidos
                    </h3>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        if (masVendidos.length > 0) {
            masVendidos.forEach((item, index) => {
                html += `
                    <tr>
                        <td><strong>${index + 1}</strong></td>
                        <td>${item.nombre}</td>
                        <td>${item.cantidad} und.</td>
                        <td>${formatMoney(item.total)}</td>
                    </tr>
                `;
            });
        } else {
            html += `
                <tr>
                    <td colspan="4" class="text-center">No hay ventas registradas aún</td>
                </tr>
            `;
        }
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        return html;
    },
    
    renderUltimasVentas: function() {
        const ventas = db.getVentas().slice(-5).reverse();
        
        let html = `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-receipt"></i> Últimas Ventas
                    </h3>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Comprobante</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        if (ventas.length > 0) {
            ventas.forEach(venta => {
                const cliente = venta.clienteId ? 
                    db.getCliente(venta.clienteId) : null;
                html += `
                    <tr>
                        <td><strong>${venta.numeroComprobante}</strong></td>
                        <td>${formatDateTime(venta.fecha)}</td>
                        <td>${cliente ? cliente.nombres + ' ' + cliente.apellidos : 'Público general'}</td>
                        <td><strong>${formatMoney(venta.total)}</strong></td>
                    </tr>
                `;
            });
        } else {
            html += `
                <tr>
                    <td colspan="4" class="text-center">No hay ventas registradas aún</td>
                </tr>
            `;
        }
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        return html;
    },
    
    init: function() {
        // Inicialización si es necesaria
    }
};

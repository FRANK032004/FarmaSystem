// ========================================
// MÓDULO: REPORTES
// ========================================

const Reportes = {
    rangoFecha: 'mes',
    
    render: function() {
        return `
            <div class="reportes-module">
                <h1 class="page-title">
                    <i class="fas fa-chart-bar"></i> Reportes y Estadísticas
                </h1>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-calendar"></i> Filtros de Reporte
                        </h3>
                        <div style="display: flex; gap: 10px;">
                            <button class="btn btn-secondary" onclick="Reportes.exportarDatos()">
                                <i class="fas fa-download"></i> Exportar Datos
                            </button>
                            <button class="btn btn-warning" onclick="resetearDatos()">
                                <i class="fas fa-redo"></i> Resetear Sistema
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Período de Análisis</label>
                        <select class="form-control" id="rangoFecha" onchange="Reportes.cambiarRango()" style="max-width: 300px;">
                            <option value="hoy">Hoy</option>
                            <option value="semana">Esta Semana</option>
                            <option value="mes" selected>Este Mes</option>
                            <option value="año">Este Año</option>
                            <option value="todo">Todos los tiempos</option>
                        </select>
                    </div>
                </div>
                
                ${this.renderEstadisticasVentas()}
                ${this.renderProductosMasVendidos()}
                ${this.renderEstadoInventario()}
                ${this.renderTopClientes()}
            </div>
        `;
    },
    
    renderEstadisticasVentas: function() {
        const ventas = this.obtenerVentasPorRango();
        const totalVentas = calcularTotalVentas(ventas);
        const promedioVenta = ventas.length > 0 ? totalVentas / ventas.length : 0;
        const productosVendidos = ventas.reduce((sum, v) => 
            sum + v.items.reduce((s, i) => s + i.cantidad, 0), 0);
        
        // Agrupar por método de pago
        const porMetodo = {};
        ventas.forEach(v => {
            if (!porMetodo[v.metodoPago]) {
                porMetodo[v.metodoPago] = { cantidad: 0, total: 0 };
            }
            porMetodo[v.metodoPago].cantidad++;
            porMetodo[v.metodoPago].total += v.total;
        });
        
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-dollar-sign"></i> Estadísticas de Ventas
                    </h3>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon green">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Ventas</h3>
                            <p>${formatMoney(totalVentas)}</p>
                            <small>${ventas.length} transacciones</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Venta Promedio</h3>
                            <p>${formatMoney(promedioVenta)}</p>
                            <small>por transacción</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon orange">
                            <i class="fas fa-box"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Productos Vendidos</h3>
                            <p>${productosVendidos}</p>
                            <small>unidades</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-receipt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Transacciones</h3>
                            <p>${ventas.length}</p>
                            <small>en el período</small>
                        </div>
                    </div>
                </div>
                
                <h3 style="margin: 25px 0 15px 0; color: var(--primary);">
                    <i class="fas fa-credit-card"></i> Ventas por Método de Pago
                </h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Método de Pago</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(porMetodo).map(([metodo, datos]) => `
                                <tr>
                                    <td><strong>${metodo}</strong></td>
                                    <td>${datos.cantidad}</td>
                                    <td>${formatMoney(datos.total)}</td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <div style="flex: 1; background: var(--light); height: 8px; border-radius: 4px; overflow: hidden;">
                                                <div style="width: ${(datos.total / totalVentas * 100).toFixed(1)}%; 
                                                            background: var(--primary); height: 100%;"></div>
                                            </div>
                                            <span>${(datos.total / totalVentas * 100).toFixed(1)}%</span>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    renderProductosMasVendidos: function() {
        const masVendidos = getProductosMasVendidos(10);
        
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-trophy"></i> Top 10 Productos Más Vendidos
                    </h3>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Posición</th>
                                <th>Producto</th>
                                <th>Cantidad Vendida</th>
                                <th>Total Recaudado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${masVendidos.length > 0 ? masVendidos.map((item, index) => `
                                <tr>
                                    <td>
                                        <strong style="font-size: 1.2rem; color: var(--primary);">#${index + 1}</strong>
                                    </td>
                                    <td>${item.nombre}</td>
                                    <td>${item.cantidad} unidades</td>
                                    <td><strong>${formatMoney(item.total)}</strong></td>
                                </tr>
                            `).join('') : '<tr><td colspan="4" class="text-center">No hay datos disponibles</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    renderEstadoInventario: function() {
        const productos = db.getProductos();
        const stockBajo = getProductosStockBajo();
        const sinStock = getProductosSinStock();
        const proximosVencer = getProductosProximosVencer();
        const vencidos = getProductosVencidos();
        
        const totalStock = productos.reduce((sum, p) => sum + p.stock, 0);
        const valorInventario = productos.reduce((sum, p) => sum + (p.stock * p.precio), 0);
        
        // Productos por categoría
        const porCategoria = {};
        productos.forEach(p => {
            if (!porCategoria[p.categoria]) {
                porCategoria[p.categoria] = { cantidad: 0, stock: 0, valor: 0 };
            }
            porCategoria[p.categoria].cantidad++;
            porCategoria[p.categoria].stock += p.stock;
            porCategoria[p.categoria].valor += p.stock * p.precio;
        });
        
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-warehouse"></i> Estado del Inventario
                    </h3>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Productos</h3>
                            <p>${productos.length}</p>
                            <small>${totalStock} unidades</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon green">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Valor Inventario</h3>
                            <p>${formatMoney(valorInventario)}</p>
                            <small>valor total</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon orange">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Stock Bajo</h3>
                            <p>${stockBajo.length}</p>
                            <small>productos</small>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon red">
                            <i class="fas fa-calendar-times"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Próximos a Vencer</h3>
                            <p>${proximosVencer.length}</p>
                            <small>productos</small>
                        </div>
                    </div>
                </div>
                
                <h3 style="margin: 25px 0 15px 0; color: var(--primary);">
                    <i class="fas fa-layer-group"></i> Inventario por Categoría
                </h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Productos</th>
                                <th>Stock Total</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(porCategoria)
                                .sort((a, b) => b[1].valor - a[1].valor)
                                .map(([categoria, datos]) => `
                                <tr>
                                    <td><strong>${categoria}</strong></td>
                                    <td>${datos.cantidad}</td>
                                    <td>${datos.stock} und.</td>
                                    <td>${formatMoney(datos.valor)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    renderTopClientes: function() {
        const clientes = db.getClientes();
        const clientesConCompras = clientes
            .map(c => ({
                ...c,
                totalCompras: c.historialCompras ? c.historialCompras.length : 0,
                totalGastado: c.historialCompras ? 
                    c.historialCompras.reduce((sum, compra) => sum + compra.total, 0) : 0
            }))
            .filter(c => c.totalCompras > 0)
            .sort((a, b) => b.totalGastado - a.totalGastado)
            .slice(0, 10);
        
        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-star"></i> Top 10 Mejores Clientes
                    </h3>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Posición</th>
                                <th>Cliente</th>
                                <th>DNI</th>
                                <th>Total Compras</th>
                                <th>Total Gastado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${clientesConCompras.length > 0 ? clientesConCompras.map((cliente, index) => `
                                <tr>
                                    <td>
                                        <strong style="font-size: 1.2rem; color: var(--primary);">#${index + 1}</strong>
                                    </td>
                                    <td>${cliente.nombres} ${cliente.apellidos}</td>
                                    <td>${cliente.dni}</td>
                                    <td>${cliente.totalCompras}</td>
                                    <td><strong>${formatMoney(cliente.totalGastado)}</strong></td>
                                </tr>
                            `).join('') : '<tr><td colspan="5" class="text-center">No hay datos de clientes con compras</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    obtenerVentasPorRango: function() {
        const ventas = db.getVentas();
        const hoy = new Date();
        
        switch(this.rangoFecha) {
            case 'hoy':
                const hoyStr = hoy.toISOString().split('T')[0];
                return ventas.filter(v => v.fecha.startsWith(hoyStr));
                
            case 'semana':
                const semanaAtras = new Date(hoy);
                semanaAtras.setDate(hoy.getDate() - 7);
                return ventas.filter(v => new Date(v.fecha) >= semanaAtras);
                
            case 'mes':
                const mesActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
                return ventas.filter(v => v.fecha.startsWith(mesActual));
                
            case 'año':
                const añoActual = hoy.getFullYear().toString();
                return ventas.filter(v => v.fecha.startsWith(añoActual));
                
            case 'todo':
            default:
                return ventas;
        }
    },
    
    cambiarRango: function() {
        this.rangoFecha = document.getElementById('rangoFecha').value;
        app.changeModule('reportes');
    },
    
    exportarDatos: function() {
        exportarDatos();
        showNotification('Datos exportados exitosamente', 'success');
    },
    
    init: function() {
        // Inicialización si es necesaria
    }
};

// ========================================
// UTILIDADES GENERALES
// ========================================

// Formatear moneda
function formatMoney(amount) {
    return `S/ ${parseFloat(amount).toFixed(2)}`;
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Formatear fecha y hora
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Calcular días hasta vencimiento
function diasHastaVencimiento(fechaVencimiento) {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diffTime = vencimiento - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Verificar si está próximo a vencer (menos de 90 días)
function isProximoVencer(fechaVencimiento) {
    return diasHastaVencimiento(fechaVencimiento) <= 90;
}

// Verificar si está vencido
function isVencido(fechaVencimiento) {
    return diasHastaVencimiento(fechaVencimiento) < 0;
}

// Obtener estado de stock
function getStockStatus(stock, minStock) {
    if (stock === 0) return 'Sin stock';
    if (stock <= minStock) return 'Stock bajo';
    return 'Stock normal';
}

// Obtener clase de badge según stock
function getStockBadgeClass(stock, minStock) {
    if (stock === 0) return 'badge-danger';
    if (stock <= minStock) return 'badge-warning';
    return 'badge-success';
}

// Validar DNI
function validarDNI(dni) {
    return /^\d{8}$/.test(dni);
}

// Validar email
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validar teléfono
function validarTelefono(telefono) {
    return /^\d{9}$/.test(telefono);
}

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 30px;
        z-index: 3000;
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'danger' ? 'fa-exclamation-circle' : 
                 type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Confirmar acción
function confirmar(mensaje, callback) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <h3 style="margin-bottom: 20px;">
                <i class="fas fa-question-circle" style="color: var(--warning);"></i>
                Confirmación
            </h3>
            <p style="margin-bottom: 25px; font-size: 1.1rem;">${mensaje}</p>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button class="btn btn-secondary" id="btnCancelar">
                    <i class="fas fa-times"></i> Cancelar
                </button>
                <button class="btn btn-primary" id="btnConfirmar">
                    <i class="fas fa-check"></i> Confirmar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('#btnConfirmar').addEventListener('click', () => {
        modal.remove();
        callback(true);
    });
    
    modal.querySelector('#btnCancelar').addEventListener('click', () => {
        modal.remove();
        callback(false);
    });
}

// Generar número de comprobante
function generarNumeroComprobante(tipo) {
    const ventas = db.getVentas();
    const ventasTipo = ventas.filter(v => v.tipoComprobante === tipo);
    const numero = ventasTipo.length + 1;
    const serie = tipo === 'Factura' ? 'F001' : 'B001';
    return `${serie}-${String(numero).padStart(8, '0')}`;
}

// Calcular edad
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

// Buscar productos
function buscarProductos(termino) {
    const productos = db.getProductos();
    termino = termino.toLowerCase();
    return productos.filter(p => 
        p.nombre.toLowerCase().includes(termino) ||
        p.categoria.toLowerCase().includes(termino) ||
        p.laboratorio.toLowerCase().includes(termino)
    );
}

// Obtener productos con stock bajo
function getProductosStockBajo() {
    return db.getProductos().filter(p => p.stock <= p.minStock && p.stock > 0);
}

// Obtener productos sin stock
function getProductosSinStock() {
    return db.getProductos().filter(p => p.stock === 0);
}

// Obtener productos próximos a vencer
function getProductosProximosVencer() {
    return db.getProductos().filter(p => {
        const dias = diasHastaVencimiento(p.vencimiento);
        return dias > 0 && dias <= 90;
    });
}

// Obtener productos vencidos
function getProductosVencidos() {
    return db.getProductos().filter(p => isVencido(p.vencimiento));
}

// Obtener ventas del día
function getVentasHoy() {
    const ventas = db.getVentas();
    const hoy = new Date().toISOString().split('T')[0];
    return ventas.filter(v => v.fecha.startsWith(hoy));
}

// Obtener ventas del mes
function getVentasMes() {
    const ventas = db.getVentas();
    const hoy = new Date();
    const mesActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
    return ventas.filter(v => v.fecha.startsWith(mesActual));
}

// Calcular total de ventas
function calcularTotalVentas(ventas) {
    return ventas.reduce((sum, venta) => sum + venta.total, 0);
}

// Obtener productos más vendidos
function getProductosMasVendidos(limite = 10) {
    const ventas = db.getVentas();
    const productos = db.getProductos();
    const ventasPorProducto = {};
    
    ventas.forEach(venta => {
        venta.items.forEach(item => {
            if (!ventasPorProducto[item.productoId]) {
                ventasPorProducto[item.productoId] = {
                    productoId: item.productoId,
                    nombre: item.nombre,
                    cantidad: 0,
                    total: 0
                };
            }
            ventasPorProducto[item.productoId].cantidad += item.cantidad;
            ventasPorProducto[item.productoId].total += item.subtotal;
        });
    });
    
    return Object.values(ventasPorProducto)
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0, limite);
}

// Obtener categorías de productos
function getCategorias() {
    const productos = db.getProductos();
    const categorias = [...new Set(productos.map(p => p.categoria))];
    return categorias.sort();
}

// Obtener laboratorios
function getLaboratorios() {
    const productos = db.getProductos();
    const laboratorios = [...new Set(productos.map(p => p.laboratorio))];
    return laboratorios.sort();
}

// Exportar datos a JSON
function exportarDatos() {
    const datos = {
        productos: db.getProductos(),
        clientes: db.getClientes(),
        ventas: db.getVentas(),
        recetas: db.getRecetas(),
        fecha: new Date().toISOString()
    };
    
    const json = JSON.stringify(datos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farmacia-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Limpiar todos los datos
function limpiarDatos() {
    confirmar('¿Está seguro de eliminar TODOS los datos del sistema? Esta acción no se puede deshacer.', (confirmado) => {
        if (confirmado) {
            localStorage.clear();
            initializeData();
            showNotification('Todos los datos han sido eliminados y reiniciados', 'success');
            location.reload();
        }
    });
}

// Resetear datos a valores iniciales
function resetearDatos() {
    confirmar('¿Desea resetear el sistema a los datos iniciales? Se perderán todos los cambios.', (confirmado) => {
        if (confirmado) {
            localStorage.clear();
            initializeData();
            showNotification('Sistema reiniciado con datos iniciales', 'success');
            location.reload();
        }
    });
}

// Animación de entrada para elementos
function animateIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    setTimeout(() => {
        element.style.transition = 'all 0.3s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 10);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

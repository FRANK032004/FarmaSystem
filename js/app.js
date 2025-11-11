// ========================================
// APLICACIÓN PRINCIPAL
// ========================================

const app = {
    currentModule: 'dashboard',
    
    init: function() {
        this.setupEventListeners();
        this.updateDateTime();
        this.changeModule('dashboard');
        
        // Actualizar fecha/hora cada segundo
        setInterval(() => this.updateDateTime(), 1000);
    },
    
    setupEventListeners: function() {
        // Menú de navegación
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const module = item.getAttribute('data-module');
                this.changeModule(module);
            });
        });
        
        // Toggle sidebar en móvil
        const toggleBtn = document.getElementById('toggleSidebar');
        const sidebar = document.getElementById('sidebar');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
        
        // Cerrar sidebar al hacer clic fuera (móvil)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
        
        // Modal de ayuda
        const btnHelp = document.getElementById('btnHelp');
        const modalHelp = document.getElementById('modalHelp');
        
        if (btnHelp && modalHelp) {
            btnHelp.addEventListener('click', () => {
                modalHelp.classList.add('active');
            });
            
            const closeBtn = modalHelp.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modalHelp.classList.remove('active');
                });
            }
            
            modalHelp.addEventListener('click', (e) => {
                if (e.target === modalHelp) {
                    modalHelp.classList.remove('active');
                }
            });
        }
    },
    
    changeModule: function(moduleName) {
        // Actualizar menú activo
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-module') === moduleName) {
                item.classList.add('active');
            }
        });
        
        // Renderizar módulo
        const content = document.getElementById('content');
        this.currentModule = moduleName;
        
        switch(moduleName) {
            case 'dashboard':
                content.innerHTML = Dashboard.render();
                Dashboard.init();
                break;
                
            case 'pos':
                content.innerHTML = POS.render();
                POS.init();
                break;
                
            case 'inventario':
                content.innerHTML = Inventario.render();
                Inventario.init();
                break;
                
            case 'clientes':
                content.innerHTML = Clientes.render();
                Clientes.init();
                break;
                
            case 'recetas':
                content.innerHTML = Recetas.render();
                Recetas.init();
                break;
                
            case 'reportes':
                content.innerHTML = Reportes.render();
                Reportes.init();
                break;
                
            case 'proveedores':
                content.innerHTML = Proveedores.render();
                Proveedores.init();
                break;
                
            default:
                content.innerHTML = Dashboard.render();
                Dashboard.init();
        }
        
        // Scroll al inicio
        window.scrollTo(0, 0);
        
        // Cerrar sidebar en móvil
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.remove('active');
        }
    },
    
    updateDateTime: function() {
        const now = new Date();
        const dateTimeElement = document.getElementById('dateTime');
        
        if (dateTimeElement) {
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            dateTimeElement.textContent = now.toLocaleDateString('es-PE', options);
        }
    }
};

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    app.init();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido al Sistema de Gestión Farmacéutica!', 'info');
    }, 500);
});

// Prevenir pérdida de datos al recargar
window.addEventListener('beforeunload', (e) => {
    // Solo en desarrollo - comentar en producción
    // e.preventDefault();
    // e.returnValue = '';
});

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
    showNotification('Se produjo un error. Por favor, recargue la página.', 'danger');
});

// Detectar cambios de tamaño de ventana
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Cerrar sidebar en móvil al cambiar a escritorio
        if (window.innerWidth > 768) {
            document.getElementById('sidebar').classList.remove('active');
        }
    }, 250);
});

// Atajos de teclado (opcional)
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K para buscar
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        app.changeModule('pos');
        setTimeout(() => {
            const searchInput = document.getElementById('searchProduct');
            if (searchInput) searchInput.focus();
        }, 100);
    }
    
    // Ctrl/Cmd + H para ayuda
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        document.getElementById('btnHelp').click();
    }
    
    // Escape para cerrar modales
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => modal.classList.remove('active'));
    }
});

// Exponer funciones globales necesarias
window.app = app;
window.showNotification = showNotification;
window.confirmar = confirmar;
window.exportarDatos = exportarDatos;
window.resetearDatos = resetearDatos;
window.limpiarDatos = limpiarDatos;

console.log('%c🏥 Sistema de Gestión Farmacéutica', 'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%c📚 Sistema educativo para TICs II - Farmacia', 'color: #3b82f6; font-size: 14px;');
console.log('%cDesarrollado para demostración pedagógica', 'color: #6b7280; font-size: 12px;');

// ========================================
// DATOS INICIALES DEL SISTEMA
// ========================================

// Inicializar datos si no existen
function initializeData() {
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
    }
    if (!localStorage.getItem('clientes')) {
        localStorage.setItem('clientes', JSON.stringify(clientesIniciales));
    }
    if (!localStorage.getItem('proveedores')) {
        localStorage.setItem('proveedores', JSON.stringify(proveedoresIniciales));
    }
    if (!localStorage.getItem('compras')) {
        localStorage.setItem('compras', JSON.stringify([]));
    }
    if (!localStorage.getItem('ventas')) {
        localStorage.setItem('ventas', JSON.stringify([]));
    }
    if (!localStorage.getItem('recetas')) {
        localStorage.setItem('recetas', JSON.stringify([]));
    }
}

// Productos iniciales
const productosIniciales = [
    // ANALGÉSICOS
    { id: 1, nombre: 'Paracetamol 500mg', categoria: 'Analgésico', precio: 0.50, stock: 500, minStock: 50, laboratorio: 'Tecnoquímicas', lote: 'L2024001', vencimiento: '2025-12-31', requiereReceta: false },
    { id: 2, nombre: 'Ibuprofeno 400mg', categoria: 'Analgésico', precio: 0.80, stock: 300, minStock: 50, laboratorio: 'Bayer', lote: 'L2024002', vencimiento: '2025-11-30', requiereReceta: false },
    { id: 3, nombre: 'Aspirina 100mg', categoria: 'Analgésico', precio: 0.60, stock: 250, minStock: 40, laboratorio: 'Bayer', lote: 'L2024003', vencimiento: '2026-01-31', requiereReceta: false },
    { id: 4, nombre: 'Naproxeno 250mg', categoria: 'Analgésico', precio: 1.20, stock: 150, minStock: 30, laboratorio: 'Roemmers', lote: 'L2024004', vencimiento: '2025-10-31', requiereReceta: false },
    
    // ANTIBIÓTICOS
    { id: 5, nombre: 'Amoxicilina 500mg', categoria: 'Antibiótico', precio: 2.50, stock: 200, minStock: 40, laboratorio: 'Farmindustria', lote: 'L2024005', vencimiento: '2025-09-30', requiereReceta: true },
    { id: 6, nombre: 'Azitromicina 500mg', categoria: 'Antibiótico', precio: 5.00, stock: 120, minStock: 25, laboratorio: 'Pfizer', lote: 'L2024006', vencimiento: '2025-12-31', requiereReceta: true },
    { id: 7, nombre: 'Cefalexina 500mg', categoria: 'Antibiótico', precio: 3.50, stock: 80, minStock: 20, laboratorio: 'Farmindustria', lote: 'L2024007', vencimiento: '2025-11-15', requiereReceta: true },
    { id: 8, nombre: 'Ciprofloxacino 500mg', categoria: 'Antibiótico', precio: 4.00, stock: 90, minStock: 20, laboratorio: 'Bayer', lote: 'L2024008', vencimiento: '2026-02-28', requiereReceta: true },
    
    // ANTIHISTAMÍNICOS
    { id: 9, nombre: 'Loratadina 10mg', categoria: 'Antihistamínico', precio: 1.50, stock: 180, minStock: 30, laboratorio: 'Medifarma', lote: 'L2024009', vencimiento: '2025-12-31', requiereReceta: false },
    { id: 10, nombre: 'Cetirizina 10mg', categoria: 'Antihistamínico', precio: 1.80, stock: 160, minStock: 30, laboratorio: 'Medifarma', lote: 'L2024010', vencimiento: '2026-01-31', requiereReceta: false },
    
    // ANTIHIPERTENSIVOS
    { id: 11, nombre: 'Losartán 50mg', categoria: 'Antihipertensivo', precio: 3.00, stock: 250, minStock: 50, laboratorio: 'MSD', lote: 'L2024011', vencimiento: '2025-11-30', requiereReceta: true },
    { id: 12, nombre: 'Enalapril 10mg', categoria: 'Antihipertensivo', precio: 2.50, stock: 200, minStock: 40, laboratorio: 'Roemmers', lote: 'L2024012', vencimiento: '2025-12-31', requiereReceta: true },
    
    // ANTIDIABÉTICOS
    { id: 13, nombre: 'Metformina 850mg', categoria: 'Antidiabético', precio: 2.00, stock: 300, minStock: 60, laboratorio: 'Tecnoquímicas', lote: 'L2024013', vencimiento: '2026-03-31', requiereReceta: true },
    { id: 14, nombre: 'Glibenclamida 5mg', categoria: 'Antidiabético', precio: 2.50, stock: 150, minStock: 30, laboratorio: 'Sanofi', lote: 'L2024014', vencimiento: '2025-10-31', requiereReceta: true },
    
    // VITAMINAS Y SUPLEMENTOS
    { id: 15, nombre: 'Vitamina C 1000mg', categoria: 'Vitamina', precio: 5.00, stock: 200, minStock: 40, laboratorio: 'GNC', lote: 'L2024015', vencimiento: '2026-06-30', requiereReceta: false },
    { id: 16, nombre: 'Complejo B', categoria: 'Vitamina', precio: 6.50, stock: 150, minStock: 30, laboratorio: 'GNC', lote: 'L2024016', vencimiento: '2026-05-31', requiereReceta: false },
    { id: 17, nombre: 'Calcio + Vitamina D', categoria: 'Vitamina', precio: 8.00, stock: 100, minStock: 20, laboratorio: 'Centrum', lote: 'L2024017', vencimiento: '2026-04-30', requiereReceta: false },
    
    // ANTIÁCIDOS
    { id: 18, nombre: 'Omeprazol 20mg', categoria: 'Antiácido', precio: 1.50, stock: 280, minStock: 50, laboratorio: 'Tecnoquímicas', lote: 'L2024018', vencimiento: '2025-12-31', requiereReceta: false },
    { id: 19, nombre: 'Ranitidina 150mg', categoria: 'Antiácido', precio: 1.20, stock: 200, minStock: 40, laboratorio: 'Roemmers', lote: 'L2024019', vencimiento: '2025-11-30', requiereReceta: false },
    
    // RESPIRATORIOS
    { id: 20, nombre: 'Salbutamol Inhalador', categoria: 'Respiratorio', precio: 12.00, stock: 50, minStock: 10, laboratorio: 'GSK', lote: 'L2024020', vencimiento: '2026-01-31', requiereReceta: true },
    { id: 21, nombre: 'Ambroxol Jarabe', categoria: 'Respiratorio', precio: 4.50, stock: 80, minStock: 15, laboratorio: 'Medifarma', lote: 'L2024021', vencimiento: '2025-12-31', requiereReceta: false },
    
    // PRODUCTOS DE HIGIENE Y CUIDADO
    { id: 22, nombre: 'Alcohol en Gel 250ml', categoria: 'Higiene', precio: 3.50, stock: 150, minStock: 30, laboratorio: 'Inkafarma', lote: 'L2024022', vencimiento: '2026-12-31', requiereReceta: false },
    { id: 23, nombre: 'Mascarillas Quirúrgicas x50', categoria: 'Higiene', precio: 8.00, stock: 100, minStock: 20, laboratorio: '3M', lote: 'L2024023', vencimiento: '2027-12-31', requiereReceta: false },
    { id: 24, nombre: 'Termómetro Digital', categoria: 'Equipo Médico', precio: 15.00, stock: 30, minStock: 5, laboratorio: 'Omron', lote: 'L2024024', vencimiento: '2029-12-31', requiereReceta: false },
    { id: 25, nombre: 'Tensiómetro Digital', categoria: 'Equipo Médico', precio: 45.00, stock: 15, minStock: 3, laboratorio: 'Omron', lote: 'L2024025', vencimiento: '2029-12-31', requiereReceta: false }
];

// Proveedores iniciales
const proveedoresIniciales = [
    {
        id: 1,
        nombre: 'Droguería Alfaro',
        ruc: '20123456789',
        contacto: 'Carlos Alfaro',
        telefono: '015551234',
        email: 'ventas@alfaro.com',
        direccion: 'Av. Argentina 1234, Lima',
        categoriaProductos: ['Medicamentos', 'Genéricos'],
        calificacion: 5,
        diasCredito: 30,
        fechaRegistro: '2024-01-10'
    },
    {
        id: 2,
        nombre: 'Laboratorios Unidos SAC',
        ruc: '20987654321',
        contacto: 'María Torres',
        telefono: '015559876',
        email: 'compras@labunidos.com',
        direccion: 'Jr. Cusco 567, Lima',
        categoriaProductos: ['Medicamentos de marca', 'Vitaminas'],
        calificacion: 4,
        diasCredito: 45,
        fechaRegistro: '2024-01-15'
    },
    {
        id: 3,
        nombre: 'Distribuidora MedFarma',
        ruc: '20456789123',
        contacto: 'Jorge Ramírez',
        telefono: '015554567',
        email: 'pedidos@medfarma.com',
        direccion: 'Av. Universitaria 890, Lima',
        categoriaProductos: ['Antibióticos', 'Antihipertensivos'],
        calificacion: 5,
        diasCredito: 30,
        fechaRegistro: '2024-02-01'
    },
    {
        id: 4,
        nombre: 'Insumos Médicos del Perú',
        ruc: '20789456123',
        contacto: 'Ana Gutiérrez',
        telefono: '015557890',
        email: 'ventas@insumosmedicos.com',
        direccion: 'Av. Javier Prado 2345, Lima',
        categoriaProductos: ['Equipos médicos', 'Productos de higiene'],
        calificacion: 4,
        diasCredito: 15,
        fechaRegistro: '2024-02-10'
    },
    {
        id: 5,
        nombre: 'Química Suiza SAC',
        ruc: '20321654987',
        contacto: 'Roberto Fernández',
        telefono: '015553210',
        email: 'contacto@quimicasuiza.com',
        direccion: 'Av. Benavides 1456, Miraflores',
        categoriaProductos: ['Medicamentos importados', 'Suplementos'],
        calificacion: 5,
        diasCredito: 60,
        fechaRegistro: '2024-01-20'
    }
];

// Clientes iniciales
const clientesIniciales = [
    { 
        id: 1, 
        nombres: 'Juan Carlos', 
        apellidos: 'Pérez García', 
        dni: '12345678', 
        telefono: '987654321', 
        email: 'juan.perez@email.com', 
        direccion: 'Av. Principal 123', 
        fechaNacimiento: '1985-05-15',
        fechaRegistro: '2024-01-15',
        historialCompras: []
    },
    { 
        id: 2, 
        nombres: 'María Elena', 
        apellidos: 'Rodríguez López', 
        dni: '23456789', 
        telefono: '987654322', 
        email: 'maria.rodriguez@email.com', 
        direccion: 'Jr. Los Pinos 456', 
        fechaNacimiento: '1990-08-22',
        fechaRegistro: '2024-02-10',
        historialCompras: []
    },
    { 
        id: 3, 
        nombres: 'Carlos Alberto', 
        apellidos: 'Mendoza Silva', 
        dni: '34567890', 
        telefono: '987654323', 
        email: 'carlos.mendoza@email.com', 
        direccion: 'Av. Los Cedros 789', 
        fechaNacimiento: '1978-12-10',
        fechaRegistro: '2024-01-20',
        historialCompras: []
    },
    { 
        id: 4, 
        nombres: 'Ana Lucía', 
        apellidos: 'Torres Vega', 
        dni: '45678901', 
        telefono: '987654324', 
        email: 'ana.torres@email.com', 
        direccion: 'Calle Las Flores 321', 
        fechaNacimiento: '1995-03-18',
        fechaRegistro: '2024-03-05',
        historialCompras: []
    },
    { 
        id: 5, 
        nombres: 'Roberto', 
        apellidos: 'Sánchez Díaz', 
        dni: '56789012', 
        telefono: '987654325', 
        email: 'roberto.sanchez@email.com', 
        direccion: 'Av. Arequipa 654', 
        fechaNacimiento: '1982-11-25',
        fechaRegistro: '2024-02-28',
        historialCompras: []
    }
];

// Funciones para manejo de datos
const db = {
    // PRODUCTOS
    getProductos: () => JSON.parse(localStorage.getItem('productos') || '[]'),
    setProductos: (productos) => localStorage.setItem('productos', JSON.stringify(productos)),
    getProducto: (id) => db.getProductos().find(p => p.id === id),
    addProducto: (producto) => {
        const productos = db.getProductos();
        producto.id = Math.max(...productos.map(p => p.id), 0) + 1;
        productos.push(producto);
        db.setProductos(productos);
        return producto;
    },
    updateProducto: (id, data) => {
        const productos = db.getProductos();
        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            productos[index] = { ...productos[index], ...data };
            db.setProductos(productos);
            return productos[index];
        }
        return null;
    },
    deleteProducto: (id) => {
        const productos = db.getProductos().filter(p => p.id !== id);
        db.setProductos(productos);
    },
    
    // CLIENTES
    getClientes: () => JSON.parse(localStorage.getItem('clientes') || '[]'),
    setClientes: (clientes) => localStorage.setItem('clientes', JSON.stringify(clientes)),
    getCliente: (id) => db.getClientes().find(c => c.id === id),
    addCliente: (cliente) => {
        const clientes = db.getClientes();
        cliente.id = Math.max(...clientes.map(c => c.id), 0) + 1;
        cliente.fechaRegistro = new Date().toISOString().split('T')[0];
        cliente.historialCompras = [];
        clientes.push(cliente);
        db.setClientes(clientes);
        return cliente;
    },
    updateCliente: (id, data) => {
        const clientes = db.getClientes();
        const index = clientes.findIndex(c => c.id === id);
        if (index !== -1) {
            clientes[index] = { ...clientes[index], ...data };
            db.setClientes(clientes);
            return clientes[index];
        }
        return null;
    },
    deleteCliente: (id) => {
        const clientes = db.getClientes().filter(c => c.id !== id);
        db.setClientes(clientes);
    },
    
    // VENTAS
    getVentas: () => JSON.parse(localStorage.getItem('ventas') || '[]'),
    setVentas: (ventas) => localStorage.setItem('ventas', JSON.stringify(ventas)),
    addVenta: (venta) => {
        const ventas = db.getVentas();
        venta.id = Math.max(...ventas.map(v => v.id), 0) + 1;
        venta.fecha = new Date().toISOString();
        ventas.push(venta);
        db.setVentas(ventas);
        
        // Actualizar stock de productos
        venta.items.forEach(item => {
            const producto = db.getProducto(item.productoId);
            if (producto) {
                db.updateProducto(item.productoId, { 
                    stock: producto.stock - item.cantidad 
                });
            }
        });
        
        // Agregar al historial del cliente si existe
        if (venta.clienteId) {
            const cliente = db.getCliente(venta.clienteId);
            if (cliente) {
                if (!cliente.historialCompras) cliente.historialCompras = [];
                cliente.historialCompras.push({
                    fecha: venta.fecha,
                    total: venta.total,
                    ventaId: venta.id
                });
                db.updateCliente(venta.clienteId, cliente);
            }
        }
        
        return venta;
    },
    
    // RECETAS
    getRecetas: () => JSON.parse(localStorage.getItem('recetas') || '[]'),
    setRecetas: (recetas) => localStorage.setItem('recetas', JSON.stringify(recetas)),
    addReceta: (receta) => {
        const recetas = db.getRecetas();
        receta.id = Math.max(...recetas.map(r => r.id), 0) + 1;
        receta.fechaRegistro = new Date().toISOString();
        recetas.push(receta);
        db.setRecetas(recetas);
        return receta;
    },
    updateReceta: (id, data) => {
        const recetas = db.getRecetas();
        const index = recetas.findIndex(r => r.id === id);
        if (index !== -1) {
            recetas[index] = { ...recetas[index], ...data };
            db.setRecetas(recetas);
            return recetas[index];
        }
        return null;
    },
    
    // PROVEEDORES
    getProveedores: () => JSON.parse(localStorage.getItem('proveedores') || '[]'),
    setProveedores: (proveedores) => localStorage.setItem('proveedores', JSON.stringify(proveedores)),
    getProveedor: (id) => db.getProveedores().find(p => p.id === id),
    addProveedor: (proveedor) => {
        const proveedores = db.getProveedores();
        proveedor.id = Math.max(...proveedores.map(p => p.id), 0) + 1;
        proveedor.fechaRegistro = new Date().toISOString().split('T')[0];
        proveedor.calificacion = 3;
        proveedores.push(proveedor);
        db.setProveedores(proveedores);
        return proveedor;
    },
    updateProveedor: (id, data) => {
        const proveedores = db.getProveedores();
        const index = proveedores.findIndex(p => p.id === id);
        if (index !== -1) {
            proveedores[index] = { ...proveedores[index], ...data };
            db.setProveedores(proveedores);
            return proveedores[index];
        }
        return null;
    },
    deleteProveedor: (id) => {
        const proveedores = db.getProveedores().filter(p => p.id !== id);
        db.setProveedores(proveedores);
    },
    
    // COMPRAS
    getCompras: () => JSON.parse(localStorage.getItem('compras') || '[]'),
    setCompras: (compras) => localStorage.setItem('compras', JSON.stringify(compras)),
    addCompra: (compra) => {
        const compras = db.getCompras();
        compra.id = Math.max(...compras.map(c => c.id), 0) + 1;
        compra.fecha = new Date().toISOString();
        compra.estado = 'Pendiente';
        compras.push(compra);
        db.setCompras(compras);
        return compra;
    },
    updateCompra: (id, data) => {
        const compras = db.getCompras();
        const index = compras.findIndex(c => c.id === id);
        if (index !== -1) {
            compras[index] = { ...compras[index], ...data };
            db.setCompras(compras);
            
            // Si la compra se recibe, actualizar inventario
            if (data.estado === 'Recibida' && compras[index].estado !== 'Recibida') {
                compras[index].items.forEach(item => {
                    const producto = db.getProducto(item.productoId);
                    if (producto) {
                        db.updateProducto(item.productoId, {
                            stock: producto.stock + item.cantidad,
                            precio: item.precioVenta // Actualizar precio de venta
                        });
                    } else {
                        // Si el producto no existe, crearlo
                        db.addProducto({
                            nombre: item.nombreProducto,
                            categoria: item.categoria || 'General',
                            precio: item.precioVenta,
                            stock: item.cantidad,
                            minStock: Math.floor(item.cantidad * 0.2),
                            laboratorio: item.laboratorio || 'N/A',
                            lote: item.lote,
                            vencimiento: item.vencimiento,
                            requiereReceta: item.requiereReceta || false
                        });
                    }
                });
            }
            
            return compras[index];
        }
        return null;
    }
};

// Inicializar al cargar
initializeData();

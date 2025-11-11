// ========================================
// MÓDULO: CLIENTES
// ========================================

const Clientes = {
    render: function() {
        return `
            <div class="clientes-module">
                <h1 class="page-title">
                    <i class="fas fa-users"></i> Gestión de Clientes
                </h1>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-search"></i> Buscar Cliente
                        </h3>
                        <button class="btn btn-primary" onclick="Clientes.mostrarFormularioCliente()">
                            <i class="fas fa-user-plus"></i> Nuevo Cliente
                        </button>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 20px;">
                        <input type="text" class="form-control" id="searchCliente" 
                               placeholder="Buscar por nombre, DNI, teléfono o email...">
                    </div>
                    
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombres y Apellidos</th>
                                    <th>DNI</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th>Edad</th>
                                    <th>Compras</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="clientesBody">
                                ${this.renderClientes()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },
    
    renderClientes: function(clientes = null) {
        if (!clientes) {
            clientes = db.getClientes();
        }
        
        if (clientes.length === 0) {
            return '<tr><td colspan="8" class="text-center">No se encontraron clientes</td></tr>';
        }
        
        return clientes.map(c => {
            const edad = calcularEdad(c.fechaNacimiento);
            const compras = c.historialCompras ? c.historialCompras.length : 0;
            
            return `
                <tr>
                    <td><strong>${c.id}</strong></td>
                    <td>${c.nombres} ${c.apellidos}</td>
                    <td>${c.dni}</td>
                    <td>${c.telefono}</td>
                    <td>${c.email}</td>
                    <td>${edad} años</td>
                    <td>${compras}</td>
                    <td>
                        <button class="btn btn-info" onclick='Clientes.verDetalles(${JSON.stringify(c).replace(/'/g, "\\'")})'
                                style="padding: 5px 10px; margin-right: 5px;">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-primary" onclick='Clientes.editarCliente(${JSON.stringify(c).replace(/'/g, "\\'")})'
                                style="padding: 5px 10px; margin-right: 5px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" onclick="Clientes.eliminarCliente(${c.id})"
                                style="padding: 5px 10px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },
    
    buscarClientes: function() {
        const termino = document.getElementById('searchCliente').value.toLowerCase();
        
        if (!termino) {
            document.getElementById('clientesBody').innerHTML = this.renderClientes();
            return;
        }
        
        const clientes = db.getClientes().filter(c => 
            c.nombres.toLowerCase().includes(termino) ||
            c.apellidos.toLowerCase().includes(termino) ||
            c.dni.includes(termino) ||
            c.telefono.includes(termino) ||
            c.email.toLowerCase().includes(termino)
        );
        
        document.getElementById('clientesBody').innerHTML = this.renderClientes(clientes);
    },
    
    mostrarFormularioCliente: function(cliente = null) {
        const esEdicion = cliente !== null;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2>
                    <i class="fas fa-${esEdicion ? 'user-edit' : 'user-plus'}"></i>
                    ${esEdicion ? 'Editar' : 'Nuevo'} Cliente
                </h2>
                
                <form id="formCliente" onsubmit="event.preventDefault(); Clientes.guardarCliente(${esEdicion})">
                    <input type="hidden" id="clienteId" value="${cliente ? cliente.id : ''}">
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nombres *</label>
                            <input type="text" class="form-control" id="clienteNombres" 
                                   value="${cliente ? cliente.nombres : ''}" required>
                        </div>
                        <div class="form-group">
                            <label>Apellidos *</label>
                            <input type="text" class="form-control" id="clienteApellidos" 
                                   value="${cliente ? cliente.apellidos : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>DNI *</label>
                            <input type="text" class="form-control" id="clienteDni" 
                                   value="${cliente ? cliente.dni : ''}" 
                                   pattern="[0-9]{8}" maxlength="8" required>
                            <small>8 dígitos</small>
                        </div>
                        <div class="form-group">
                            <label>Fecha de Nacimiento *</label>
                            <input type="date" class="form-control" id="clienteFechaNacimiento" 
                                   value="${cliente ? cliente.fechaNacimiento : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Teléfono *</label>
                            <input type="text" class="form-control" id="clienteTelefono" 
                                   value="${cliente ? cliente.telefono : ''}"
                                   pattern="[0-9]{9}" maxlength="9" required>
                            <small>9 dígitos</small>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" class="form-control" id="clienteEmail" 
                                   value="${cliente ? cliente.email : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Dirección *</label>
                        <input type="text" class="form-control" id="clienteDireccion" 
                               value="${cliente ? cliente.direccion : ''}" required>
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
    
    guardarCliente: function(esEdicion) {
        const dni = document.getElementById('clienteDni').value;
        const telefono = document.getElementById('clienteTelefono').value;
        const email = document.getElementById('clienteEmail').value;
        
        if (!validarDNI(dni)) {
            showNotification('El DNI debe tener 8 dígitos', 'danger');
            return;
        }
        
        if (!validarTelefono(telefono)) {
            showNotification('El teléfono debe tener 9 dígitos', 'danger');
            return;
        }
        
        if (!validarEmail(email)) {
            showNotification('El email no es válido', 'danger');
            return;
        }
        
        const data = {
            nombres: document.getElementById('clienteNombres').value,
            apellidos: document.getElementById('clienteApellidos').value,
            dni: dni,
            telefono: telefono,
            email: email,
            direccion: document.getElementById('clienteDireccion').value,
            fechaNacimiento: document.getElementById('clienteFechaNacimiento').value
        };
        
        if (esEdicion) {
            const id = parseInt(document.getElementById('clienteId').value);
            db.updateCliente(id, data);
            showNotification('Cliente actualizado exitosamente', 'success');
        } else {
            // Verificar que no exista otro cliente con el mismo DNI
            const clientes = db.getClientes();
            if (clientes.find(c => c.dni === dni)) {
                showNotification('Ya existe un cliente con ese DNI', 'danger');
                return;
            }
            
            db.addCliente(data);
            showNotification('Cliente registrado exitosamente', 'success');
        }
        
        document.querySelector('.modal').remove();
        app.changeModule('clientes');
    },
    
    editarCliente: function(cliente) {
        this.mostrarFormularioCliente(cliente);
    },
    
    eliminarCliente: function(id) {
        const cliente = db.getCliente(id);
        confirmar(`¿Está seguro de eliminar al cliente "${cliente.nombres} ${cliente.apellidos}"?`, (confirmado) => {
            if (confirmado) {
                db.deleteCliente(id);
                showNotification('Cliente eliminado', 'success');
                app.changeModule('clientes');
            }
        });
    },
    
    verDetalles: function(cliente) {
        const edad = calcularEdad(cliente.fechaNacimiento);
        const compras = cliente.historialCompras || [];
        const totalGastado = compras.reduce((sum, c) => sum + c.total, 0);
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2><i class="fas fa-user"></i> Detalles del Cliente</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0;">
                    <div>
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Información Personal</h3>
                        <p><strong>Nombres:</strong> ${cliente.nombres}</p>
                        <p><strong>Apellidos:</strong> ${cliente.apellidos}</p>
                        <p><strong>DNI:</strong> ${cliente.dni}</p>
                        <p><strong>Edad:</strong> ${edad} años</p>
                        <p><strong>Fecha de Nacimiento:</strong> ${formatDate(cliente.fechaNacimiento)}</p>
                    </div>
                    <div>
                        <h3 style="color: var(--primary); margin-bottom: 15px;">Información de Contacto</h3>
                        <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
                        <p><strong>Email:</strong> ${cliente.email}</p>
                        <p><strong>Dirección:</strong> ${cliente.direccion}</p>
                        <p><strong>Registrado:</strong> ${formatDate(cliente.fechaRegistro)}</p>
                    </div>
                </div>
                
                <div class="stats-grid" style="margin: 25px 0;">
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-shopping-bag"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Compras</h3>
                            <p>${compras.length}</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon green">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>Total Gastado</h3>
                            <p>${formatMoney(totalGastado)}</p>
                        </div>
                    </div>
                </div>
                
                <h3 style="color: var(--primary); margin: 25px 0 15px 0;">
                    <i class="fas fa-history"></i> Historial de Compras
                </h3>
                
                ${compras.length > 0 ? `
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Comprobante</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${compras.slice().reverse().map(c => {
                                const venta = db.getVentas().find(v => v.id === c.ventaId);
                                return `
                                    <tr>
                                        <td>${formatDateTime(c.fecha)}</td>
                                        <td>${venta ? venta.numeroComprobante : '-'}</td>
                                        <td>${formatMoney(c.total)}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                ` : '<p class="text-center" style="color: #9ca3af; padding: 20px;">No hay compras registradas</p>'}
                
                <div style="margin-top: 25px; text-align: center;">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Cerrar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    init: function() {
        setTimeout(() => {
            const searchInput = document.getElementById('searchCliente');
            if (searchInput) {
                searchInput.addEventListener('input', () => this.buscarClientes());
            }
        }, 100);
    }
};

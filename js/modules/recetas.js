// ========================================
// MÓDULO: RECETAS MÉDICAS
// ========================================

const Recetas = {
    render: function() {
        return `
            <div class="recetas-module">
                <h1 class="page-title">
                    <i class="fas fa-prescription"></i> Recetas Médicas
                </h1>
                
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    <strong>Importante:</strong> Las recetas médicas son obligatorias para la dispensación de 
                    medicamentos controlados como antibióticos, psicotrópicos y estupefacientes.
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-file-medical"></i> Registro de Recetas
                        </h3>
                        <button class="btn btn-primary" onclick="Recetas.mostrarFormularioReceta()">
                            <i class="fas fa-plus"></i> Registrar Receta
                        </button>
                    </div>
                    
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Paciente</th>
                                    <th>Médico</th>
                                    <th>CMP</th>
                                    <th>Diagnóstico</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.renderRecetas()}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Productos que requieren receta -->
                ${this.renderProductosConReceta()}
            </div>
        `;
    },
    
    renderRecetas: function() {
        const recetas = db.getRecetas();
        
        if (recetas.length === 0) {
            return '<tr><td colspan="8" class="text-center">No hay recetas registradas</td></tr>';
        }
        
        return recetas.slice().reverse().map(r => {
            const cliente = db.getCliente(r.pacienteId);
            const estadoBadge = r.dispensada ? 'badge-success' : 'badge-warning';
            const estadoTexto = r.dispensada ? 'Dispensada' : 'Pendiente';
            
            return `
                <tr>
                    <td><strong>${r.id}</strong></td>
                    <td>${formatDate(r.fechaRegistro)}</td>
                    <td>${cliente ? `${cliente.nombres} ${cliente.apellidos}` : 'No especificado'}</td>
                    <td>${r.nombreMedico}</td>
                    <td>${r.cmpMedico}</td>
                    <td>${r.diagnostico}</td>
                    <td><span class="badge ${estadoBadge}">${estadoTexto}</span></td>
                    <td>
                        <button class="btn btn-info" onclick='Recetas.verDetalles(${JSON.stringify(r).replace(/'/g, "\\'")})'
                                style="padding: 5px 10px; margin-right: 5px;">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${!r.dispensada ? `
                            <button class="btn btn-success" onclick="Recetas.marcarDispensada(${r.id})"
                                    style="padding: 5px 10px;">
                                <i class="fas fa-check"></i> Dispensar
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;
        }).join('');
    },
    
    renderProductosConReceta: function() {
        const productos = db.getProductos().filter(p => p.requiereReceta);
        
        return `
            <div class="card" style="margin-top: 25px;">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="fas fa-exclamation-triangle"></i> 
                        Productos que Requieren Receta (${productos.length})
                    </h3>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Stock</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productos.map(p => `
                                <tr>
                                    <td><strong>${p.nombre}</strong></td>
                                    <td>${p.categoria}</td>
                                    <td>${p.stock} und.</td>
                                    <td>${formatMoney(p.precio)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    mostrarFormularioReceta: function() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2><i class="fas fa-file-medical"></i> Registrar Receta Médica</h2>
                
                <form id="formReceta" onsubmit="event.preventDefault(); Recetas.guardarReceta()">
                    <h3 style="color: var(--primary); margin: 20px 0 15px 0;">Datos del Paciente</h3>
                    
                    <div class="form-group">
                        <label>Seleccionar Paciente (Opcional)</label>
                        <select class="form-control" id="recetaPaciente">
                            <option value="">No registrado</option>
                            ${db.getClientes().map(c => 
                                `<option value="${c.id}">${c.nombres} ${c.apellidos} - ${c.dni}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nombres del Paciente *</label>
                            <input type="text" class="form-control" id="recetaNombrePaciente" required>
                        </div>
                        <div class="form-group">
                            <label>DNI del Paciente *</label>
                            <input type="text" class="form-control" id="recetaDniPaciente" 
                                   pattern="[0-9]{8}" maxlength="8" required>
                        </div>
                    </div>
                    
                    <h3 style="color: var(--primary); margin: 25px 0 15px 0;">Datos del Médico</h3>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nombre del Médico *</label>
                            <input type="text" class="form-control" id="recetaNombreMedico" required>
                        </div>
                        <div class="form-group">
                            <label>CMP (Colegio Médico) *</label>
                            <input type="text" class="form-control" id="recetaCmpMedico" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Especialidad</label>
                        <input type="text" class="form-control" id="recetaEspecialidad" 
                               placeholder="Ej: Medicina General, Pediatría, etc.">
                    </div>
                    
                    <h3 style="color: var(--primary); margin: 25px 0 15px 0;">Prescripción</h3>
                    
                    <div class="form-group">
                        <label>Diagnóstico *</label>
                        <input type="text" class="form-control" id="recetaDiagnostico" 
                               placeholder="Ej: Infección respiratoria aguda" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Medicamentos Prescritos *</label>
                        <div id="medicamentosContainer">
                            <div class="medicamento-item" style="display: flex; gap: 10px; margin-bottom: 10px;">
                                <select class="form-control" name="medicamento" required>
                                    <option value="">Seleccionar medicamento...</option>
                                    ${db.getProductos().filter(p => p.requiereReceta).map(p => 
                                        `<option value="${p.id}">${p.nombre}</option>`
                                    ).join('')}
                                </select>
                                <input type="text" class="form-control" name="dosis" 
                                       placeholder="Dosis (Ej: 1 cada 8 horas)" required style="max-width: 300px;">
                                <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()" 
                                        style="padding: 10px 15px;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-secondary" onclick="Recetas.agregarMedicamento()" style="margin-top: 10px;">
                            <i class="fas fa-plus"></i> Agregar Medicamento
                        </button>
                    </div>
                    
                    <div class="form-group">
                        <label>Indicaciones Adicionales</label>
                        <textarea class="form-control" id="recetaIndicaciones" rows="3" 
                                  placeholder="Indicaciones especiales para el paciente..."></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Duración del Tratamiento *</label>
                            <input type="text" class="form-control" id="recetaDuracion" 
                                   placeholder="Ej: 7 días" required>
                        </div>
                        <div class="form-group">
                            <label>Fecha de Emisión *</label>
                            <input type="date" class="form-control" id="recetaFechaEmision" 
                                   value="${new Date().toISOString().split('T')[0]}" required>
                        </div>
                    </div>
                    
                    <div style="margin-top: 25px; display: flex; gap: 10px; justify-content: flex-end;">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Registrar Receta
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-completar datos del paciente si se selecciona uno
        document.getElementById('recetaPaciente').addEventListener('change', function(e) {
            if (e.target.value) {
                const cliente = db.getCliente(parseInt(e.target.value));
                document.getElementById('recetaNombrePaciente').value = `${cliente.nombres} ${cliente.apellidos}`;
                document.getElementById('recetaDniPaciente').value = cliente.dni;
            }
        });
    },
    
    agregarMedicamento: function() {
        const container = document.getElementById('medicamentosContainer');
        const div = document.createElement('div');
        div.className = 'medicamento-item';
        div.style.cssText = 'display: flex; gap: 10px; margin-bottom: 10px;';
        div.innerHTML = `
            <select class="form-control" name="medicamento" required>
                <option value="">Seleccionar medicamento...</option>
                ${db.getProductos().filter(p => p.requiereReceta).map(p => 
                    `<option value="${p.id}">${p.nombre}</option>`
                ).join('')}
            </select>
            <input type="text" class="form-control" name="dosis" 
                   placeholder="Dosis (Ej: 1 cada 8 horas)" required style="max-width: 300px;">
            <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()" 
                    style="padding: 10px 15px;">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(div);
    },
    
    guardarReceta: function() {
        // Recopilar medicamentos
        const medicamentosItems = document.querySelectorAll('.medicamento-item');
        const medicamentos = [];
        
        medicamentosItems.forEach(item => {
            const productoId = item.querySelector('[name="medicamento"]').value;
            const dosis = item.querySelector('[name="dosis"]').value;
            
            if (productoId && dosis) {
                const producto = db.getProducto(parseInt(productoId));
                medicamentos.push({
                    productoId: parseInt(productoId),
                    nombre: producto.nombre,
                    dosis: dosis
                });
            }
        });
        
        if (medicamentos.length === 0) {
            showNotification('Debe agregar al menos un medicamento', 'warning');
            return;
        }
        
        const receta = {
            pacienteId: document.getElementById('recetaPaciente').value ? 
                parseInt(document.getElementById('recetaPaciente').value) : null,
            nombrePaciente: document.getElementById('recetaNombrePaciente').value,
            dniPaciente: document.getElementById('recetaDniPaciente').value,
            nombreMedico: document.getElementById('recetaNombreMedico').value,
            cmpMedico: document.getElementById('recetaCmpMedico').value,
            especialidad: document.getElementById('recetaEspecialidad').value,
            diagnostico: document.getElementById('recetaDiagnostico').value,
            medicamentos: medicamentos,
            indicaciones: document.getElementById('recetaIndicaciones').value,
            duracion: document.getElementById('recetaDuracion').value,
            fechaEmision: document.getElementById('recetaFechaEmision').value,
            dispensada: false
        };
        
        db.addReceta(receta);
        showNotification('Receta registrada exitosamente', 'success');
        
        document.querySelector('.modal').remove();
        app.changeModule('recetas');
    },
    
    verDetalles: function(receta) {
        const cliente = receta.pacienteId ? db.getCliente(receta.pacienteId) : null;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content modal-large">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2><i class="fas fa-prescription"></i> Receta Médica</h2>
                    <p style="font-size: 1.1rem; color: #6b7280;">ID: ${receta.id} - ${formatDate(receta.fechaEmision)}</p>
                    <span class="badge ${receta.dispensada ? 'badge-success' : 'badge-warning'}" 
                          style="font-size: 1rem; padding: 8px 16px;">
                        ${receta.dispensada ? 'DISPENSADA' : 'PENDIENTE'}
                    </span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px;">
                    <div style="background: var(--light); padding: 20px; border-radius: 8px;">
                        <h3 style="color: var(--primary); margin-bottom: 15px;">
                            <i class="fas fa-user"></i> Datos del Paciente
                        </h3>
                        <p><strong>Nombre:</strong> ${receta.nombrePaciente}</p>
                        <p><strong>DNI:</strong> ${receta.dniPaciente}</p>
                        ${cliente ? `
                            <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
                            <p><strong>Edad:</strong> ${calcularEdad(cliente.fechaNacimiento)} años</p>
                        ` : ''}
                    </div>
                    
                    <div style="background: var(--light); padding: 20px; border-radius: 8px;">
                        <h3 style="color: var(--primary); margin-bottom: 15px;">
                            <i class="fas fa-user-md"></i> Datos del Médico
                        </h3>
                        <p><strong>Nombre:</strong> ${receta.nombreMedico}</p>
                        <p><strong>CMP:</strong> ${receta.cmpMedico}</p>
                        ${receta.especialidad ? `<p><strong>Especialidad:</strong> ${receta.especialidad}</p>` : ''}
                    </div>
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid var(--warning);">
                    <h3 style="color: #92400e; margin-bottom: 10px;">
                        <i class="fas fa-stethoscope"></i> Diagnóstico
                    </h3>
                    <p style="font-size: 1.1rem; margin: 0;">${receta.diagnostico}</p>
                </div>
                
                <h3 style="color: var(--primary); margin-bottom: 15px;">
                    <i class="fas fa-pills"></i> Medicamentos Prescritos
                </h3>
                <table style="margin-bottom: 25px;">
                    <thead>
                        <tr>
                            <th>Medicamento</th>
                            <th>Dosis e Indicaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${receta.medicamentos.map(m => `
                            <tr>
                                <td><strong>${m.nombre}</strong></td>
                                <td>${m.dosis}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                ${receta.indicaciones ? `
                    <div style="background: var(--light); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <strong>Indicaciones Adicionales:</strong>
                        <p style="margin: 10px 0 0 0;">${receta.indicaciones}</p>
                    </div>
                ` : ''}
                
                <div style="background: var(--light); padding: 15px; border-radius: 8px;">
                    <p><strong>Duración del Tratamiento:</strong> ${receta.duracion}</p>
                    <p style="margin: 5px 0 0 0;"><strong>Fecha de Emisión:</strong> ${formatDate(receta.fechaEmision)}</p>
                </div>
                
                <div style="margin-top: 25px; text-align: center; display: flex; gap: 10px; justify-content: center;">
                    ${!receta.dispensada ? `
                        <button class="btn btn-success" onclick="Recetas.marcarDispensada(${receta.id}); this.closest('.modal').remove();">
                            <i class="fas fa-check"></i> Marcar como Dispensada
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
    
    marcarDispensada: function(id) {
        confirmar('¿Confirma que ha dispensado esta receta?', (confirmado) => {
            if (confirmado) {
                db.updateReceta(id, { dispensada: true, fechaDispensacion: new Date().toISOString() });
                showNotification('Receta marcada como dispensada', 'success');
                app.changeModule('recetas');
            }
        });
    },
    
    init: function() {
        // Inicialización si es necesaria
    }
};

# 🎓 GUÍA PARA EL PROFESOR - Sistema Farmacéutico

## 👨‍🏫 Estimado Profesor

Este documento está diseñado especialmente para usted como docente del curso TICs II de Farmacia.

---

## 📂 CONTENIDO DEL SISTEMA

### Archivos Principales
```
SISTEMA FARMACIA/
│
├── index.html              ← Aplicación principal
├── guia-rapida.html        ← Guía imprimible para estudiantes
├── README.md               ← Documentación completa
│
├── css/
│   └── styles.css          ← Estilos del sistema
│
└── js/
    ├── data.js             ← Datos iniciales (25 productos, 5 clientes)
    ├── utils.js            ← Funciones auxiliares
    ├── app.js              ← Aplicación principal
    └── modules/
        ├── dashboard.js    ← Módulo Dashboard
        ├── pos.js          ← Módulo Punto de Venta
        ├── inventario.js   ← Módulo Inventario
        ├── clientes.js     ← Módulo Clientes
        ├── recetas.js      ← Módulo Recetas Médicas
        └── reportes.js     ← Módulo Reportes
```

---

## 🚀 INSTALACIÓN Y USO EN CLASE

### Opción 1: Uso Directo (Más Fácil)
1. Abrir `index.html` directamente en cualquier navegador
2. ¡Listo! El sistema funciona

### Opción 2: Con XAMPP (Recomendado)
1. Asegurarse que XAMPP esté instalado
2. La carpeta ya está en `C:\xampp\htdocs\SISTEMA FARMACIA\`
3. Iniciar Apache en XAMPP
4. Acceder desde: `http://localhost/SISTEMA%20FARMACIA/`

### Opción 3: Para Laboratorio de Cómputo
1. Copiar toda la carpeta a cada PC
2. Los estudiantes abren `index.html`
3. Cada estudiante trabaja de forma independiente

---

## 📚 PLAN DE CLASE SUGERIDO

### Sesión 1: Introducción (2 horas)
**Objetivos:**
- Familiarización con la interfaz
- Entender el flujo de trabajo farmacéutico

**Actividades:**
1. **15 min:** Presentación del sistema (proyectar en pantalla)
2. **15 min:** Tour por todos los módulos
3. **30 min:** Ejercicio guiado: Realizar una venta simple
4. **30 min:** Práctica individual: Cada estudiante realiza 3 ventas
5. **30 min:** Discusión: ¿Qué observaron? ¿Qué alertas vieron?

**Entregable:** Screenshot de 3 comprobantes de venta

---

### Sesión 2: Gestión de Inventario (2 horas)
**Objetivos:**
- Control de stock
- Manejo de vencimientos
- Categorización de productos

**Actividades:**
1. **20 min:** Explicar importancia del control de inventario
2. **40 min:** Ejercicio: Agregar 5 productos nuevos
3. **30 min:** Identificar y documentar alertas (vencidos, stock bajo)
4. **30 min:** Caso práctico: ¿Qué hacer con productos próximos a vencer?

**Entregable:** Lista de productos agregados y plan de acción para alertas

---

### Sesión 3: Recetas Médicas (2 horas)
**Objetivos:**
- Entender medicamentos controlados
- Registro de recetas
- Cumplimiento normativo

**Actividades:**
1. **20 min:** Marco legal de recetas médicas en Perú
2. **30 min:** Demostración: Registrar receta completa
3. **40 min:** Práctica: Cada estudiante registra 2 recetas
4. **30 min:** Simulación: Intentar vender medicamento sin receta

**Entregable:** 2 recetas médicas completas registradas

---

### Sesión 4: Análisis y Reportes (2 horas)
**Objetivos:**
- Toma de decisiones basada en datos
- Interpretación de estadísticas
- Gestión de clientes

**Actividades:**
1. **15 min:** Importancia de los reportes en farmacias
2. **45 min:** Ejercicio completo:
   - Realizar 10 ventas variadas
   - Registrar 3 clientes
   - Generar reportes
3. **30 min:** Análisis grupal de resultados
4. **30 min:** Presentación de hallazgos

**Entregable:** Informe de análisis con capturas de pantalla

---

## 🎯 EJERCICIOS EVALUABLES

### Evaluación Práctica 1: Operación Diaria (20 puntos)
**Instrucciones:**
1. Realizar 5 ventas diferentes con:
   - Al menos 1 con cliente registrado
   - Al menos 1 con medicamento que requiere receta
   - Usar diferentes métodos de pago
   - Generar boletas y facturas

2. Registrar 2 clientes nuevos con todos sus datos

3. Identificar y documentar todas las alertas del sistema

**Criterios de evaluación:**
- Completitud de datos (5 pts)
- Validación correcta de recetas (5 pts)
- Registro correcto de clientes (5 pts)
- Identificación de alertas (5 pts)

---

### Evaluación Práctica 2: Gestión de Inventario (20 puntos)
**Instrucciones:**
1. Agregar 10 productos nuevos al inventario con:
   - Diferentes categorías
   - Fechas de vencimiento variadas
   - Productos con y sin receta

2. Generar reporte de:
   - Productos próximos a vencer
   - Productos con stock bajo
   - Valor total del inventario

**Criterios de evaluación:**
- Calidad de datos ingresados (10 pts)
- Correcta categorización (5 pts)
- Análisis del reporte (5 pts)

---

### Evaluación Final: Caso Integral (60 puntos)
**Escenario:**
"Usted es el farmacéutico encargado de una botica durante un día completo"

**Tareas:**
1. **Mañana (9am-12pm):** (20 pts)
   - Revisar alertas del Dashboard
   - Realizar inventario de productos vencidos
   - Atender 10 ventas diferentes

2. **Tarde (3pm-6pm):** (20 pts)
   - Registrar 5 recetas médicas
   - Dispensar medicamentos correspondientes
   - Atender clientes frecuentes

3. **Cierre del día:** (20 pts)
   - Generar reporte de ventas del día
   - Identificar productos más vendidos
   - Proponer 3 acciones de mejora basadas en los datos

**Entregable:**
Informe completo con screenshots, análisis y conclusiones (formato PDF)

---

## 💡 TIPS PEDAGÓGICOS

### Para Maximizar el Aprendizaje:

1. **Inicio de Clase:**
   - Siempre proyectar el sistema
   - Hacer demostraciones en vivo
   - Permitir preguntas antes de práctica

2. **Durante la Práctica:**
   - Circular por el laboratorio
   - Resolver dudas individuales
   - Identificar errores comunes y comentarlos al grupo

3. **Cierre de Clase:**
   - Discusión grupal de lo aprendido
   - Resolver errores comunes encontrados
   - Preview de la siguiente sesión

### Errores Comunes de Estudiantes:

**Error 1: No verificar alertas**
- Solución: Hacer énfasis en revisar Dashboard primero

**Error 2: Intentar vender sin receta**
- Solución: Explicar consecuencias legales reales

**Error 3: No validar datos de entrada**
- Solución: Mostrar validaciones del sistema (DNI 8 dígitos, etc.)

**Error 4: Ignorar productos vencidos**
- Solución: Explicar responsabilidad legal y ética

---

## 🔧 PERSONALIZACIÓN DEL SISTEMA

### Agregar Más Productos:
Editar `js/data.js`, agregar en `productosIniciales`:
```javascript
{ 
    id: 26, 
    nombre: 'Nuevo Producto', 
    categoria: 'Categoría', 
    precio: 10.00, 
    stock: 100, 
    minStock: 20,
    laboratorio: 'Lab XYZ', 
    lote: 'L2024026', 
    vencimiento: '2026-12-31', 
    requiereReceta: false 
}
```

### Cambiar Colores:
Editar `css/styles.css`, sección `:root`:
```css
--primary: #2563eb;     /* Azul principal */
--secondary: #10b981;   /* Verde secundario */
```

---

## 📊 MÉTRICAS DE APRENDIZAJE

### Indicadores de Éxito:
- ✅ 100% de estudiantes realizan venta simple correctamente
- ✅ 90% registran recetas médicas sin errores
- ✅ 80% interpretan reportes correctamente
- ✅ 100% identifican productos vencidos

### Preguntas de Evaluación Oral:
1. ¿Qué medicamentos requieren receta médica?
2. ¿Qué hacer con un producto próximo a vencer?
3. ¿Cuál es la diferencia entre boleta y factura?
4. ¿Qué es el stock mínimo y para qué sirve?
5. ¿Qué información debe tener una receta médica?

---

## 🆘 RESOLUCIÓN DE PROBLEMAS

### Problema: "No se guardan los datos"
**Causa:** Navegador en modo incógnito
**Solución:** Usar navegador normal

### Problema: "El sistema está en inglés"
**Causa:** Navegador con idioma inglés
**Solución:** El sistema está 100% en español

### Problema: "Quiero resetear todo"
**Solución:**
1. Ir a Reportes → Resetear Sistema, O
2. Presionar F12 → Consola → escribir: `localStorage.clear(); location.reload()`

### Problema: "Quiero más productos iniciales"
**Solución:** Editar `js/data.js` y agregar en el array

---

## 📱 RECURSOS ADICIONALES

### Para Estudiantes:
- `guia-rapida.html` - Guía imprimible
- `README.md` - Documentación completa
- Botón "Ayuda" dentro del sistema

### Para el Profesor:
- Este documento
- Código fuente comentado
- Estructura modular fácil de explicar

---

## 🎬 DEMOSTRACIÓN INICIAL SUGERIDA

### Script para Presentación (15 minutos):

**Minuto 0-3:** Contexto
"En sus prácticas en farmacias, usarán sistemas como este..."

**Minuto 3-5:** Dashboard
"Aquí ven el estado general: ventas, alertas, productos..."

**Minuto 5-8:** Punto de Venta
"Así se realiza una venta real. Busco paracetamol, agrego al carrito..."

**Minuto 8-10:** Inventario
"Aquí controlan qué productos tienen, cuánto stock, vencimientos..."

**Minuto 10-12:** Recetas
"Los medicamentos controlados necesitan receta médica..."

**Minuto 12-14:** Reportes
"Con esto toman decisiones: qué vender más, qué clientes son frecuentes..."

**Minuto 14-15:** Cierre
"Ahora les toca a ustedes. Vamos a hacer una venta todos juntos..."

---

## 🏆 COMPETENCIAS DESARROLLADAS

Al finalizar el curso con este sistema, los estudiantes habrán desarrollado:

### Competencias Técnicas:
- ✅ Manejo de sistemas de punto de venta
- ✅ Gestión de inventario farmacéutico
- ✅ Control de medicamentos controlados
- ✅ Interpretación de reportes de gestión

### Competencias Profesionales:
- ✅ Atención al cliente
- ✅ Cumplimiento normativo
- ✅ Toma de decisiones basada en datos
- ✅ Organización y responsabilidad

### Competencias Digitales:
- ✅ Alfabetización digital
- ✅ Uso de software especializado
- ✅ Interpretación de interfaces
- ✅ Resolución de problemas tecnológicos

---

## 📞 NOTAS FINALES

### Ventajas de Este Sistema:
1. **Sin instalación compleja** - Funciona inmediatamente
2. **Sin costo** - No requiere licencias
3. **Realista** - Simula operaciones reales
4. **Educativo** - Diseñado para aprender
5. **Modificable** - Puede adaptarlo a sus necesidades

### Limitaciones (Por Diseño):
1. **Datos temporales** - Se pierden al borrar caché
2. **Sin red** - No hay sincronización entre PCs
3. **Sin autenticación** - Es para práctica, no producción

---

## ✅ CHECKLIST DE PREPARACIÓN DE CLASE

Antes de cada sesión:
- [ ] Verificar que XAMPP esté funcionando (si se usa)
- [ ] Probar el sistema en al menos una PC del laboratorio
- [ ] Tener `guia-rapida.html` lista para imprimir
- [ ] Preparar ejercicios específicos de la sesión
- [ ] Revisar datos iniciales del sistema
- [ ] Tener plan B (copias en USB) por si falla algo

Durante la clase:
- [ ] Proyectar el sistema para demostraciones
- [ ] Dar 5 minutos iniciales para que abran el sistema
- [ ] Hacer rondas verificando que todos avancen
- [ ] Documentar dudas frecuentes para siguiente clase

Después de la clase:
- [ ] Recopilar entregables de los estudiantes
- [ ] Documentar errores comunes encontrados
- [ ] Preparar material de refuerzo si es necesario

---

## 🎓 ÉXITO EN SU ENSEÑANZA

Este sistema ha sido diseñado pensando en facilitar su labor docente y 
maximizar el aprendizaje de sus estudiantes.

**¡Mucho éxito en su clase de TICs II!** 🚀

---

_Última actualización: Octubre 2024_
_Sistema desarrollado para fines educativos exclusivamente_

# 🏥 Sistema de Gestión Farmacéutica - TICs II

## 📋 Descripción

Sistema educativo completo de gestión farmacéutica diseñado para enseñar a estudiantes de Farmacia cómo funcionan los sistemas informáticos reales en farmacias y boticas.

**Características principales:**
- ✅ 100% funcional sin necesidad de base de datos
- ✅ Datos guardados en localStorage del navegador
- ✅ Interfaz profesional y moderna
- ✅ Lógica realista de farmacia
- ✅ Módulos completos e interactivos

---

## 🎯 Módulos del Sistema

### 1. 📊 Dashboard (Panel de Control)
Vista general del estado de la farmacia con:
- Estadísticas de ventas del día y mes
- Total de productos e inventario
- Clientes registrados
- **Proveedores activos y órdenes pendientes** ⭐ NUEVO
- Alertas automáticas (stock bajo, productos vencidos, próximos a vencer)
- Top productos más vendidos
- Últimas ventas realizadas

### 2. 💰 Punto de Venta (POS)
Sistema completo de ventas que incluye:
- Búsqueda rápida de productos
- Carrito de compras interactivo
- Selección de cliente (opcional)
- Tipo de comprobante (Boleta/Factura)
- Métodos de pago (Efectivo, Tarjeta, Yape/Plin)
- Cálculo automático de IGV (18%)
- Generación de comprobantes imprimibles
- Validación de productos con receta médica

### 3. 📦 Gestión de Inventario
Control completo de productos:
- Lista completa de productos con stock
- Filtros por categoría y estado de stock
- Búsqueda avanzada
- Agregar/Editar/Eliminar productos
- Alertas de vencimiento
- Información de lotes
- Indicador de productos con receta
- **Actualización automática desde compras** ⭐ NUEVO

**Datos importantes de cada producto:**
- Nombre y categoría
- Laboratorio fabricante
- Precio unitario
- Stock actual y mínimo
- Número de lote
- Fecha de vencimiento
- Requiere receta médica (Sí/No)

### 4. 👥 Gestión de Clientes
Registro de pacientes/clientes:
- Alta, baja y modificación de clientes
- Datos personales completos
- Historial de compras
- Total gastado por cliente
- Búsqueda por DNI, nombre, teléfono o email
- Cálculo automático de edad

### 5. 📝 Recetas Médicas
Sistema de control de recetas:
- Registro de recetas médicas
- Datos del paciente y médico
- CMP del médico prescriptor
- Diagnóstico y medicamentos prescritos
- Dosis e indicaciones
- Control de dispensación
- Lista de productos que requieren receta
- Impresión de recetas

### 6. 📈 Reportes y Estadísticas
Análisis completo del negocio:
- Ventas por período (hoy, semana, mes, año)
- Ventas por método de pago
- Productos más vendidos

### 7. 🚚 Proveedores y Compras ⭐ **NUEVO - LO MÁS IMPORTANTE**
**Módulo fundamental** que completa el ciclo del negocio farmacéutico:

**Gestión de Proveedores:**
- Registro completo de proveedores farmacéuticos
- Datos empresariales (RUC, razón social, dirección)
- Información de contacto (persona, teléfono, email)
- Categorías de productos que suministran
- Días de crédito comercial
- Sistema de calificación (1-5 estrellas)
- Historial de compras por proveedor
- 5 proveedores pre-cargados de ejemplo

**Órdenes de Compra:**
- Creación de órdenes de compra profesionales
- Selección de proveedor
- Agregar múltiples productos por orden
- **Costo unitario** vs **Precio de venta** (cálculo de utilidad)
- Control de lotes y fechas de vencimiento
- Cálculo automático de totales
- Estados: Pendiente / Recibida

**Recepción de Mercadería:**
- Marcar órdenes como recibidas
- **Actualización automática del inventario**
- Creación automática de productos nuevos
- Control de calidad en recepción
- Trazabilidad completa

**Estadísticas de Compras:**
- Órdenes pendientes de recibir
- Órdenes recibidas totales
- Total invertido en compras
- Análisis por proveedor

**📚 Valor Educativo:**
Este módulo es **CRÍTICO** porque enseña:
- ✅ Ciclo completo del negocio (compra → inventario → venta)
- ✅ Diferencia entre costo y precio de venta
- ✅ Cálculo de márgenes de utilidad
- ✅ Gestión de proveedores y negociación
- ✅ Crédito comercial y flujo de caja
- ✅ Control de calidad en recepción
- ✅ Trazabilidad de lotes y vencimientos

**Ver documentación completa en:** `MODULO-PROVEEDORES.md`
- Estado del inventario
- Valor total del inventario
- Inventario por categoría
- Top 10 mejores clientes
- Exportación de datos

---

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Edge)
- Servidor local (XAMPP, WAMP, o similar) - **OPCIONAL**

### Opción 1: Uso Directo
1. Simplemente abra el archivo `index.html` en su navegador
2. ¡Listo! El sistema está funcionando

### Opción 2: Con XAMPP (Recomendado para clase)
1. Copie la carpeta completa a `C:\xampp\htdocs\`
2. Inicie Apache en XAMPP
3. Abra el navegador y vaya a: `http://localhost/SISTEMA%20FARMACIA/`

---

## 📚 Guía de Uso para Estudiantes

### Primer Uso
El sistema viene precargado con:
- ✅ 25 productos de diferentes categorías
- ✅ 5 clientes de ejemplo
- ✅ Datos listos para practicar

### Realizar una Venta
1. Ir a **Punto de Venta**
2. Buscar productos en el campo de búsqueda
3. Hacer clic en el producto para agregarlo al carrito
4. Ajustar cantidades si es necesario
5. Seleccionar cliente (opcional)
6. Elegir tipo de comprobante y método de pago
7. Clic en **Procesar Venta**
8. Se genera el comprobante automáticamente

### Gestionar Inventario
1. Ir a **Inventario**
2. Ver alertas de stock bajo o productos vencidos
3. **Nuevo Producto**: Clic en botón verde superior derecho
4. **Editar**: Clic en botón azul (lápiz)
5. **Eliminar**: Clic en botón rojo (papelera)
6. Usar filtros para buscar productos específicos

### Registrar Cliente
1. Ir a **Clientes**
2. Clic en **Nuevo Cliente**
3. Llenar formulario con datos válidos
4. El sistema valida DNI (8 dígitos) y teléfono (9 dígitos)
5. Ver historial de compras de cada cliente

### Registrar Receta
1. Ir a **Recetas Médicas**
2. Clic en **Registrar Receta**
3. Completar datos del paciente y médico
4. Seleccionar medicamentos y dosis
5. Guardar receta
6. Marcar como dispensada cuando se entregue

### Ver Reportes
1. Ir a **Reportes**
2. Seleccionar período a analizar
3. Ver estadísticas automáticas
4. Exportar datos si es necesario

---

## 🎓 Aspectos Pedagógicos

### Conceptos que Aprenderán

#### 1. **Flujo de Trabajo Farmacéutico**
- Recepción de productos
- Control de inventario
- Atención al cliente
- Dispensación de medicamentos
- Control de recetas

#### 2. **Regulaciones Farmacéuticas**
- Medicamentos con receta vs. sin receta
- Control de vencimientos
- Validación de recetas médicas
- Trazabilidad de lotes

#### 3. **Gestión de Inventario**
- Stock mínimo de seguridad
- Rotación de productos (PEPS/FIFO)
- Alertas de vencimiento
- Categorización de productos

#### 4. **Atención al Cliente**
- Registro de pacientes
- Historial de compras
- Fidelización de clientes

#### 5. **Gestión Administrativa**
- Tipos de comprobantes (Boleta/Factura)
- Métodos de pago
- Cálculo de impuestos (IGV)
- Reportes de ventas

---

## 💡 Casos de Uso para la Clase

### Ejercicio 1: Venta Simple
**Objetivo:** Familiarizarse con el punto de venta
1. Vender 3 Paracetamol a un cliente sin registro
2. Generar boleta
3. Pago en efectivo

### Ejercicio 2: Venta con Receta
**Objetivo:** Entender el control de medicamentos
1. Intentar vender Amoxicilina
2. Observar la advertencia de receta
3. Registrar receta médica primero
4. Completar la venta

### Ejercicio 3: Gestión de Stock
**Objetivo:** Control de inventario
1. Identificar productos con stock bajo
2. Agregar nuevo producto al inventario
3. Actualizar stock de un producto existente

### Ejercicio 4: Análisis de Ventas
**Objetivo:** Toma de decisiones basada en datos
1. Realizar 5 ventas diferentes
2. Ir a Reportes
3. Identificar producto más vendido
4. Analizar método de pago preferido

### Ejercicio 5: Cliente Frecuente
**Objetivo:** Gestión de relaciones con clientes
1. Registrar nuevo cliente
2. Realizar 3 compras para ese cliente
3. Ver su historial de compras
4. Calcular total gastado

---

## 🔧 Características Técnicas

### Tecnologías Utilizadas
- **HTML5**: Estructura
- **CSS3**: Diseño responsive
- **JavaScript (ES6+)**: Lógica de negocio
- **LocalStorage**: Almacenamiento de datos
- **Font Awesome**: Iconos

### Estructura de Datos

```javascript
// Producto
{
  id: 1,
  nombre: "Paracetamol 500mg",
  categoria: "Analgésico",
  precio: 0.50,
  stock: 500,
  minStock: 50,
  laboratorio: "Tecnoquímicas",
  lote: "L2024001",
  vencimiento: "2025-12-31",
  requiereReceta: false
}

// Cliente
{
  id: 1,
  nombres: "Juan",
  apellidos: "Pérez",
  dni: "12345678",
  telefono: "987654321",
  email: "juan@email.com",
  direccion: "Av. Principal 123",
  fechaNacimiento: "1985-05-15",
  fechaRegistro: "2024-01-15",
  historialCompras: []
}

// Venta
{
  id: 1,
  numeroComprobante: "B001-00000001",
  tipoComprobante: "Boleta",
  metodoPago: "Efectivo",
  clienteId: 1,
  items: [],
  subtotal: 10.00,
  igv: 1.80,
  total: 11.80,
  fecha: "2024-10-20T10:30:00"
}
```

### Funciones Importantes

#### Formateo
- `formatMoney(amount)`: Formatea números como moneda
- `formatDate(date)`: Formatea fechas
- `formatDateTime(date)`: Formatea fecha y hora

#### Validación
- `validarDNI(dni)`: Valida 8 dígitos
- `validarEmail(email)`: Valida formato email
- `validarTelefono(tel)`: Valida 9 dígitos

#### Cálculos
- `calcularEdad(fecha)`: Calcula edad actual
- `diasHastaVencimiento(fecha)`: Días hasta vencer
- `calcularTotalVentas(ventas)`: Suma total

---

## 🎨 Personalización

### Cambiar Colores
Editar variables en `css/styles.css`:
```css
:root {
    --primary: #2563eb;     /* Color principal */
    --secondary: #10b981;   /* Color secundario */
    --danger: #ef4444;      /* Color de peligro */
    --warning: #f59e0b;     /* Color de advertencia */
}
```

### Agregar Nuevas Categorías
Las categorías se generan automáticamente desde los productos existentes.

---

## 🔄 Resetear el Sistema

### Opción 1: Resetear a Datos Iniciales
1. Ir a **Reportes**
2. Clic en **Resetear Sistema**
3. Confirmar

### Opción 2: Limpiar Todo
Desde la consola del navegador:
```javascript
localStorage.clear();
location.reload();
```

---

## ⚠️ Importante para el Profesor

### Limitaciones (Por Diseño Educativo)
- ✅ Datos temporales en navegador
- ✅ Se pierden al borrar caché
- ✅ No hay autenticación real
- ✅ Sin conexión a servidor

### Ventajas para Enseñanza
- ✅ Sin instalación compleja
- ✅ Funciona en cualquier PC
- ✅ Sin costos de hosting
- ✅ Fácil de modificar
- ✅ Código limpio y comentado

---

## 📖 Glosario Farmacéutico

- **CMP**: Código del Colegio Médico del Perú
- **Lote**: Número de identificación de producción
- **Stock Mínimo**: Cantidad mínima antes de reorden
- **IGV**: Impuesto General a las Ventas (18%)
- **PEPS/FIFO**: Primero en Entrar, Primero en Salir
- **Dispensación**: Entrega de medicamentos
- **Receta Magistral**: Preparación personalizada

---

## 🆘 Soporte y Ayuda

### Dentro del Sistema
- Botón **Ayuda** (esquina superior derecha)
- Tooltips en campos de formulario
- Alertas informativas

### Atajos de Teclado
- `Ctrl + K`: Ir a Punto de Venta
- `Ctrl + H`: Abrir ayuda
- `Escape`: Cerrar modales

---

## 📝 Notas para Estudiantes

### Buenas Prácticas
1. Revisar alertas del Dashboard diariamente
2. Mantener inventario actualizado
3. Registrar siempre las recetas médicas
4. Verificar vencimientos antes de vender
5. Mantener stock mínimo de productos esenciales

### Errores Comunes a Evitar
- ❌ Vender productos vencidos
- ❌ No verificar recetas en medicamentos controlados
- ❌ Ignorar alertas de stock bajo
- ❌ No registrar clientes frecuentes

---

## 🎯 Objetivos de Aprendizaje

Al finalizar la práctica, los estudiantes podrán:
1. ✅ Comprender el flujo de trabajo en una farmacia
2. ✅ Manejar un sistema de punto de venta
3. ✅ Controlar inventario farmacéutico
4. ✅ Validar y registrar recetas médicas
5. ✅ Generar reportes de gestión
6. ✅ Entender la importancia del control de calidad
7. ✅ Aplicar normativas farmacéuticas básicas

---

## 📞 Créditos

**Sistema desarrollado para fines educativos**
- Curso: TICs II
- Programa: Farmacia
- Año: 2024

---

## 🔐 Licencia

Este sistema es de uso exclusivamente educativo.
Libre para usar y modificar con fines pedagógicos.

---

**¡Éxito en su aprendizaje! 🎓💊**

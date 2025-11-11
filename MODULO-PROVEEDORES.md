# 📦 MÓDULO DE PROVEEDORES Y COMPRAS

## 🎯 OBJETIVO EDUCATIVO

Este módulo es **LO MÁS IMPORTANTE** que los estudiantes de farmacia deben comprender sobre la gestión comercial, porque les enseña el **ciclo completo del negocio farmacéutico**:

```
COMPRA → INVENTARIO → VENTA → UTILIDAD
```

### ¿Por qué es tan importante?

1. **Comprenden el origen de los productos**: Los medicamentos no aparecen mágicamente en la farmacia
2. **Aprenden sobre costos vs precios**: La diferencia entre lo que cuesta comprar y el precio de venta
3. **Entienden las utilidades**: Cómo calcular márgenes de ganancia realistas
4. **Conocen la cadena de suministro**: Relaciones con proveedores, plazos de crédito, negociación
5. **Gestionan inventarios de forma profesional**: Recepción, verificación de lotes y fechas de vencimiento

---

## 📋 FUNCIONALIDADES DEL MÓDULO

### 1️⃣ GESTIÓN DE PROVEEDORES

#### Registro de Proveedores
Los estudiantes pueden registrar nuevos proveedores farmacéuticos con:

- **Datos de la Empresa**:
  - Razón Social (nombre legal de la empresa)
  - RUC (11 dígitos - identificación tributaria peruana)
  - Dirección fiscal

- **Información de Contacto**:
  - Persona de contacto (representante de ventas)
  - Teléfono
  - Email corporativo

- **Información Comercial**:
  - Categorías de productos que vende (medicamentos, vitaminas, equipos, etc.)
  - Días de crédito (plazo para pagar: 15, 30, 45, 60 días)
  - Calificación del proveedor (1 a 5 estrellas)

#### Proveedores Pre-cargados
El sistema incluye 5 proveedores reales de ejemplo:

1. **Droguería Alfaro S.A.** - Medicamentos genéricos y de marca
2. **Laboratorios Unidos SAC** - Productos de laboratorio
3. **Distribuidora MedFarma** - Equipos médicos y material descartable
4. **Insumos Médicos del Perú** - Vitaminas y suplementos
5. **Química Suiza SAC** - Productos dermatológicos y de higiene

---

### 2️⃣ ÓRDENES DE COMPRA

#### Creación de Órdenes
Los estudiantes aprenden a:

1. **Seleccionar un proveedor** de la lista registrada
2. **Agregar productos a la orden** con los siguientes datos:
   - Nombre del producto
   - Cantidad a ordenar
   - **Costo unitario** (lo que nos cuesta comprarlo)
   - **Precio de venta** (lo que cobraremos al cliente)
   - Número de lote (trazabilidad)
   - Fecha de vencimiento (control de calidad)

3. **Calcular automáticamente**:
   - Subtotal por producto (cantidad × costo)
   - Total de la orden
   - Margen de utilidad (precio venta - costo)

#### Estados de la Orden
- **Pendiente**: Orden enviada al proveedor, esperando mercadería
- **Recibida**: Mercadería recibida e inventario actualizado

---

### 3️⃣ RECEPCIÓN DE MERCADERÍA

Esta es una función **CRÍTICA** para enseñar el proceso real:

1. Cuando llega la mercadería del proveedor
2. El estudiante marca la orden como "Recibida"
3. **El sistema actualiza automáticamente el inventario**:
   - Si el producto YA EXISTE: suma la cantidad al stock
   - Si el producto NO EXISTE: lo crea en el inventario
   - Actualiza lotes y fechas de vencimiento

**Esto enseña**: 
- Control de inventarios
- Verificación de mercadería recibida
- Importancia de revisar lotes y fechas
- Trazabilidad de productos

---

## 🎓 VALOR PEDAGÓGICO

### Conceptos que aprenden:

#### 1. **Margen de Utilidad**
```
Ejemplo práctico:
- Compras Paracetamol 500mg a S/ 0.50 (costo)
- Lo vendes a S/ 1.00 (precio)
- Utilidad: S/ 0.50 por unidad (100% de margen)
```

#### 2. **Crédito Comercial**
```
- Proveedor A: 15 días de crédito (pago rápido, posible descuento)
- Proveedor B: 60 días de crédito (mejor flujo de caja)
```

#### 3. **Gestión de Proveedores**
```
- Calificar proveedores según servicio
- Diversificar fuentes de suministro
- Negociar mejores condiciones
```

#### 4. **Control de Calidad**
```
- Verificar lotes
- Controlar fechas de vencimiento
- Detectar productos próximos a vencer
- Prevenir pérdidas por caducidad
```

---

## 💡 CASOS DE USO PRÁCTICOS

### Caso 1: Primera Compra
**Escenario**: La farmacia necesita reponer stock de paracetamol

1. Ir a "Proveedores y Compras"
2. Crear orden de compra con "Droguería Alfaro"
3. Agregar: Paracetamol 500mg, 100 unidades, costo S/ 0.50, venta S/ 1.00
4. Sistema calcula: Total S/ 50.00
5. Guardar orden (Estado: Pendiente)

### Caso 2: Recepción de Mercadería
**Escenario**: Llegó el pedido a la farmacia

1. Ver órdenes pendientes
2. Abrir detalles de la orden
3. Verificar productos, cantidades, lotes, fechas
4. Marcar como "Recibida"
5. **Sistema actualiza inventario automáticamente**
6. Verificar en módulo Inventario el stock actualizado

### Caso 3: Nuevo Producto
**Escenario**: Quieres vender un producto que no existe en inventario

1. Crear orden de compra
2. Agregar producto nuevo con todos sus datos
3. Recibir orden
4. **Sistema crea el producto automáticamente en inventario**
5. Ya está disponible para vender en el POS

---

## 📊 ESTADÍSTICAS Y REPORTES

El módulo muestra:

### En Proveedores:
- Total de proveedores registrados
- Calificación promedio
- Total de compras realizadas

### En Órdenes de Compra:
- Órdenes pendientes de recibir
- Órdenes recibidas
- Total invertido en compras

### En Dashboard:
- Nueva tarjeta con proveedores activos
- Alertas de órdenes pendientes

---

## 🔄 FLUJO COMPLETO DEL NEGOCIO

Con este módulo, los estudiantes comprenden el **ciclo completo**:

```
1. COMPRA
   ↓
   Registro de proveedor
   ↓
   Creación de orden de compra
   ↓
   Negociación de precios y crédito
   
2. RECEPCIÓN
   ↓
   Llegada de mercadería
   ↓
   Verificación de productos
   ↓
   Control de lotes y vencimientos
   ↓
   Actualización de inventario
   
3. ALMACENAMIENTO
   ↓
   Productos en stock
   ↓
   Control de fechas
   ↓
   Alertas de vencimiento
   
4. VENTA
   ↓
   Atención al cliente (POS)
   ↓
   Dispensación de medicamentos
   ↓
   Generación de utilidad
   
5. ANÁLISIS
   ↓
   Reportes de ventas
   ↓
   Cálculo de utilidades
   ↓
   Decisiones de recompra
```

---

## 🎯 OBJETIVOS DE APRENDIZAJE

Al usar este módulo, los estudiantes serán capaces de:

✅ **Registrar y gestionar proveedores** farmacéuticos
✅ **Crear órdenes de compra** profesionales
✅ **Calcular costos y precios** de venta
✅ **Determinar márgenes de utilidad** realistas
✅ **Recepcionar mercadería** con control de calidad
✅ **Actualizar inventarios** automáticamente
✅ **Controlar lotes y vencimientos** de medicamentos
✅ **Gestionar créditos** con proveedores
✅ **Evaluar proveedores** según desempeño
✅ **Comprender el ciclo completo** del negocio

---

## 📚 EJERCICIOS SUGERIDOS PARA ESTUDIANTES

### Ejercicio 1: Gestión de Proveedores
1. Registrar 3 nuevos proveedores con datos completos
2. Asignar diferentes días de crédito
3. Calificar según servicio imaginario

### Ejercicio 2: Orden de Compra Completa
1. Crear orden con al menos 5 productos
2. Calcular el total de inversión
3. Calcular la utilidad potencial total
4. Determinar el margen de ganancia porcentual

### Ejercicio 3: Recepción y Control
1. Crear orden con productos nuevos
2. Marcar como recibida
3. Verificar actualización en inventario
4. Vender esos productos en el POS
5. Calcular la utilidad real obtenida

### Ejercicio 4: Análisis Financiero
1. Hacer 3 compras a diferentes proveedores
2. Recepcionar todas
3. Vender productos
4. Comparar qué proveedor dio mejor margen
5. Calificar proveedores según rentabilidad

---

## 🔧 CARACTERÍSTICAS TÉCNICAS

### Datos almacenados (LocalStorage):

**Proveedores**:
```javascript
{
    id: 1,
    nombre: "Droguería Alfaro S.A.",
    ruc: "20123456789",
    contacto: "Carlos Mendoza",
    telefono: "01-4567890",
    email: "ventas@alfaro.com.pe",
    direccion: "Av. Venezuela 1234, Lima",
    categoriaProductos: ["Medicamentos", "Vitaminas"],
    calificacion: 5,
    diasCredito: 30
}
```

**Compras**:
```javascript
{
    id: 1,
    proveedorId: 1,
    fecha: "2024-01-15T10:30:00",
    items: [
        {
            nombreProducto: "Paracetamol 500mg",
            cantidad: 100,
            costoUnitario: 0.50,
            precioVenta: 1.00,
            lote: "L202401",
            vencimiento: "2025-12-31",
            subtotal: 50.00
        }
    ],
    total: 50.00,
    estado: "Pendiente", // o "Recibida"
    fechaRecepcion: null
}
```

---

## 🎓 CONCLUSIÓN

Este módulo **cierra el ciclo educativo** del sistema farmacéutico. 

Los estudiantes ya no solo aprenden a:
- Vender medicamentos (POS)
- Controlar inventarios (Inventario)
- Gestionar clientes (Clientes)
- Verificar recetas (Recetas)
- Generar reportes (Reportes)

**Ahora también aprenden**:
- De dónde vienen los productos
- Cuánto cuestan realmente
- Cómo se calculan las utilidades
- Cómo gestionar proveedores
- Cómo funciona la cadena de suministro

**Esto es lo más importante** porque les da una visión **completa y realista** de cómo funciona una farmacia como negocio, no solo como punto de venta.

---

## 👨‍🏫 MENSAJE PARA EL PROFESOR

Este módulo convierte su sistema en una herramienta pedagógica **COMPLETA**. 

Sus estudiantes podrán:
- Simular la apertura de una farmacia desde cero
- Comprender todos los aspectos del negocio
- Tomar decisiones comerciales informadas
- Aprender conceptos financieros básicos
- Prepararse para la realidad profesional

El sistema ahora cubre **100% del flujo operativo** de una farmacia moderna.

¡Sus estudiantes tienen en sus manos una experiencia de aprendizaje profesional! 🎓💊

---

**Desarrollado para TICs II - Carrera de Farmacia**  
Sistema completo de gestión farmacéutica con fines educativos

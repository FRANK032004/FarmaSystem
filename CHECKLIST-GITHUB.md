# ✅ CHECKLIST DE VERIFICACIÓN - GITHUB PAGES

## 🎯 Pasos para subir correctamente a GitHub

### 1️⃣ Verificar estructura de archivos (TODO DEBE EXISTIR):
```
✅ index.html (ACTUALIZADO con rutas ./css/ y ./js/)
✅ css/
   └── styles.css
✅ js/
   ├── app.js
   ├── data.js
   ├── utils.js
   └── modules/
       ├── clientes.js
       ├── dashboard.js
       ├── inventario.js
       ├── pos.js
       ├── proveedores.js
       ├── recetas.js
       └── reportes.js
```

### 2️⃣ Cambios realizados en index.html:
- ✅ `css/styles.css` → `./css/styles.css`
- ✅ `js/data.js` → `./js/data.js`
- ✅ Todos los scripts actualizados con `./`

### 3️⃣ Opciones para subir a GitHub:

#### OPCIÓN A: GitHub Desktop (Recomendado para principiantes)
1. Descargar: https://desktop.github.com/
2. Instalar y abrir
3. File → Clone repository → FRANK032004/FarmaSystem
4. Copiar TODOS los archivos actualizados a la carpeta clonada
5. Commit to main → Push origin

#### OPCIÓN B: Subir manualmente por web
1. Ir a: https://github.com/FRANK032004/FarmaSystem
2. Hacer clic en "Add file" → "Upload files"
3. Arrastrar TODOS los archivos y carpetas
4. Escribir mensaje: "Fix: Actualizar rutas para GitHub Pages"
5. Commit changes

#### OPCIÓN C: Instalar Git y usar terminal
1. Descargar Git: https://git-scm.com/download/win
2. Instalar y reiniciar VS Code
3. En la terminal:
   ```bash
   cd "c:\xampp\htdocs\SISTEMA FARMACIA"
   git init
   git add .
   git commit -m "Fix: Actualizar rutas para GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/FRANK032004/FarmaSystem.git
   git push -u origin main --force
   ```

### 4️⃣ Configurar GitHub Pages:
1. Ve a: https://github.com/FRANK032004/FarmaSystem/settings/pages
2. Verifica:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
3. Guardar si es necesario

### 5️⃣ Verificar que funcione:
1. Esperar 2-5 minutos después de subir
2. Visitar: https://frank032004.github.io/FarmaSystem/
3. Presionar Ctrl + Shift + R (forzar recarga sin caché)
4. Abrir consola del navegador (F12) → buscar errores 404

### 6️⃣ Solución de problemas comunes:

❌ **Error 404 en CSS/JS:**
- Verificar que las carpetas `css/` y `js/` existan en GitHub
- Verificar mayúsculas/minúsculas (debe ser `css`, no `CSS`)
- Limpiar caché del navegador

❌ **Página en blanco:**
- Abrir consola (F12) y buscar errores
- Verificar que todos los archivos .js existan

❌ **"There isn't a GitHub Pages site here":**
- Verificar configuración en Settings → Pages
- Esperar unos minutos más

### 7️⃣ Archivos actualizados en este fix:
- ✅ index.html (rutas actualizadas)
- ✅ .gitignore (nuevo)
- ✅ CHECKLIST-GITHUB.md (este archivo)

---

## 📝 NOTAS IMPORTANTES:

1. **NO olvides subir las carpetas css/ y js/ completas**
2. **Las rutas ahora usan `./` para mayor compatibilidad**
3. **GitHub Pages puede tardar hasta 10 minutos en actualizar**
4. **Limpia siempre la caché del navegador después de actualizar**

---

## 🆘 ¿Sigue sin funcionar?

Si después de seguir todos los pasos sigue sin funcionar:

1. Verifica la consola del navegador (F12)
2. Comparte la captura de los errores
3. Verifica que TODOS los archivos estén en GitHub (no solo el index.html)

**URL esperada:** https://frank032004.github.io/FarmaSystem/
**Repositorio:** https://github.com/FRANK032004/FarmaSystem

---

✨ **¡Tu sistema está listo para funcionar en GitHub Pages!** ✨

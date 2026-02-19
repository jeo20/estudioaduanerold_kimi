# Estudio Aduanero LD

Sitio web profesional para Estudio Aduanero LD - Despachante de Aduana, Agente de Transporte Aduanero y Agente Marítimo.

## Estructura del Proyecto

```
estudioaduanero/
├── components/
│   ├── colores.txt       # Paleta de colores del sitio
│   ├── footer.html       # Componente de footer (reutilizable)
│   ├── layout.html       # Layout base
│   └── navbar.html       # Componente de navegación (reutilizable)
├── css/
│   └── style.css         # Estilos personalizados
├── images/
│   └── hero-bg.jpg       # Imagen de fondo
├── js/
│   └── script.js         # JavaScript principal (carga componentes)
├── pages/
│   ├── contacto.html     # Página de contacto
│   ├── nosotros.html     # Página de empresa
│   ├── proyectos.html    # Página de proyectos
│   └── servicios.html    # Página de servicios
├── 404.html              # Página de error
├── index.html            # Página principal
├── readme.md             # Documentación
├── robots.txt            # SEO
├── sitemap.xml           # SEO
├── .gitignore            # Git ignore
└── _redirects            # Redirecciones
```

## Sistema de Componentes

El sitio utiliza un sistema de **carga dinámica de componentes** mediante JavaScript:

### Cómo funciona

1. **Contenedores en HTML**: Cada página tiene contenedores vacíos:
   ```html
   <div id="navbar-container"></div>
   <div id="footer-container"></div>
   ```

2. **Carga automática**: El archivo `script.js` carga los componentes desde `components/` usando `fetch()`

3. **Ajuste de rutas**: El script detecta automáticamente si está en la carpeta `pages/` y ajusta los enlaces

### Ventajas

- ✅ **Mantenibilidad**: Cambios en navbar/footer se aplican a todas las páginas
- ✅ **DRY**: No hay código duplicado
- ✅ **Escalabilidad**: Fácil agregar nuevas páginas
- ✅ **Consistencia**: Todas las páginas tienen el mismo header/footer

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **Tailwind CSS** - Framework CSS vía CDN
- **CSS3** - Estilos personalizados
- **JavaScript** - Interactividad y carga de componentes
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía Inter

## Características

- ✅ Diseño moderno y profesional
- ✅ Totalmente responsive
- ✅ Navegación fija con efecto scroll
- ✅ Animaciones al hacer scroll
- ✅ Menú móvil funcional
- ✅ Botón flotante de WhatsApp
- ✅ Formulario de contacto
- ✅ Página 404 personalizada
- ✅ Optimizado para SEO
- ✅ **Componentes reutilizables**

## Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| Primary | `#1e3a5f` | Color principal (azul marino) |
| Primary Dark | `#152a45` | Variante oscura |
| Secondary | `#c9a227` | Color secundario (dorado) |
| Text | `#1f2937` | Color de texto principal |
| Background | `#ffffff` | Fondo principal |
| Background Alt | `#f8fafc` | Fondo alternativo |

## Páginas

1. **Inicio** - Hero, servicios destacados, estadísticas, CTA
2. **Servicios** - Despacho Aduanero, Transporte, Agente Marítimo (detallado)
3. **Empresa** - Historia, misión, visión, valores, equipo
4. **Proyectos** - Casos de éxito, testimonios, estadísticas
5. **Contacto** - Formulario, info de contacto, mapa, redes sociales

## Modificar Componentes

Para modificar el navbar o footer:

1. Edita `components/navbar.html` o `components/footer.html`
2. Los cambios se aplicarán automáticamente a **todas** las páginas
3. No es necesario editar cada página individualmente

## Contacto

- **Dirección:** Paseo de los Arrieros 3068, Río Grande, Tierra del Fuego
- **Teléfono:** +54 9 2966 460200
- **Email:** ldriezler@estudioaduanerold.com.ar

---

© 2026 Estudio Aduanero LD - Todos los derechos reservados
# estudioaduanerold_kimi

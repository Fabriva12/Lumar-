<div align="center">
  <img src="/logo.png" alt="Perfumes Z-Aromac Logo" width="120" height="120" />

  # Perfumes Z-Aromac ✨

  **Tu tienda de perfumes de confianza**

  [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
  [![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)

  <br />

  [Explorar Hombres](https://perfumes-z-aromac.vercel.app/hombres) ·
  [Explorar Mujeres](https://perfumes-z-aromac.vercel.app/mujeres) ·
  [Contacto](mailto:info@perfumeszaromac.com)

  <br />
</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Tech Stack](#-tech-stack)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Empezando](#-empezando)
  - [Pre-requisitos](#pre-requisitos)
  - [Instalación](#instalación)
  - [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Rutas](#-rutas)
- [Paleta de Colores y Tipografía](#-paleta-de-colores-y-tipografía)
- [Arquitectura del Componente](#-arquitectura-del-componente)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🧪 Sobre el Proyecto

**Perfumes Z-Aromac** es una tienda en línea de perfumes con un diseño elegante y lujoso. Desarrollada con **React 19** y **Vite 6**, ofrece una experiencia de navegación fluida con catálogo segmentado por género, búsqueda de productos y consultas directas por WhatsApp.

> ⚡ **Rendimiento:** App single-page (SPA) con carga rápida, imagenes optimizadas y animaciones suaves.

### ✨ Características

- 🏠 **Página principal** con sección hero y productos destacados
- 👔 **Catálogo para hombres** — fragancias masculinas seleccionadas
- 💄 **Catálogo para mujeres** — perfumería femenina exclusiva
- 🔍 **Buscador en vivo** — filtrá productos por nombre o marca
- 📱 **Consulta por WhatsApp** — contacto directo con un clic
- 📐 **Diseño responsive** — experiencia óptima en desktop, tablet y mobile
- 🎨 **Animaciones suaves** — fade-in, slide-up y transiciones elegantes
- 🎯 **Ordenamiento por precio** — ascendente y descendente

---

## 🛠️ Tech Stack

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **[React](https://react.dev/)** | 19 | UI components y hooks |
| **[Vite](https://vite.dev/)** | 6 | Bundler y dev server |
| **[Tailwind CSS](https://tailwindcss.com/)** | 4 | Estilos utilitarios |
| **[Supabase](https://supabase.com/)** | ^2.49 | Base de datos y backend |
| **[React Router](https://reactrouter.com/)** | 7 | Enrutamiento SPA |

### Fuentes

| Fuente | Tipo | Uso |
|--------|------|-----|
| **Playfair Display** | Serif | Títulos, nombre de la tienda, precios |
| **Lato** | Sans-serif | Cuerpo de texto, descripciones, navegación |

---

## 📁 Estructura del Proyecto

```
perfumes-z-aromac/
├── public/                     # Archivos estáticos
│   ├── logo.png                # Logo de la tienda
│   └── fondo.png               # Imagen de fondo del sitio
│
├── src/
│   ├── components/
│   │   ├── catalog/            # Componentes del catálogo
│   │   │   ├── CatalogPage.jsx # Página de catálogo por género
│   │   │   └── ProductCard.jsx # Tarjeta individual de producto
│   │   │
│   │   ├── home/               # Componentes de la página principal
│   │   │   ├── HeroSection.jsx # Sección hero con logo y título
│   │   │   └── FeaturedProducts.jsx # Productos destacados
│   │   │
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── Header.jsx      # Barra de navegación + buscador
│   │   │   └── Footer.jsx      # Pie de página con redes
│   │   │
│   │   ├── product/            # Componentes de producto individual
│   │   │   └── ProductDetail.jsx # Vista detallada del producto
│   │   │
│   │   └── ui/                 # Componentes UI reutilizables
│   │       ├── Button.jsx      # Botón genérico (primary/secondary)
│   │       └── LoadingSpinner.jsx # Indicador de carga
│   │
│   ├── hooks/                  # Custom hooks de React
│   │   ├── useProducts.js      # Hook para obtener productos por género
│   │   └── useProduct.js       # Hook para obtener un producto por ID
│   │
│   ├── pages/                  # Páginas (componentes ruteables)
│   │   ├── HomePage.jsx        # Ruta: /
│   │   ├── HombresPage.jsx     # Ruta: /hombres
│   │   ├── MujeresPage.jsx     # Ruta: /mujeres
│   │   ├── ProductDetailPage.jsx # Ruta: /product/:id
│   │   └── SearchResultsPage.jsx # Ruta: /buscar?q=
│   │
│   ├── services/               # Servicios y conexiones externas
│   │   ├── supabase.js         # Cliente de Supabase
│   │   └── productsService.js  # CRUD de productos
│   │
│   ├── App.jsx                 # Componente raíz con routing
│   ├── main.jsx                # Entry point de React
│   └── index.css               # Estilos globales + tema Tailwind
│
├── .env                        # Variables de entorno (local)
├── index.html                  # HTML base
├── package.json                # Dependencias y scripts
├── pnpm-lock.yaml              # Lock de dependencias
├── pnpm-workspace.yaml         # Config workspace pnpm
├── vite.config.js              # Configuración de Vite
└── README.md                   # Este archivo
```

---

## 🚀 Empezando

### Pre-requisitos

- **Node.js** >= 18
- **pnpm** >= 8 (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/perfumes-z-aromac.git
cd perfumes-z-aromac

# Instalar dependencias con pnpm
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

La app se levanta en `http://localhost:5173` 🎉

### Variables de Entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key

# Redes Sociales
VITE_INSTAGRAM_URL=https://instagram.com/tu-perfil

# WhatsApp
VITE_WHATSAPP_NUMBER=5491123456789
```

> **ℹ️ Modo "solo diseño":** Si no configurás Supabase, la app funciona igual mostrando la interfaz visual. Los productos no se cargarán hasta que conectes la base de datos.

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `pnpm dev` | Inicia servidor de desarrollo con HMR |
| `build` | `pnpm build` | Compila la app para producción en `dist/` |
| `preview` | `pnpm preview` | Previsualiza el build de producción localmente |

---

## 🗺️ Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | `HomePage` | Hero + productos destacados |
| `/hombres` | `HombresPage` | Catálogo de perfumes para hombre |
| `/mujeres` | `MujeresPage` | Catálogo de perfumes para mujer |
| `/product/:id` | `ProductDetailPage` | Detalle de un producto + WhatsApp |
| `/buscar?q=` | `SearchResultsPage` | Resultados de búsqueda |

---

## 🎨 Paleta de Colores y Tipografía

### Colores

| Token | HEX | Uso |
|-------|-----|-----|
| `charcoal-blue` | `#424B54` | Fondo de header/footer, textos principales, botones |
| `lavender-blush` | `#F6E8EA` | Fondos de secciones, texto claro |
| `goldenrod` | `#DAA520` | Precios, acentos, detalles decorativos |
| `goldenrod-light` | `#F5E6A3` | Hovers dorados, degradados |
| `strong-cyan` | `#66CED6` | *Reservado* |
| `muted-olive` | `#93AC5D` | *Reservado* |

### Tipografía

```css
--font-serif: 'Playfair Display', serif;    /* Títulos elegantes */
--font-sans: 'Lato', sans-serif;            /* Cuerpo de texto */
```

### Animaciones

| Animación | Duración | Descripción |
|-----------|----------|-------------|
| `fade-in` | 0.6s | Aparición suave |
| `slide-up` | 0.6s | Deslizamiento hacia arriba |
| `slide-down` | 0.3s | Menú mobile desplegable |

---

## 🏗️ Arquitectura del Componente

El proyecto sigue una arquitectura **basada en componentes** con separación clara de responsabilidades:

```
App (Router)
├── Header                      # Navegación + búsqueda (siempre visible)
├── <Routes>
│   ├── HomePage                # Página principal
│   │   ├── HeroSection         # Logo + título + descripción
│   │   └── FeaturedProducts    # Grid de productos destacados
│   │       └── ProductCard[]   # Tarjetas individuales
│   │
│   ├── HombresPage             # → CatalogPage (gender="hombre")
│   ├── MujeresPage             # → CatalogPage (gender="mujer")
│   │   └── CatalogPage
│   │       ├── Selector de orden
│   │       └── ProductCard[]
│   │
│   ├── ProductDetailPage       # Vista detalle
│   │   └── ProductDetail       # Info + botón WhatsApp
│   │
│   └── SearchResultsPage       # Resultados de búsqueda
│       ├── Selector de orden
│       ├── ProductCard[]
│       └── Mensaje "no encontrado"
│
└── Footer                      # Redes + contacto (siempre visible)
```

### Patrón Container-Presentational

Las páginas (`*Page.jsx`) actúan como **containers**: se encargan de obtener datos (a través de hooks) y manejar estados de carga/error. Los componentes de presentación reciben datos por props y solo se ocupan de renderizar.

### Capa de Datos

```
Componente → Hook (useProducts / useProduct) → Service (productsService) → Supabase
```

---

## 🌐 Despliegue

La app está lista para desplegar en cualquier plataforma que soporte SPA:

- **Vercel** (recomendado)
- **Netlify**
- **Cloudflare Pages**

Recordá configurar las **variables de entorno** en la plataforma de despliegue y agregar un redirect para SPA:

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 🤝 Contribuir

1. Hacé fork del proyecto
2. Creá tu rama de feature (`git checkout -b feature/amazing-feature`)
3. Hacé commit de tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Hacé push a la rama (`git push origin feature/amazing-feature`)
5. Abrí un Pull Request

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

<div align="center">
  <br />
  <p>
    Hecho con ❤️ y mucho café para <strong>Perfumes Z-Aromac</strong>
  </p>
  <p>
    <a href="mailto:info@perfumeszaromac.com">info@perfumeszaromac.com</a>
  </p>
  <br />
</div>

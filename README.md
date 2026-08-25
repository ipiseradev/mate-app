# Mate App

Aplicación web para que pequeños negocios registren y controlen sus facturas de proveedores, con extracción automática de datos por IA a partir de la foto de la factura.

> 🚧 **Proyecto en desarrollo activo.** La autenticación y el modelo de datos ya están implementados; el flujo de carga y extracción de facturas está en construcción.

## Stack técnico

- **[Next.js 16](https://nextjs.org/)** (App Router) + React 19 + TypeScript
- **[Neon](https://neon.tech/)** (Postgres serverless) + **[Drizzle ORM](https://orm.drizzle.team/)**
- **[Auth.js](https://authjs.dev/)** (NextAuth v5) con credenciales (email + contraseña, hash con `bcryptjs`)
- **[Anthropic Claude](https://www.anthropic.com/)** para el pipeline de extracción de datos de facturas
- **Tailwind CSS 4**
- **Recharts** para visualización de datos en el dashboard

## Funcionalidad

- ✅ Registro e inicio de sesión con email y contraseña
- ✅ Sesiones JWT protegidas (middleware redirige `/dashboard` a `/login` sin sesión activa)
- ✅ Modelo de datos para negocios, proveedores, facturas y productos detectados
- 🚧 Carga de facturas (foto) y extracción automática de proveedor, fecha, productos y precios con Claude
- 🚧 Revisión y confirmación manual de los datos detectados
- 🚧 Dashboard con métricas de gasto por proveedor y producto

## Modelo de datos

| Tabla | Descripción |
|---|---|
| `user`, `account`, `session` | Tablas requeridas por el adapter de Drizzle para Auth.js |
| `negocios` | Negocios dados de alta por cada usuario |
| `proveedores` | Proveedores asociados a un negocio |
| `facturas` | Facturas cargadas, con estado (`procesando`, `revisar`, `confirmada`, `error`) |
| `productos_detectados` | Productos extraídos de cada factura, pendientes o confirmados por el usuario |

Definido en [`src/lib/db/schema.ts`](src/lib/db/schema.ts).

## Empezar

### Requisitos

- Node.js 20+
- Una base de datos Postgres en [Neon](https://neon.tech/) (o cualquier Postgres compatible)
- Una API key de [Anthropic](https://console.anthropic.com/) para el pipeline de extracción

### Instalación

```bash
git clone https://github.com/ipiseradev/mate-app.git
cd mate-app
npm install
```

### Variables de entorno

Copiá el archivo de ejemplo y completá tus valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión a Postgres (Neon) |
| `AUTH_SECRET` | Secreto de Auth.js, generar con `npx auth secret` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Credenciales de OAuth de Google (opcional) |
| `ANTHROPIC_API_KEY` | API key de Anthropic para la extracción de facturas |

### Base de datos

```bash
npx drizzle-kit generate   # genera una migración a partir del schema
npx drizzle-kit migrate    # aplica las migraciones pendientes
```

### Desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Corre el build de producción |
| `npm run lint` | Linter (ESLint) |

## Estructura del proyecto

```
src/
├── app/
│   ├── (auth)/          # Páginas de login y registro
│   ├── (dashboard)/     # Área protegida (requiere sesión)
│   └── api/auth/        # Rutas de Auth.js
├── auth.ts              # Configuración de Auth.js
├── proxy.ts             # Middleware: protege /dashboard
├── components/auth/     # Formularios de login, registro y logout
└── lib/
    ├── actions/auth.ts  # Server actions de autenticación
    └── db/              # Cliente de Drizzle y schema
db/migrations/           # Migraciones SQL generadas por Drizzle
```

## Deploy

El proyecto está desplegado en [Vercel](https://vercel.com/).

## Licencia

Distribuido bajo la licencia MIT. Ver [`LICENSE`](LICENSE) para más detalles.

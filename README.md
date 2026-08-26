# Mate App

Aplicación web para que pequeños negocios registren y controlen las facturas de sus proveedores, con carga rápida asistida por el historial de compras.

> 🚧 **Proyecto en desarrollo activo.** El flujo principal (auth, alta de negocios, carga de facturas con autocompletado) ya funciona de punta a punta; el dashboard con métricas está en construcción.

## Stack técnico

- **[Next.js 16](https://nextjs.org/)** (App Router) + React 19 + TypeScript
- **[Neon](https://neon.tech/)** (Postgres serverless) + **[Drizzle ORM](https://orm.drizzle.team/)**
- **[Auth.js](https://authjs.dev/)** (NextAuth v5) con credenciales (email + contraseña, hash con `bcryptjs`)
- **Tailwind CSS 4**
- **Recharts** para visualización de datos en el dashboard (pendiente de uso)

## Funcionalidad

- ✅ Registro e inicio de sesión con email y contraseña
- ✅ Sesiones JWT protegidas (middleware redirige `/dashboard` a `/login` sin sesión activa)
- ✅ Alta de negocios por usuario
- ✅ Carga de facturas con **autocompletado por historial**: al elegir un proveedor ya usado, se sugieren con un click los productos que se le compraron antes (con el último precio), sin depender de ningún servicio externo
- ✅ Alta automática de proveedores nuevos al cargar una factura
- ✅ Vista de detalle de factura con los productos y el total
- 🚧 Edición de facturas ya cargadas
- 🚧 Dashboard con métricas de gasto por proveedor y producto (gráficos con Recharts)

## Modelo de datos

| Tabla | Descripción |
|---|---|
| `user`, `account`, `session` | Tablas requeridas por el adapter de Drizzle para Auth.js |
| `negocios` | Negocios dados de alta por cada usuario |
| `proveedores` | Proveedores asociados a un negocio |
| `facturas` | Facturas cargadas, con estado (`procesando`, `revisar`, `confirmada`, `error`) |
| `productos_detectados` | Productos de cada factura (nombre, cantidad, precio unitario) |

Definido en [`src/lib/db/schema.ts`](src/lib/db/schema.ts).

## Empezar

### Requisitos

- Node.js 20+
- Una base de datos Postgres en [Neon](https://neon.tech/) (o cualquier Postgres compatible)

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
│   ├── (auth)/                          # Páginas de login y registro
│   ├── (dashboard)/dashboard/
│   │   ├── page.tsx                     # Lista de negocios del usuario
│   │   └── negocios/[negocioId]/
│   │       ├── page.tsx                 # Facturas del negocio
│   │       └── facturas/
│   │           ├── nueva/               # Carga de factura con autocompletado
│   │           └── [facturaId]/         # Detalle de la factura
│   └── api/auth/                        # Rutas de Auth.js
├── auth.ts                              # Configuración de Auth.js
├── proxy.ts                             # Middleware: protege /dashboard
├── components/
│   ├── auth/                            # Formularios de login, registro y logout
│   ├── negocios/                        # Formulario de alta de negocio
│   └── facturas/                        # Formulario de carga de factura
└── lib/
    ├── actions/                         # Server actions (auth, negocios, facturas)
    └── db/                              # Cliente de Drizzle, schema y queries
db/migrations/                           # Migraciones SQL generadas por Drizzle
```

## Deploy

El proyecto está desplegado en [Vercel](https://vercel.com/).

## Licencia

Distribuido bajo la licencia MIT. Ver [`LICENSE`](LICENSE) para más detalles.

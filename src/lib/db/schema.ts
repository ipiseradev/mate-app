import {
  pgTable,
  text,
  timestamp,
  uuid,
  numeric,
  integer,
  boolean,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ---------- Tablas requeridas por Auth.js (Drizzle adapter) ----------

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  passwordHash: text("password_hash"),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ---------- Dominio de Mate ----------

export const negocios = pgTable("negocios", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: text("nombre").notNull(),
  propietarioId: uuid("propietario_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const proveedores = pgTable("proveedores", {
  id: uuid("id").primaryKey().defaultRandom(),
  negocioId: uuid("negocio_id")
    .notNull()
    .references(() => negocios.id, { onDelete: "cascade" }),
  nombre: text("nombre").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const estadoFacturaEnum = pgEnum("estado_factura", [
  "procesando",
  "revisar",
  "confirmada",
  "error",
]);

export const facturas = pgTable("facturas", {
  id: uuid("id").primaryKey().defaultRandom(),
  negocioId: uuid("negocio_id")
    .notNull()
    .references(() => negocios.id, { onDelete: "cascade" }),
  proveedorId: uuid("proveedor_id").references(() => proveedores.id, {
    onDelete: "set null",
  }),
  urlImagen: text("url_imagen").notNull(),
  estado: estadoFacturaEnum("estado").notNull().default("procesando"),
  fecha: timestamp("fecha", { mode: "date" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productosDetectados = pgTable("productos_detectados", {
  id: uuid("id").primaryKey().defaultRandom(),
  facturaId: uuid("factura_id")
    .notNull()
    .references(() => facturas.id, { onDelete: "cascade" }),
  nombreDetectado: text("nombre_detectado").notNull(),
  nombreCanonico: text("nombre_canonico").notNull(),
  cantidad: numeric("cantidad", { precision: 10, scale: 2 }).notNull(),
  precioUnitario: numeric("precio_unitario", {
    precision: 12,
    scale: 2,
  }).notNull(),
  confirmadoPorUsuario: boolean("confirmado_por_usuario")
    .notNull()
    .default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

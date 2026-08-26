"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#producto", label: "Producto" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#faq", label: "Preguntas frecuentes" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black";

export function Navbar({
  haySesion,
  ctaHref,
  ctaLabel,
}: {
  haySesion: boolean;
  ctaHref: string;
  ctaLabel: string;
}) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!abierto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [abierto]);

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`rounded-sm text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 ${FOCUS_RING}`}
        >
          Mate
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-600 sm:flex dark:text-zinc-400">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-sm hover:text-zinc-950 dark:hover:text-zinc-50 ${FOCUS_RING}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!haySesion ? (
            <Link
              href="/login"
              className={`hidden rounded-sm text-sm font-medium text-zinc-700 hover:text-zinc-950 sm:inline dark:text-zinc-300 dark:hover:text-zinc-50 ${FOCUS_RING}`}
            >
              Ingresar
            </Link>
          ) : null}
          <Link
            href={ctaHref}
            className={`hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 sm:inline-block ${FOCUS_RING}`}
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            aria-expanded={abierto}
            aria-controls="menu-mobile"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((v) => !v)}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 text-zinc-700 sm:hidden dark:border-zinc-800 dark:text-zinc-300 ${FOCUS_RING}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-5 w-5">
              {abierto ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={`grid overflow-hidden border-t border-zinc-200 transition-[grid-template-rows] duration-200 ease-out sm:hidden dark:border-zinc-800 ${
          abierto ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setAbierto(false)}
                className={`rounded-md px-2 py-2.5 hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 ${FOCUS_RING}`}
              >
                {link.label}
              </a>
            ))}
            {!haySesion ? (
              <a
                href="/login"
                className={`rounded-md px-2 py-2.5 hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 ${FOCUS_RING}`}
              >
                Ingresar
              </a>
            ) : null}
            <Link
              href={ctaHref}
              className={`mt-2 rounded-full bg-emerald-600 px-4 py-2.5 text-center font-medium text-white hover:bg-emerald-500 ${FOCUS_RING}`}
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

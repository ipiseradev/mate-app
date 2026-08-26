import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          Mate
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Cargá facturas de proveedores en segundos
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 780,
          }}
        >
          Mate recuerda qué le comprás a cada proveedor. Gratis, sin tarjeta.
        </div>
      </div>
    ),
    { ...size }
  );
}

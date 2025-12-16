import { ImageResponse } from "next/og";

export const alt = "Pure Minerals - Norwegian Mining Exploration";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1f2e 0%, #0d1117 50%, #1a1f2e 100%)",
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(184, 115, 51, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(96, 125, 108, 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Top Border Accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #b87333, #d4a574, #b87333)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            textAlign: "center",
          }}
        >
          {/* Logo/Brand Mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "100px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #b87333, #d4a574)",
              marginBottom: "30px",
              boxShadow: "0 10px 40px rgba(184, 115, 51, 0.3)",
            }}
          >
            <span
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              PM
            </span>
          </div>

          {/* Company Name */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              margin: "0 0 16px 0",
              letterSpacing: "-2px",
            }}
          >
            Pure Minerals
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "28px",
              color: "#d4a574",
              margin: "0 0 40px 0",
              fontWeight: "500",
            }}
          >
            What Tomorrow Needs, We Find Today
          </p>

          {/* Stats Bar */}
          <div
            style={{
              display: "flex",
              gap: "60px",
              padding: "24px 48px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "#d4a574" }}>18</span>
              <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", textTransform: "uppercase" }}>
                Mining Licenses
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "#d4a574" }}>179 km²</span>
              <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", textTransform: "uppercase" }}>
                Exploration Area
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "#d4a574" }}>Norway</span>
              <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", textTransform: "uppercase" }}>
                Trøndelag Region
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.5)" }}>
            Copper • Zinc • Gold • Silver • REE
          </span>
          <span style={{ fontSize: "16px", color: "#b87333" }}>|</span>
          <span style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.5)" }}>pureminerals.no</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


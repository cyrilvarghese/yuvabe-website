import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Yuvabe Studios — AI-first strategy, design, engineering, and growth marketing for startups.";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,202,45,0.18) 0%, rgba(88,41,199,0.12) 50%, transparent 75%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #5829c7 0%, #7c4ddb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              Y
            </span>
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0a0b0f",
              letterSpacing: "-0.03em",
            }}
          >
            Yuvabe Studios
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: "#0a0b0f",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 820,
            marginBottom: 28,
          }}
        >
          AI-first strategy, design & engineering for startups.
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: 24,
            color: "#64748b",
            fontWeight: 400,
            maxWidth: 680,
            lineHeight: 1.5,
          }}
        >
          One execution partner for product, AI-native apps, and growth marketing.
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #5829c7, #ffca2d, #5829c7)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}

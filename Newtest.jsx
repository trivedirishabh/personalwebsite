import { Box, Typography } from "@mui/material";
import LoginCard from "./LoginCard";

export default function LoginPage() {
  const HEADER_HEIGHT = 65;
  const FOOTER_HEIGHT = 28;

  return (
    <>
      {/* ===== Header ===== */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: HEADER_HEIGHT,
          px: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          zIndex: 10,
        }}
      >
        {/* Left logo */}
        <img
          src="/logo.svg"
          alt="Deutsche Börse Group"
          height={42}
        />

        {/* Right business unit logos */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <img src="/icons/clearstream.png" alt="Clearstream" height={26} />
          <img src="/icons/eex.png" alt="EEX" height={26} />
          <img src="/icons/eurex.png" alt="Eurex" height={22} />
          <img src="/icons/cashmarkets.png" alt="Cash Markets" height={28} />
        </Box>
      </Box>

      {/* ===== Main Area ===== */}
      <Box
        sx={{
          position: "relative",
          mt: `${HEADER_HEIGHT}px`,
          height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
          overflow: "hidden",
        }}
      >
        {/* Background layer */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `
              linear-gradient(
                135deg,
                #e9f1f4 0%,
                #dbe7ec 50%,
                #cfdde3 100%
              ),
              url('/footer_image.jpg')
            `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        {/* Login card layer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginCard />
        </Box>
      </Box>

      {/* ===== Footer ===== */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: FOOTER_HEIGHT,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: 12, color: "#000000" }}
        >
          © Deutsche Börse Group
        </Typography>
      </Box>
    </>
  );
}

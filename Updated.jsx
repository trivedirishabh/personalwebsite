import { Box, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import LoginCard from "./LoginCard";

const HEADER_HEIGHT = 65;
const FOOTER_HEIGHT = 40;

export default function LoginPage() {
  const { accounts, inProgress } = useMsal();

  if (inProgress === "none" && accounts.length > 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ================= HEADER ================= */}
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
          background: "#ffffff",
          zIndex: 3,
        }}
      >
        <img src="/logo.svg" alt="Deutsche Börse Group" height={42} />

        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <img src="/icons/clearstream.png" height={26} />
          <img src="/icons/eex.png" height={26} />
          <img src="/icons/eurex.png" height={24} />
          <img src="/icons/cashmarkets.png" height={28} />
        </Box>
      </Box>

      {/* ================= BACKGROUND ================= */}
      <Box
        sx={{
          position: "absolute",
          top: HEADER_HEIGHT,
          left: 0,
          width: "100%",
          height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
          background:
            "linear-gradient(135deg, #e9f1f4 0%, #dbe7ec 50%, #cfdde3 100%)",
          backgroundImage: "url('/footer_image.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />

      {/* ================= LOGIN CARD ================= */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: HEADER_HEIGHT,
        }}
      >
        <LoginCard />
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: FOOTER_HEIGHT,
          px: 3,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <Box />

        <Typography fontSize={12} color="white" textAlign="center">
          © Deutsche Börse Group
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
            opacity: 0.75,
          }}
        >
          <Typography fontSize={11} color="white">
            Powered by
          </Typography>
          <img src="/icons/powerbi.svg" height={14} />
          <img src="/icons/databricks.svg" height={14} />
          <img src="/icons/atlan.svg" height={14} />
        </Box>
      </Box>
    </Box>
  );
}

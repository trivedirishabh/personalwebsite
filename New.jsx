import { Box, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import LoginCard from "./LoginCard";

export default function LoginPage() {
  const { accounts, inProgress } = useMsal();

  const [bgReady, setBgReady] = useState(false);

  // 🔒 BLOCK render until background image is loaded
  useEffect(() => {
    const img = new Image();
    img.src = "/footer_image.jpg";
    img.onload = () => setBgReady(true);
    img.onerror = () => setBgReady(true); // fail-safe
  }, []);

  // 🔒 Do NOT render anything until background is ready
  if (!bgReady) {
    return null; // or spinner if you want
  }

  if (inProgress === "none" && accounts.length > 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: 65,
          px: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          zIndex: 10,
        }}
      >
        <img src="/logo.svg" alt="Deutsche Börse Group" height={42} />

        {/* RIGHT LOGOS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            pr: 2,
          }}
        >
          <img src="/icons/clearstream.png" alt="Clearstream" height={26} />
          <img src="/icons/eex.png" alt="EEX" height={28} />
          <img src="/icons/eurex.png" alt="Eurex" height={24} />
          <img src="/icons/cashmarkets.png" alt="Cash Markets" height={30} />
        </Box>
      </Box>

      {/* BACKGROUND */}
      <Box
        sx={{
          position: "fixed",
          top: 65,
          left: 0,
          width: "100%",
          height: "calc(100vh - 65px)",
          background:
            "linear-gradient(135deg, #e9f1f4 0%, #dbe7ec 50%, #cfdde3 100%)",
          backgroundImage: "url('/footer_image.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />

      {/* LOGIN CARD */}
      <Box
        sx={{
          position: "fixed",
          top: 65,
          left: 0,
          width: "100%",
          height: "calc(100vh - 65px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <LoginCard />
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          position: "fixed",
          bottom: 12,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <Typography fontSize={12} color="black">
          © Deutsche Börse Group
        </Typography>
      </Box>
    </>
  );
}

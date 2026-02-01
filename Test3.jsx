import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import LoginCard from "./LoginCard";

const HEADER_HEIGHT = 64;

export default function LoginPage() {
  const { accounts, inProgress } = useMsal();

  // If user is already authenticated → go to main app
  if (inProgress === "none" && accounts.length > 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #eaf3f8 0%, #ddeaf2 100%)",
      }}
    >
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
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0))",
          zIndex: 10,
        }}
      >
        <img
          src="/dbg.svg"   // adjust if needed
          alt="Deutsche Börse Group"
          height={42}
          style={{ display: "block" }}
        />
      </Box>

      {/* ===== Page Content ===== */}
      <Box
        sx={{
          minHeight: "100vh",
          pt: `${HEADER_HEIGHT}px`, // pushes content below header
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Background animation goes here (if any) */}
        {/* <MeshBackground /> */}

        {/* Login card */}
        <LoginCard />
      </Box>
    </Box>
  );
}

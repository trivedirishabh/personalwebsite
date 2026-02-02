import { Box, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import LoginCard from "./LoginCard";

export default function LoginPage() {
    const { accounts, inProgress } = useMsal();
    if (inProgress === "none" && accounts.length > 0) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
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
                    background: "#ffffff",
                    zIndex: 10,
                }}
            >
                <img
                    src="/logo.svg"
                    alt="Deutsche Börse Group"
                    height={42}
                />
            </Box>
            <Box
                sx={{
                    height: "calc(100vh - 50px)",
                    mt: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    background:
                        "linear-gradient(135deg, #e9f1f4 0%, #dbe7ec 50%, #cfdde3 100%)",
                    backgroundImage: "url('/footer_image.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    pointerEvents: "none",
                    opacity: 0.7,
                }}
            >
                </Box>
                <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    alignItems: "center",
                }}
                />
                <LoginCard />
            <Box
            sx = {{
                position: "fixed",
                bottom: 12,
                left: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",

            }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: "Black",
                        fontSize: 12,
                    }}
                >© Deutsche Börse Group</Typography>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: "70%",
                    width: "100%",
                    height: 65,
                    px: 0,
                    display: "flex",
                    alignItems: "center",
                    background: "#ffffff",
                    zIndex: 10,
                    gap: 0.5,
                }}
            >
                <img src="/icons/clearstream.png" alt="ClearStream" height={27} />
                <img src="/icons/eex.png" alt="Eex" height={28} />
                <img src="/icons/eurex.png" alt="Eurex" height={24} /> 
                <img src="/icons/cashmarkets.png" alt="Cashmarkets" height={30} />
                
                
            </Box>
            </>
    );
}

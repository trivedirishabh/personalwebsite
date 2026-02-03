// components/MeshBackground.jsx
import { Box } from "@mui/material";

const nodes = [
  { id: "azure", x: 20, y: 40, logo: "/icons/azure.svg" },
  { id: "gcp", x: 80, y: 30, logo: "/icons/gcp.svg" },
  { id: "databricks", x: 75, y: 70, logo: "/icons/databricks.svg" },
  { id: "atlan", x: 30, y: 75, logo: "/icons/atlan.svg" },
  { id: "db", x: 50, y: 20, logo: "/icons/db.svg" },
];

const links = [
  ["azure", "gcp"],
  ["gcp", "databricks"],
  ["databricks", "atlan"],
  ["atlan", "azure"],
  ["azure", "db"],
  ["db", "gcp"],
];

export default function MeshBackground() {
  const getNode = (id) => nodes.find((n) => n.id === id);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        {/* Dotted connections */}
        {links.map(([a, b], i) => {
          const A = getNode(a);
          const B = getNode(b);
          return (
            <line
              key={i}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke="#5fa8ff"
              strokeWidth="0.3"
              strokeDasharray="1 1.5"
              opacity="0.5"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="3.8"
              fill="white"
              opacity="0.95"
            />
            <image
              href={node.logo}
              x={node.x - 2}
              y={node.y - 2}
              width="4"
              height="4"
            />
          </g>
        ))}
      </svg>
    </Box>
  );
}

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

/**
 * Node configuration
 * x,y are percentages so it scales with screen size
 */
const NODES = [
  { id: "azure", x: 20, y: 35, size: 72, icon: "/icons/azure.png" },
  { id: "gcp", x: 80, y: 30, size: 72, icon: "/icons/gcp.png" },
  { id: "onprem", x: 78, y: 60, size: 68, icon: "/icons/server.png" },
  { id: "db1", x: 35, y: 65, size: 42, icon: "/icons/database.png" },
  { id: "db2", x: 55, y: 25, size: 42, icon: "/icons/database.png" },
  { id: "file", x: 60, y: 70, size: 42, icon: "/icons/file.png" },
];

/**
 * Connections between nodes
 */
const EDGES = [
  ["azure", "gcp"],
  ["azure", "db1"],
  ["gcp", "onprem"],
  ["onprem", "file"],
  ["db1", "file"],
  ["db2", "azure"],
  ["db2", "gcp"],
];

export default function MeshBackground() {
  const svgRef = useRef(null);

  // gentle floating animation
  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.005;
      const nodes = svgRef.current?.querySelectorAll(".mesh-node");
      nodes?.forEach((n, i) => {
        const dx = Math.sin(t + i) * 6;
        const dy = Math.cos(t + i) * 6;
        n.setAttribute("transform", `translate(${dx}, ${dy})`);
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const getNode = (id) => NODES.find((n) => n.id === id);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* dotted connections */}
        {EDGES.map(([a, b], i) => {
          const n1 = getNode(a);
          const n2 = getNode(b);
          return (
            <line
              key={i}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="#9db7e0"
              strokeWidth="0.3"
              strokeDasharray="1.5 2"
              opacity="0.6"
            />
          );
        })}

        {/* nodes */}
        {NODES.map((n) => (
          <image
            key={n.id}
            href={n.icon}
            x={n.x - n.size / 200}
            y={n.y - n.size / 200}
            width={n.size / 100}
            height={n.size / 100}
            className="mesh-node"
          />
        ))}
      </svg>
    </Box>
  );
}


import { useState } from "react";

type Props = {
  children: React.ReactNode;
  message?: string;
};

export default function LoginTooltip({ children, message = "Sign in to like" }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseLeave={() => setVisible(false)}
    >
      <div onClick={() => setVisible(true)}>{children}</div>

      {visible && (
        <div
          style={{
            position: "absolute",
            top: "-35px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#333",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

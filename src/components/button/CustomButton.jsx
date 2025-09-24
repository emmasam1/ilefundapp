import { Button } from "antd";

/**
 * Reusable Custom Button
 * @param {string} label - Button text
 * @param {string} type - AntD button type: "primary" | "default" | "dashed" | "link" | "text"
 * @param {boolean} loading - Show loading spinner
 * @param {function} onClick - Function to run on click
 * @param {string} className - Extra Tailwind/custom classes
 * @param {ReactNode} icon - Optional icon (left side)
 * @param {string} color - Custom Tailwind color (e.g., "bg-red-500 text-white")
 * @param {string} padding - Tailwind padding classes (default: "px-6 py-2")
 */
export default function CustomButton({
  label,
  type = "primary",
  loading = false,
  onClick,
  className = "",
  icon,
  color = "",
  padding = "px-10 py-4",
  iconPosition = "right",
}) {
  return (
    <Button
      type={type}
      loading={loading}
      onClick={onClick}
      className={`rounded-lg flex items-center !px-8 !py-4 !gap-4 ${padding} ${color} ${className}`}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {label}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </Button>
  );
}

import toast from "react-hot-toast";
import { BsFillInfoCircleFill } from "react-icons/bs";

export function showToast({
  type = "error",
  message = null,
}: {
  type?: "error" | "success" | "info";
  message?: string | null;
}) {
  const _style = {
    border: "1px solid rgb(255, 50, 50)",
    borderRadius: "10px",
  };

  const content = <strong>{message}</strong>;

  switch (type) {
    case "error":
      toast.error(content, { style: _style });
      break;
    case "success":
      _style["border"] = "1px solid rgb(0, 200, 0)";
      toast.success(content, { style: _style });
      break;
    case "info":
      _style["border"] = "1px solid rgb(0, 200, 255)";
      toast(content, {
        icon: <BsFillInfoCircleFill size={20} color="rgb(0, 200, 255)" />,
        style: _style,
      });
      break;
  }
}

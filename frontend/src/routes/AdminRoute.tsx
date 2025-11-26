import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const user = useUserStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/forbidden" replace />;

  return children;
}

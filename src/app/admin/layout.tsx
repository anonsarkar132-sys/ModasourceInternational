import ProtectedRoute from "@/components/admin/ProtectedRoute";

// Eta Next.js er default layout jeta server-side render hobe
// Kintu er vitorer ProtectedRoute client-side state manage korbe
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
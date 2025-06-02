import ProtectedUserRoute from "@/components/shared/ProtectedUserRoute";

export default function Home() {
  return (
    <ProtectedUserRoute>
      <div>
        This is home page
      </div>
    </ProtectedUserRoute>
  );
}

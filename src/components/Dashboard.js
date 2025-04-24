import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar fijo */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="space-y-2">
          <a href="/home" className="block hover:bg-gray-700 p-2 rounded">Inicio</a>
          <a href="/alumnos" className="block hover:bg-gray-700 p-2 rounded">Alumnos</a>
          <a href="/reportes" className="block hover:bg-gray-700 p-2 rounded">Reportes</a>
        </nav>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet /> {/* Aquí se cargan las páginas dinámicas */}
      </main>
    </div>
  );
}
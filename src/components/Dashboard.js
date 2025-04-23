import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <img src="/img/logoECOA.png" alt="Logo" className="logo" />
        <ul>
          <li><a href="/listapersonajes">Lista de PHOLA</a></li>
          <li><a href="/crearpersonaje">Crear personaje</a></li>
          <li><a href="/actualizarpersonaje">Actualizar personaje</a></li>
          <li><a href="/eliminarpersonaje">Eliminar personaje</a></li>
        </ul>
      </aside>
      <main className="main-content">
        <Outlet /> {/* Aquí se cargan las páginas */}
      </main>
    </div>
  );
};

export default DashboardLayout;
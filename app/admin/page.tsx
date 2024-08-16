import AdminLayout from './layout';

const DashboardPage: React.FC = () => {
      return (
            <AdminLayout>
                  <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                  <p>Bienvenido al panel de administración. Aquí puedes gestionar las secciones del cine.</p>
                  {/* Agrega más contenido o componentes según sea necesario */}
            </AdminLayout>
      );
};

export default DashboardPage;

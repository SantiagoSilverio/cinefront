import Link from 'next/link';
import { Cinema } from '../../types/cinemas';
import '../../app/admin/general.css';

type CinemaListProps = {
    cinemas: Cinema[];
    onEdit: (cinema: Cinema) => React.ReactNode;
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
};


const CinemaList: React.FC<CinemaListProps> = ({ cinemas, onDelete, onSort, sortColumn, sortOrder }) => {
    return (
        <table className="table-margin table-striped table-centered">
            <thead>
                <tr>
                    <th>
                        ID
                        <button onClick={() => onSort('id')}>
                            {sortColumn === 'id' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Nombre
                        <button onClick={() => onSort('name')}>
                            {sortColumn === 'name' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Direccion
                        <button onClick={() => onSort('address')}>
                            {sortColumn === 'address' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Ciudad
                        <button onClick={() => onSort('city')}>
                            {sortColumn === 'city' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Telefono
                        <button onClick={() => onSort('phone')}>
                            {sortColumn === 'phone' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Capacidad
                        <button onClick={() => onSort('capacity')}>
                            {sortColumn === 'capacity' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>
                        Estado
                        <button onClick={() => onSort('state')}>
                            {sortColumn === 'state' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {cinemas.map((cinema) => (
                    <tr key={cinema.id}>
                        <td>{cinema.id}</td>
                        <td>{cinema.name}</td>
                        <td>{cinema.address}</td>
                        <td>{cinema.city}</td>
                        <td>{cinema.phone}</td>
                        <td>{cinema.capacity}</td>
                        <td>{cinema.state ? 'Activo' : 'Inactivo'}</td>
                        <td>
                            <Link href={`/admin/editcinema/${cinema.id}`}>
                                <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                                    Editar
                                </button>
                            </Link>
                            <button onClick={() => onDelete(cinema.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CinemaList;
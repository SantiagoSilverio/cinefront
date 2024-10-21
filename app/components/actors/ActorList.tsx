import Link from 'next/link';
import { Actor } from '../../types/actors';
import '../../admin/general.css';

type ActorListProps = {
    actors: Actor[];
    onEdit: (actor: Actor) => React.ReactNode;
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
};


const ActorList: React.FC<ActorListProps> = ({ actors, onDelete, onSort, sortColumn, sortOrder }) => {
    return (
        <table id="actor-table" className="table-margin table-striped table-centered">
            <thead id="actor-table-head">
                <tr>
                    <th id="id-header">
                        ID
                        <button id="id-sort-button" onClick={() => onSort('id')}>
                            {sortColumn === 'id' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="name-header">
                        Nombre
                        <button id="name-sort-button" onClick={() => onSort('name')}>
                            {sortColumn === 'name' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="state-header">
                        Estado
                        <button id="state-sort-button" onClick={() => onSort('state')}>
                            {sortColumn === 'state' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="actions-header">Acciones</th>
                </tr>
            </thead>
            <tbody id="actor-table-body">
                {actors.map((actor) => (
                    <tr key={actor.id}>
                        <td id="id-actor-row">{actor.id}</td>
                        <td id="name-actor-row">{actor.name}</td>
                        <td id="state-actor-row">{actor.state ? 'Activo' : 'Inactivo'}</td>
                        <td id="action-actor-row">
                            <Link href={`/admin/editaractor/${actor.id}`}>
                                <button id="edit-button" className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                                    Editar
                                </button>
                            </Link>
                            <button id="delete-button" onClick={() => onDelete(actor.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ActorList;
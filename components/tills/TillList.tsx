import Link from 'next/link';
import { Till } from '../../types/tills';

type TillListProps = {
    tills: Till[];
    onEdit: (actor: Till) => React.ReactNode;
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
};

const TillList: React.FC<TillListProps> = ({ tills, onDelete, onSort, sortColumn, sortOrder }) => {
    return (
        <table id="general-form">
            <thead>
                <tr>
                    <th id="general-input-field">
                        ID
                        <button onClick={() => onSort('id')} id="general-btn">
                            {sortColumn === 'id' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="general-input-field">
                        Nombre
                        <button onClick={() => onSort('name')} id="general-btn">
                            {sortColumn === 'name' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="general-input-field">
                        Detalles
                        <button onClick={() => onSort('detail')} id="general-btn">
                            {sortColumn === 'detail' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="general-input-field">
                        Estado
                        <button onClick={() => onSort('state')} id="general-btn">
                            {sortColumn === 'state' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th id="general-input-field">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tills.map((till) => (
                    <tr key={till.id}>
                        <td id="general-input-field">{till.id}</td>
                        <td id="general-input-field">{till.name}</td>
                        <td id="general-input-field">{till.detail}</td>
                        <td id="general-input-field">{till.state ? 'Activo' : 'Inactivo'}</td>
                        <td id="general-button-container">
                            <Link href={`/admin/edittill/${till.id}`}>
                                <button 
                                    type="button" 
                                    id="general-btn"
                                >
                                    Editar
                                </button>
                            </Link>
                            <button 
                                onClick={() => onDelete(till.id)} 
                                type="button"
                                id="general-submit-button"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TillList;
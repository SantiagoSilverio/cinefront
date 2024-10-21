import React from 'react';
import { Band } from '../../types/bands';
import Link from 'next/link';
import '../../admin/bands/bands.css'; // Asegúrate de incluir el mismo CSS que en ActorList

interface BandListProps {
    bands: Band[];
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
}

const BandList: React.FC<BandListProps> = ({ bands, onDelete, onSort, sortColumn, sortOrder }) => {
    const renderSortIcon = (column: string) => {
        if (sortColumn !== column) return null;
        return sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>;
    };

    return (
        <table className="table-margin table-striped table-centered">
            <thead>
                <tr>
                    <th onClick={() => onSort('title')}>
                        Título {renderSortIcon('title')}
                    </th>
                    <th onClick={() => onSort('composer')}>
                        Compositor {renderSortIcon('composer')}
                    </th>
                    <th onClick={() => onSort('state')}>
                        Estado {renderSortIcon('state')}
                    </th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {bands.map((band) => (
                    <tr key={band.id}>
                        <td>{band.title}</td>
                        <td>{band.composer}</td>
                        <td>{band.state ? 'Activo' : 'Inactivo'}</td> {/* Mostrar el estado */}
                        <td>
                            <Link href={`/admin/editarband/${band.id}`}>
                                <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                                    Editar
                                </button>
                            </Link>
                            <button onClick={() => onDelete(band.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BandList;

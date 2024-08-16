import React from 'react';
import Link from 'next/link';
import { Actor } from '../../types/actors';
import '../../admin/actors/actors.css';

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
                    <th>Acciones</th>
                    <th className="new-actor-td">

                    </th>
                </tr>
            </thead>
            <tbody>
                {actors.map((actor) => (
                    <tr key={actor.id}>
                        <td>{actor.id}</td>
                        <td>{actor.name}</td>
                        <td>
                            <Link href={`/editaractor/${actor.id}`}>
                                <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                                    Editar
                                </button>
                            </Link>
                            <button onClick={() => onDelete(actor.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                                Eliminar
                            </button>
                        </td>
                        <td className="new-actor-td"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ActorList;

import React from 'react';
import Link from 'next/link';
import { Price } from '../../types/price';
import '../../admin/price/price.css';

type PriceListProps = {
    prices: Price[];
    onEdit: (price: Price) => JSX.Element;
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
};


const PriceList: React.FC<PriceListProps> = ({ prices, onEdit, onDelete, onSort, sortColumn, sortOrder }) => {
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
                        Cantidad
                        <button onClick={() => onSort('amount')}>
                            {sortColumn === 'amount' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
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
                {prices.map((price) => (
                    <tr key={price.id}>
                        <td>{price.id}</td>
                        <td>{price.name}</td>
                        <td>{price.amount}</td>
                        <td>{price.state ? 'Activo' : 'Inactivo'}</td>
                        <td>
                            <Link href={`/admin/editprice/${price.id}`}>
                                <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                                    Editar
                                </button>
                            </Link>
                            <button onClick={() => onDelete(price.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PriceList;
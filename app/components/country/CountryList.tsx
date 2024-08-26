import React from 'react';
import Link from 'next/link';
import { Country } from '../../types/country';
import '../../admin/country/country.css';

interface CountryListProps {
    countries: Country[];
    onDelete: (id: number) => void;
    onSort: (column: string) => void;
    sortColumn: string | null;
    sortOrder: 'asc' | 'desc';
}

const CountryList: React.FC<CountryListProps> = ({ countries, onDelete, onSort, sortColumn, sortOrder }) => {
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
                        Estado
                        <button onClick={() => onSort('state')}>
                            {sortColumn === 'state' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                        </button>
                    </th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {countries.map((country) => (
                    <tr key={country.id}>
                        <td>{country.id}</td>
                        <td>{country.name}</td>
                        <td>{country.state ? 'Activo' : 'Inactivo'}</td>
                        <td>
                            <Link href={`/admin/editcountry/${country.id}`}>
                                <button className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500">
                                    Editar
                                </button>
                            </Link>
                            <button onClick={() => onDelete(country.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CountryList;

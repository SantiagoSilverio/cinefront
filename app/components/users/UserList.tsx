import React from 'react';
import { User } from '../../types/users';

interface UserListProps {
      users: User[];
      onEdit: (user: User) => JSX.Element;
      onDelete: (id: number) => void;
      onSort: (column: string) => void;
      sortColumn: string | null;
      sortOrder: 'asc' | 'desc';
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete, onSort, sortColumn, sortOrder }) => {
      const sortIcon = (column: string) => {
            if (sortColumn === column) {
                  return sortOrder === 'asc' ? '▲' : '▼';
            }
            return '';
      };

      return (
            <table className="w-full table-auto">
                  <thead>
                        <tr>
                              <th onClick={() => onSort('first_name')}>Nombre {sortIcon('first_name')}</th>
                              <th onClick={() => onSort('last_name')}>Apellido {sortIcon('last_name')}</th>
                              <th onClick={() => onSort('phone')}>Teléfono {sortIcon('phone')}</th>
                              <th onClick={() => onSort('email')}>Email {sortIcon('email')}</th>
                              <th onClick={() => onSort('address')}>Dirección {sortIcon('address')}</th>
                              <th onClick={() => onSort('city')}>Ciudad {sortIcon('city')}</th>
                              <th onClick={() => onSort('role')}>Rol {sortIcon('role')}</th>
                              <th onClick={() => onSort('state')}>Estado {sortIcon('state')}</th>
                              <th>Acciones</th>
                        </tr>
                  </thead>
                  <tbody>
                        {users.map(user => (
                              <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.city}</td>
                                    <td>{user.role}</td>
                                    <td>{user.state ? 'Activo' : 'Inactivo'}</td>
                                    <td>
                                          {onEdit(user)}
                                          <button onClick={() => onDelete(user.id)} className="ml-2 text-red-500">Eliminar</button>
                                    </td>
                              </tr>
                        ))}
                  </tbody>
            </table>
      );
};

export default UserList;

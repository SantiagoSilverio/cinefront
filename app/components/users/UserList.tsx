import { User } from '../../types/users';
import '../../admin/users/users.css';

type UserListProps = {
      users: User[];
      onEdit: (user: User) => React.ReactNode;
      onDelete: (id: number) => void;
      onSort: (column: string) => void;
      sortColumn: string | null;
      sortOrder: 'asc' | 'desc';
};

const UserList: React.FC<UserListProps> = ({ users, onDelete, onSort, sortColumn, sortOrder }) => {
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
                                    <button onClick={() => onSort('first_name')}>
                                          {sortColumn === 'first_name' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th>
                                    Apellido
                                    <button onClick={() => onSort('last_name')}>
                                          {sortColumn === 'last_name' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th>
                                    Teléfono
                                    <button onClick={() => onSort('phone')}>
                                          {sortColumn === 'phone' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th>
                                    Email
                                    <button onClick={() => onSort('email')}>
                                          {sortColumn === 'email' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th>
                                    Dirección
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
                                    Rol
                                    <button onClick={() => onSort('role')}>
                                          {sortColumn === 'role' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
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
                        {users.map((user) => (
                              <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.city}</td>
                                    <td>{user.role}</td>
                                    <td>{user.state ? 'Inactivo' : 'Activo'}</td>
                                    <td>
                                          <button
                                                onClick={() => onEdit(user)}
                                                className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                          >
                                                Editar
                                          </button>
                                          <button onClick={() => onDelete(user.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
                                                Eliminar
                                          </button>
                                    </td>
                              </tr>
                        ))}
                  </tbody>
            </table>
      );
};

export default UserList;

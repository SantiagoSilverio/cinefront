import { User } from '../../types/users';
import '../../admin/users/users.css';

type UserListProps = {
      users: User[];
      onEdit: (user: User) => void;
      onDelete: (id: number) => void;
      onSort: (column: string) => void;
      sortColumn: string | null;
      sortOrder: 'asc' | 'desc';
};

const UserList: React.FC<UserListProps> = ({ users, onDelete, onSort, sortColumn, sortOrder }) => {
      console.log(users);
      return (
            <table id="user-list-table" className="table-margin table-striped table-centered">
                  <thead>
                        <tr>
                              <th id="th-id">
                                    ID
                                    <button onClick={() => onSort('id')}>
                                          {sortColumn === 'id' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th id="th-username">
                                    Usuario
                                    <button onClick={() => onSort('username')}>
                                          {sortColumn === 'username' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>                              
                              <th id="th-phone">
                                    Teléfono
                                    <button onClick={() => onSort('phone')}>
                                          {sortColumn === 'phone' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th id="th-email">
                                    Email
                                    <button onClick={() => onSort('email')}>
                                          {sortColumn === 'email' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th id="th-address">
                                    Dirección
                                    <button onClick={() => onSort('address')}>
                                          {sortColumn === 'address' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th id="th-city">
                                    Ciudad
                                    <button onClick={() => onSort('city')}>
                                          {sortColumn === 'city' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th id="th-state">
                                    Estado
                                    <button onClick={() => onSort('state')}>
                                          {sortColumn === 'state' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕'}
                                    </button>
                              </th>
                              <th id="th-actions">Acciones</th>
                        </tr>
                  </thead>
                  <tbody>
                        {users.map((user) => (
                              <tr key={user.id}>
                                    <td id="td-id">  {user.id}</td>
                                    <td id="td-username">{user.username}</td>
                                    <td id="td-phone">{user.phone}</td>
                                    <td id="td-email">{user.email}</td>
                                    <td id="td-address">{user.address}</td>
                                    <td id="td-city">{user.city.name}</td>
                                    <td id="td-state">{user.state ? 'Inactivo' : 'Activo'}</td>
                                    <td>
                                          <button
                                                id="edit-button"
                                                onClick={() => onEdit(user)}
                                                className="bg-yellow-500 text-white rounded-md px-3 py-2 hover:bg-yellow-700 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                          >
                                                Editar
                                          </button>
                                          <button id="delete-button" onClick={() => onDelete(user.id)} className="bg-red-500 text-white rounded-md px-3 py-2 hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500">
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
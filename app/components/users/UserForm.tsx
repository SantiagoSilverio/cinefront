import React, { useState, useEffect } from 'react';
import { UserAdd, User } from '../../types/users';  // Importa los tipos
import Link from 'next/link';

interface Option {
      id: number;
      name: string;
}

interface UserFormProps {
      user?: User;
      onSave: (user: UserAdd) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave }) => {
      const [firstName, setFirstName] = useState(user ? user.first_name : '');
      const [lastName, setLastName] = useState(user ? user.last_name : '');
      const [phone, setPhone] = useState(user ? user.phone : '');
      const [email, setEmail] = useState(user ? user.email : '');
      const [password, setPassword] = useState(user ? user.password : '');
      const [address, setAddress] = useState(user ? user.address : '');
      const [cityName, setCityName] = useState(user ? user.city : '');
      const [roleName, setRoleName] = useState(user ? user.role : '');

      const [cities, setCities] = useState<Option[]>([]);
      const [roles, setRoles] = useState<Option[]>([]);

      useEffect(() => {
            const fetchOptions = async () => {
                  try {
                        const [citiesResponse, rolesResponse] = await Promise.all([
                              fetch('/api/cities'),
                              fetch('/api/roles')
                        ]);

                        const citiesData = await citiesResponse.json();
                        const rolesData = await rolesResponse.json();

                        setCities(citiesData);
                        setRoles(rolesData);
                  } catch (error) {
                        console.error('Error fetching cities and roles:', error);
                  }
            };

            fetchOptions();
      }, []);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                  await onSave({ first_name: firstName, last_name: lastName, phone, email, password, address, city: cityName, role: roleName });
                  alert('Usuario creado exitosamente');
                  window.location.href = '/admin/users';
            } catch (error) {
                  console.error('Error al guardar el usuario:', error);
            }
      };

      return (
            <form onSubmit={handleSubmit} className="user-form">
                  <div className="input-field">
                        <input
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Nombre"
                              required
                        />
                  </div>
                  <div className="input-field">
                        <input
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Apellido"
                              required
                        />
                  </div>
                  <div className="input-field">
                        <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Teléfono"
                              required
                        />
                  </div>
                  <div className="input-field">
                        <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Correo electrónico"
                              required
                        />
                  </div>
                  <div className="input-field">
                        <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Contraseña"
                              required
                        />
                  </div>
                  <div className="input-field full-width">
                        <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Dirección"
                              required
                        />
                  </div>
                  <div className="input-field">
                        <select
                              value={cityName}
                              onChange={(e) => setCityName(e.target.value)}
                              required
                        >
                              <option value="">Selecciona una ciudad</option>
                              {cities.map((city) => (
                                    <option key={city.id} value={city.name}>{city.name}</option>
                              ))}
                        </select>
                  </div>
                  <div className="input-field">
                        <select
                              value={roleName}
                              onChange={(e) => setRoleName(e.target.value)}
                              required
                        >
                              <option value="">Selecciona un rol</option>
                              {roles.map((role) => (
                                    <option key={role.id} value={role.name}>{role.name}</option>
                              ))}
                        </select>
                  </div>

                  <div className="button-container1">
                        <Link href="/admin/users">
                              <button type="button" className="btn">Cancelar</button>
                        </Link>
                        <button type="submit" className="submit-button">Guardar</button>
                  </div>
            </form>
      );
};

export default UserForm;

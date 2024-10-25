import React, { useState, useEffect } from 'react';
import { UserAdd, User } from '../../types/users';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { City } from '../../types/cities';

interface UserFormProps {
      user?: User;
      onSave: (user: UserAdd) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave }) => {
      const [username, setUsername] = useState(user ? user.username : '');
      const [firstName, setFirstName] = useState(user ? user.first_name : '');
      const [lastName, setLastName] = useState(user ? user.last_name : '');
      const [phone, setPhone] = useState(user ? user.phone : '');
      const [email, setEmail] = useState(user ? user.email : '');
      const [password, setPassword] = useState(user ? user.password : '');
      const [address, setAddress] = useState(user ? user.address : '');
      const [cityId, setCityId] = useState<string>(user?.city_id ?? ''); // Initializes to an empty string if user is undefined


      const [cities, setCities] = useState<City[]>([]);

      useEffect(() => {
            const fetchOptions = async () => {
                  try {
                        const token = Cookies.get('access_token');
                        const myHeaders = new Headers();
                        myHeaders.append("Authorization", `Bearer ${token}`);
                        myHeaders.append("Content-Type", "application/json");

                        const response = await fetch('https://back-k1a3.onrender.com/city/', {
                              method: 'GET',
                              headers: myHeaders,
                        });

                        if (!response.ok) {
                              throw new Error(`Error fetching cities: ${response.status}`);
                        }

                        const citiesData = await response.json();
                        setCities(citiesData.results);
                        console.log(citiesData.results); // Verifica que los datos se estén almacenando correctamente
                  } catch (error) {
                        console.error('Error fetching cities:', error);
                  }
            };

            fetchOptions();
      }, []);

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                await onSave({
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    phone,
                    email,
                    password,
                    address,
                    city_id: cityId // This should be fine now after the type update
                });
                alert('Usuario creado exitosamente');
                window.location.href = '/admin/users';
            } catch (error) {
                console.error('Error al guardar el usuario:', error);
            }
        };
        

      return (
            <form id="user-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full">
                  <div id="username-field" className="input-field">
                        <input
                              id="username-input"
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Nombre de usuario"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                  </div>
                  <div id="first-name-field" className="input-field">
                        <input
                              id="nombre-input"
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Nombre"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                  </div>
                  <div id="last-name-field" className="input-field">
                        <input
                              id="apellido-input"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Apellido"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                  </div>
                  <div id="phone-field" className="input-field">
                        <input
                              id="phone-input"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Teléfono"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                  </div>
                  <div id="email-field" className="input-field">
                        <input
                              id="email-input"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Correo electrónico"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                  </div>
                  <div id="password-field" className="input-field">
                        <input
                              id="password-input"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Contraseña"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                  </div>
                  <div id="address-field" className="input-field col-span-2">
                        <input
                              id="address-input"
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Dirección"
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        />
                  </div>
                  <div id="city-field" className="input-field">
                        <select
                              id="city-input"
                              value={cityId}
                              onChange={(e) => setCityId(e.target.value)}
                              required
                              className="w-full p-2 border border-gray-300 rounded-md"
                        >
                              <option value="">Selecciona una ciudad</option>
                              {cities?.map((city) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                              ))}
                        </select>
                  </div>

                  <div className="col-span-2 flex justify-between mt-4">
                        <Link href="/admin/users">
                              <button id="cancel-button" type="button" className="bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-700">
                                    Cancelar
                              </button>
                        </Link>
                        <button id="save-button" type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700">
                              Guardar
                        </button>
                  </div>
            </form>
      );
};

export default UserForm;
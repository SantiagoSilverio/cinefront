"use client";
import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importa el ícono de advertencia
import '../login/login.css';
import '../globals.css';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage(''); // Limpiar el mensaje de error al cambiar el formulario
    };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        // Simulación de autenticación fallida
        if (email !== 'admin@example.com' || password !== 'password123') {
            setErrorMessage('Usuario o Contraseña inválidos');
            setEmail('');
            setPassword('');
        } else {
            // Lógica de autenticación exitosa (redireccionar o mostrar el dashboard)
            setErrorMessage('');
        }
    };

    return (
        <div className={`relative flex h-screen overflow-hidden`}>
            <div className={`absolute inset-0 flex transform ${isLogin ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-1000`}>
                <div className="w-1/2 flex flex-col justify-center items-center bg-pink-500 p-8">
                    <div className="absolute top-0 left-0 m-4">
                        <h1 className="text-2xl font-bold text-white"></h1>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-8 title-move-up">Iniciar sesión</h2>
                    <form className="space-y-6 w-full max-w-md inputs-move-up" onSubmit={handleLogin}>
                        <div className="flex flex-col items-center">
                            {errorMessage && (
                                <div className="w-full text-red-600 font-bold flex items-center mb-4">
                                    <FaExclamationTriangle className="mr-2 text-xl" />{errorMessage}
                                </div>
                            )}
                            <div className="w-full">
                                <label htmlFor="email" className="block text-lg font-medium text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-5">
                                <label htmlFor="password" className="block text-lg font-medium text-white">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-12 flex justify-center">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-green-500 text-white rounded-md"
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-8 mb-4">
                        <button className="py-2 px-4 bg-green-500 text-white rounded-md" onClick={toggleForm}>
                            Registrarse
                        </button>
                    </div>
                </div>
                <div className="w-1/2 bg-cover"></div>
            </div>
            <div className={`absolute inset-0 flex transform ${isLogin ? 'translate-x-full' : 'translate-x-0'} transition-transform duration-1000`}>
                <div className="w-1/2 bg-cover"></div>
                <div className="w-1/2 flex flex-col justify-center items-center bg-pink-600 p-8">
                    <div className="absolute top-0 left-0 m-4">
                        <h1 className="text-2xl font-bold text-red-700">CINEIMPAR</h1>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-8 mt-20 title-move-up">Registrarse</h2>
                    <form className="space-y-6 w-full max-w-md inputs-move-up">
                        <div className="flex flex-col items-center">
                            <div className="w-full">
                                <label htmlFor="name" className="block text-lg font-medium text-white">Nombre y Apellido</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="phone" className="block text-lg font-medium text-white">Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="address" className="block text-lg font-medium text-white">Dirección</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="email" className="block text-lg font-medium text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="password" className="block text-lg font-medium text-white">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-6 flex justify-center">
                                <button
                                    type="submit"
                                    className="py-2 px-4 mt-4 bg-pink-400 text-white rounded-md"
                                >
                                    Registrarse
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-8 mb-4">
                        <button className="py-2 px-4 bg-pink-400 text-white rounded-md" onClick={toggleForm}>
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;

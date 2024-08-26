"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../login/login.css';
import '../globals.css';

const LoginRegister: React.FC = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage('');
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://back-k1a3.onrender.com/user/');
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                console.error("Respuesta inesperada:", text);
                throw new Error("El servidor no devolvió JSON.");
            }
    
            const data = await response.json();
            const users = data.results;
    
            if (!Array.isArray(users)) {
                console.error("La respuesta del servidor no es un array:", users);
                throw new Error("La respuesta del servidor no es un array.");
            }
    
            // Validar si el usuario existe
            const user = users.find((user: any) => user.email === email && user.password === password);
    
            if (user) {
                if (user.role === '1') {
                    window.location.href = 'https://cinefront.vercel.app/admin';
                } else if (user.role === '2') {
                    window.location.href = 'https://cinefront.vercel.app';
                } else {
                    setErrorMessage('Rol de usuario no reconocido');
                }
            } else {
                setErrorMessage('Usuario o Contraseña inválidos');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error durante el inicio de sesión:", error.message);
                setErrorMessage('Ocurrió un error: ' + error.message);
            } else {
                console.error("Error desconocido durante el inicio de sesión:", error);
                setErrorMessage('Ocurrió un error desconocido. Por favor, intenta nuevamente.');
            }
        }
    };
    

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://back-k1a3.onrender.com/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name, phone, address }),
            });
    
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                console.error("Respuesta inesperada:", text);
                throw new Error("El servidor no devolvió JSON.");
            }
    
            const data = await response.json();
    
            if (!response.ok) {
                setErrorMessage(data.message || 'Error al registrarse');
                return;
            }
    
            setErrorMessage('Registro exitoso! Puedes iniciar sesión ahora.');
            setIsLogin(true);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error durante el registro:", error.message);
                setErrorMessage('Ocurrió un error: ' + error.message);
            } else {
                console.error("Error desconocido durante el registro:", error);
                setErrorMessage('Ocurrió un error desconocido. Por favor, intenta nuevamente.');
            }
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
                                <label htmlFor="login-email" className="block text-lg font-medium text-white">Email</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-5">
                                <label htmlFor="login-password" className="block text-lg font-medium text-white">Contraseña</label>
                                <input
                                    type="password"
                                    id="login-password"
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
                    <form className="space-y-6 w-full max-w-md inputs-move-up" onSubmit={handleRegister}>
                        <div className="flex flex-col items-center">
                            <div className="w-full">
                                <label htmlFor="register-name" className="block text-lg font-medium text-white">Nombre y Apellido</label>
                                <input
                                    type="text"
                                    id="register-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="register-phone" className="block text-lg font-medium text-white">Teléfono</label>
                                <input
                                    type="tel"
                                    id="register-phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="register-address" className="block text-lg font-medium text-white">Dirección</label>
                                <input
                                    type="text"
                                    id="register-address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="register-email" className="block text-lg font-medium text-white">Email</label>
                                <input
                                    type="email"
                                    id="register-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
                                />
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="register-password" className="block text-lg font-medium text-white">Contraseña</label>
                                <input
                                    type="password"
                                    id="register-password"
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
                                    Registrarse
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-8 mb-4">
                        <button className="py-2 px-4 bg-green-500 text-white rounded-md" onClick={toggleForm}>
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
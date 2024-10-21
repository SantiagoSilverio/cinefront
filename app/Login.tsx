'use client'
import { useAppDispatch } from "@/store";
import { updateLogin, updateUser } from "@/store/reducers/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(email, password);
        try {
            Swal.fire({
                title: 'Verificando Credenciales...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            // La llamada al Endpoint del Login del Backend
            // const res = await fetch(`${process.env.NEXT_PUBLIC_URL_SERVER_DATA}/auth/login`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         "name": email,
            //         "password": password
            //     }),
            // });
            Swal.close();
            // if (res.status === 200) {
            if (email == 'usuario@email.com' && password == '123456') {
                dispatch(updateLogin(true));
                dispatch(updateUser({
                    id: '1',
                    name: 'Name',
                    email: `${email}`,
                    roles: ['user'],
                }));
                router.push('/admin');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops... Error !!!!',
                    // text: `Error ${res.statusText}`,
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops... Error !!!!',
                text: `Error ${error}`,
                confirmButtonText: 'Aceptar'
            });
        }
    }
    return (
        <div className="bg-cover bg-center bg-fixed bg-[url(/ciudad-tapalque.jpg)]" >
            <div className="flex justify-center items-center">
                <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
                    <h1 className="text-3xl font-bold mb-8 text-center">Ingreso</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700 mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" type="email" placeholder="Ingrese su Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700 mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder="Ingrese su contraseña" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            <a className="text-gray-600 hover:text-gray-800" href="#">Olvido su contraseña?</a>
                        </div>
                        <div className="mb-6">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
"use client";
import { useAuth } from "../src/contexts/AuthContext";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";
import Swal from "sweetalert2";
import Toast from "sweetalert2";
import Cookies from "js-cookie";
import "../globals.css";
import "./login.css";

const LoginRegister: React.FC = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Nuevo estado para el username
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(""); // Estado para la ciudad

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  const { login } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      Toast.fire({
        title: "Verificando Credenciales...",
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => {
          Toast.showLoading();
        },
      });

      // Llama al login y obtiene el token
      const data = await login(username, password); // Usa el login del contexto

      if (!data || !data.access) {
        throw new Error("No se pudo obtener el token de acceso");
      }

      const accessToken = data.access;

      // Llamar al endpoint /profile para obtener el perfil del usuario
      const profileResponse = await fetch("https://back-k1a3.onrender.com/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!profileResponse.ok) {
        throw new Error("No se pudo obtener el perfil del usuario");
      }

      const profileData = await profileResponse.json();

      // Cerrar el modal de Toast
      Toast.close();

      console.log(profileData); // Verifica que el perfil tenga la información esperada

      // Validar si el usuario pertenece al grupo "administrador"
      const userIsAdmin = profileData.groups.some((group: { name: string }) => group.name === "administrador");

      if (userIsAdmin) {
        // Redirigir a la página de administrador
        router.push("/admin");
      } else {
        // Redirigir a la página principal para usuarios no administradores
        router.push("/"); // Cambia "/venta" si tienes otra ruta para otros roles
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      Toast.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Por favor, intente nuevamente más tarde.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      // Mostrar un mensaje de espera con Toast
      Toast.fire({
        title: "Verificando Credenciales...",
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => {
          Toast.showLoading();
        },
      });
  
      // Hacer la solicitud POST a la API de registro
      const response = await fetch("https://back-k1a3.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // Asegúrate de que el estado `username` esté definido y tenga valor
          email,
          phone,
          address,
          city: null, // Ajusta esto según sea necesario
          password,
        }),
      });
  
      // Parsear la respuesta en formato JSON
      const data = await response.json();
  
      // Verificar si la respuesta no es exitosa
      if (!response.ok) {
        if (response.status === 401) {
          // Mostrar alerta de error para credenciales no autorizadas
          Toast.fire({
            icon: "error",
            title: "No autorizado",
            text: "Verifica las credenciales o permisos.",
          });
        } else {
          // Mostrar alerta de error para otros problemas
          Toast.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Error al registrarse",
          });
        }
        return; // Detener la ejecución en caso de error
      }
  
      // Si todo va bien, mostrar mensaje de éxito
      Toast.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Puedes iniciar sesión ahora!",
      });
  
      // Cambiar el estado para indicar que puede iniciar sesión
      setIsLogin(true);
    } catch (error) {
      // Manejar errores de la solicitud
      Toast.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error. Por favor, intenta nuevamente.",
      });
    }
  };
  




return (
  <div className="relative flex h-screen overflow-hidden">
    {/* Formulario de Iniciar Sesión */}
    <div className={`absolute inset-0 flex transform ${isLogin ? "translate-x-0" : "-translate-x-full"} transition-transform duration-1000`}>
      <div className="w-1/2 flex flex-col justify-center items-center bg-pink-500 p-8">
        <div className="absolute top-0 left-0 m-4">
          <h1 className="text-2xl font-bold text-white"></h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-8 title-move-up">Iniciar sesión</h2>
        <form className="space-y-6 w-full max-w-md inputs-move-up" onSubmit={handleLogin}>
          <div className="flex flex-col items-center">
            {errorMessage && (
              <div className="w-full text-red-600 font-bold flex items-center mb-4">
                <FaExclamationTriangle className="mr-2 text-xl" />
                {errorMessage}
              </div>
            )}
            <div className="w-full">
              <label htmlFor="login-username" className="block text-lg font-medium text-white">Username</label>
              <input
                type="text"
                id="login-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded-md">Iniciar sesión</button>
            </div>
          </div>
        </form>
        <div className="mt-8 mb-4">
          <button className="py-2 px-4 bg-green-500 text-white rounded-md" onClick={toggleForm}>Registrarse</button>
        </div>
      </div>
    </div>
    <div
      className={`absolute inset-0 flex transform ${isLogin ? "translate-x-full" : "translate-x-0"
        } transition-transform duration-1000`}
    >
      <div className="w-1/2 bg-cover"></div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-pink-600 p-8">
        <div className="absolute top-0 left-0 m-4">
          <h1 className="text-2xl font-bold text-red-700">CINEIMPAR</h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-20 mt-80 title-move-up">
          Registrarse
        </h2>
        <form className="space-y-6 w-full max-w-md inputs-move-up" onSubmit={handleRegister}>
          <div className="flex flex-col items-center">
            <div className="w-full">
              <label
                htmlFor="register-name"
                className="block text-lg font-medium text-white"
              >
                Nombre y Apellido
              </label>
              <input
                type="text"
                id="register-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
              />
            </div>
            <div className="w-full mt-4">
              <label
                htmlFor="register-phone"
                className="block text-lg font-medium text-white"
              >
                Teléfono
              </label>
              <input
                type="tel"
                id="register-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
              />
            </div>
            <div className="w-full mt-4">
              <label
                htmlFor="register-address"
                className="block text-lg font-medium text-white"
              >
                Dirección
              </label>
              <input
                type="text"
                id="register-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
              />
            </div>
            <div className="w-full mt-4">
              <label
                htmlFor="register-city"
                className="block text-lg font-medium text-white"
              >
                Ciudad
              </label>
              <input
                type="text"
                id="register-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
              />
            </div>
            <div className="w-full mt-4">
              <label
                htmlFor="register-username"
                className="block text-lg font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="register-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
              />
            </div>
            <div className="w-full mt-4">
              <label
                htmlFor="register-email"
                className="block text-lg font-medium text-white"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="register-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
              />
            </div>
            <div className="w-full mt-4">
              <label
                htmlFor="register-password"
                className="block text-lg font-medium text-white"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="register-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
              />
            </div>
            <div className="w-full mt-12 mb-8 flex justify-center">
              <button
                type="submit"
                className="py-2 px-4 bg-pink-400 text-white rounded-md"
              >
                Registrarse
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="py-2 px-4 bg-pink-400 text-white rounded-md" onClick={toggleForm}>Iniciar sesión</button>
          </div>
        </form>

      </div>
    </div>
  </div>
);
};

export default LoginRegister;

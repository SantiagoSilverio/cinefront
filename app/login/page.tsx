"use client";
import { useAuth } from "../src/contexts/AuthContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const LoginRegister = () => {
  const router = useRouter();
  const { login } = useAuth();
  
  // Form states
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    city: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Toast configuration
  const showToast = Swal.mixin({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      showToast.fire({
        title: "Verificando Credenciales...",
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => {
          showToast.showLoading();
        },
      });

      const data = await login(formData.username, formData.password);

      if (!data || !data.access) {
        throw new Error("No se pudo obtener el token de acceso");
      }

      const profileResponse = await fetch("https://back-k1a3.onrender.com/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access}`,
          "Content-Type": "application/json",
        },
      });

      if (!profileResponse.ok) {
        throw new Error("No se pudo obtener el perfil del usuario");
      }

      const profileData = await profileResponse.json();
      showToast.close();

      const userIsAdmin = profileData.groups.some(
        (group: { name: string }) => group.name === "administrador"
      );

      router.push(userIsAdmin ? "/admin" : "/");
    } catch (error) {
      console.error("Error durante el login:", error);
      showToast.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Por favor, intente nuevamente más tarde.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      showToast.fire({
        title: "Procesando registro...",
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => {
          showToast.showLoading();
        },
      });

      const response = await fetch("https://back-k1a3.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      showToast.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Puedes iniciar sesión ahora!",
      });

      setIsLogin(true);
    } catch (error) {
      showToast.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "Ocurrió un error inesperado",
      });
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Login Form */}
      <div
        className={`absolute inset-0 flex transform transition-transform duration-1000 ${
          isLogin ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-1/2 flex flex-col justify-center items-center bg-pink-500 p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Iniciar sesión</h2>
          <form className="space-y-6 w-full max-w-md" onSubmit={handleLogin}>
            {errorMessage && (
              <div className="text-red-600 font-bold flex items-center">
                <FaExclamationTriangle className="mr-2" />
                {errorMessage}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full rounded-md border text-black"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full rounded-md border text-black"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white rounded-md"
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="w-full py-2 px-4 bg-green-500 text-white rounded-md"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Register Form */}
      <div
        className={`absolute inset-0 flex transform transition-transform duration-1000 ${
          isLogin ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="w-1/2 bg-cover" />
        <div className="w-1/2 flex flex-col justify-center items-center bg-pink-600 p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Registrarse</h2>
          <form className="space-y-6 w-full max-w-md" onSubmit={handleRegister}>
            {["name", "phone", "address", "city", "username", "email", "password"].map((field) => (
              <div key={field}>
                <label className="block text-lg font-medium text-white">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full rounded-md border text-black"
                />
              </div>
            ))}
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-pink-400 text-white rounded-md"
              >
                Registrarse
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="w-full py-2 px-4 bg-pink-400 text-white rounded-md"
              >
                Volver al login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
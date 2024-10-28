"use client";
import { useAuth } from "../src/contexts/AuthContext";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";
import Swal from "sweetalert2";

// Type definitions
interface FormData {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
}

interface ApiResponse {
  access?: string;
  message?: string;
}

const LoginRegister = () => {
  const router = useRouter();
  const { login } = useAuth();
  
  // Initialize state with proper typing
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    city: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Toast configuration - memoized to prevent recreating on each render
  const showToast = useCallback(() => {
    return Swal.mixin({
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
  }, []);

  // Memoized handler for input changes
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Loading state handler
  const handleLoading = useCallback(async (promise: Promise<any>, loadingMessage: string) => {
    setIsLoading(true);
    const toast = showToast();
    
    try {
      toast.fire({
        title: loadingMessage,
        text: "Por favor espera",
        allowOutsideClick: false,
        didOpen: () => {
          toast.showLoading();
        },
      });

      const result = await promise;
      toast.close();
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // Login handler with proper error handling
  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const loginResult = await handleLoading(
        login(formData.username, formData.password),
        "Verificando Credenciales..."
      );

      if (!loginResult?.access) {
        throw new Error("No se pudo obtener el token de acceso");
      }

      const profileResponse = await fetch("https://back-k1a3.onrender.com/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginResult.access}`,
          "Content-Type": "application/json",
        },
      });

      if (!profileResponse.ok) {
        throw new Error("No se pudo obtener el perfil del usuario");
      }

      const profileData = await profileResponse.json();
      const userIsAdmin = profileData.groups?.some(
        (group: { name: string }) => group.name === "administrador"
      );

      router.push(userIsAdmin ? "/admin" : "/");
    } catch (error) {
      console.error("Error durante el login:", error);
      const toast = showToast();
      toast.fire({
        icon: "error",
        title: "Error de conexión",
        text: error instanceof Error ? error.message : "Error inesperado",
        confirmButtonText: "Aceptar",
      });
    }
  }, [formData, login, router, handleLoading, showToast]);

  // Register handler with proper error handling
  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    try {
      await handleLoading(
        fetch("https://back-k1a3.onrender.com/register", {
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
        }),
        "Procesando registro..."
      );

      const toast = showToast();
      toast.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Puedes iniciar sesión ahora!",
      });

      setIsLogin(true);
    } catch (error) {
      const toast = showToast();
      toast.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "Ocurrió un error inesperado",
      });
    }
  }, [formData, handleLoading, showToast]);

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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white rounded-md disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Iniciar sesión"}
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="w-full py-2 px-4 bg-green-500 text-white rounded-md disabled:opacity-50"
                disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
            ))}
            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-pink-400 text-white rounded-md disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Registrarse"}
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="w-full py-2 px-4 bg-pink-400 text-white rounded-md disabled:opacity-50"
                disabled={isLoading}
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
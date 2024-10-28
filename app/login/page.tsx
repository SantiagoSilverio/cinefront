"use client";

import { useAuth } from "../src/contexts/AuthContext";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import "../globals.css";
import "./login.css";

interface FormState {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  city: string;
}

const initialFormState: FormState = {
  username: "",
  password: "",
  email: "",
  name: "",
  phone: "",
  address: "",
  city: "",
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
  },
});

const LoginRegister: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const toggleForm = useCallback(() => {
    setIsLogin((prev) => !prev);
    setErrorMessage("");
    setFormData(initialFormState);
  }, []);

  const showLoadingToast = () => {
    return Toast.fire({
      title: "Verificando Credenciales...",
      text: "Por favor espera",
      allowOutsideClick: false,
      didOpen: () => {
        Toast.showLoading();
      },
    });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      showLoadingToast();

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
      Toast.close();

      const userIsAdmin = profileData.groups.some(
        (group: { name: string }) => group.name === "administrador"
      );

      router.push(userIsAdmin ? "/admin" : "/");
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
      showLoadingToast();

      const response = await fetch("https://back-k1a3.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          city: formData.city || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: response.status === 401 ? "No autorizado" : "Error",
          text: data.message || "Error al registrarse",
        });
        return;
      }

      Toast.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Puedes iniciar sesión ahora!",
      });

      setIsLogin(true);
      setFormData(initialFormState);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error. Por favor, intenta nuevamente.",
      });
    }
  };

  const renderInput = (
    id: keyof FormState,
    label: string,
    type: string = "text"
  ) => (
    <div className="w-full mt-4">
      <label htmlFor={`${isLogin ? "login" : "register"}-${id}`} className="block text-lg font-medium text-white">
        {label}
      </label>
      <input
        type={type}
        id={`${isLogin ? "login" : "register"}-${id}`}
        name={id}
        value={formData[id]}
        onChange={handleInputChange}
        className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black"
      />
    </div>
  );

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div
        className={`absolute inset-0 flex transform ${
          isLogin ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-1000`}
      >
        <div className="w-1/2 flex flex-col justify-center items-center bg-pink-500 p-8">
          <h2 className="text-3xl font-bold text-white mb-8 title-move-up">
            Iniciar sesión
          </h2>
          <form className="space-y-6 w-full max-w-md inputs-move-up" onSubmit={handleLogin}>
            <div className="flex flex-col items-center">
              {errorMessage && (
                <div className="w-full text-red-600 font-bold flex items-center mb-4">
                  <FaExclamationTriangle className="mr-2 text-xl" />
                  {errorMessage}
                </div>
              )}
              {renderInput("username", "Username")}
              {renderInput("password", "Contraseña", "password")}
              <div className="w-full mt-12 flex justify-center">
                <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded-md">
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
      </div>

      <div
        className={`absolute inset-0 flex transform ${
          isLogin ? "translate-x-full" : "translate-x-0"
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
              {renderInput("name", "Nombre y Apellido")}
              {renderInput("phone", "Teléfono", "tel")}
              {renderInput("address", "Dirección")}
              {renderInput("city", "Ciudad")}
              {renderInput("username", "Username")}
              {renderInput("email", "Correo Electrónico", "email")}
              {renderInput("password", "Contraseña", "password")}
              <div className="w-full mt-12 mb-8 flex justify-center">
                <button type="submit" className="py-2 px-4 bg-pink-400 text-white rounded-md">
                  Registrarse
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="button"
                className="py-2 px-4 bg-pink-400 text-white rounded-md"
                onClick={toggleForm}
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
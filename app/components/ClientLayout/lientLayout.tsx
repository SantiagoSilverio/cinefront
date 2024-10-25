'use client'; // Este archivo es un componente de cliente

import { usePathname } from "next/navigation";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login"; // Verificamos si estamos en login

  return (
    <>
      {!isLoginPage && <Navbar />}
      {children}
      {!isLoginPage && <Footer />}
    </>
  );
};

export default ClientLayout;

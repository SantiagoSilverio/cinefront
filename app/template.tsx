"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <div className="min-h-screen">
        {children}
      </div>
      {!isLoginPage && <Footer />}
    </>
  );
}
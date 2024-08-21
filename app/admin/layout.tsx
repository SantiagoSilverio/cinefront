import React from 'react';
import Sidebar from '../components/sidebar/Sidebar'; 
import Navbar from '../components/navbar/Navbar'; 
import Footer from '../components/footer/Footer'; 
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      return (
            <html lang="en">
                  <body className={inter.className}>
                  <Navbar/>
                        <div className="flex">

                              <Sidebar />
                              <main className="flex-1 ">{children}</main>
                        </div>

                  </body>
            </html>
      );
};

export default AdminLayout;

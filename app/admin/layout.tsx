import React from 'react';
import Sidebar from '../components/sidebar/Sidebar'; 
import Navbar from '../components/navbar/Navbar'; 
import Footer from '../components/footer/Footer'; 
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      return (

                        <div className="flex">

                              <Sidebar />
                              <main className="flex-1 ">{children}</main>
                        </div>



      );
};

export default AdminLayout;

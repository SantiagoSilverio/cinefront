import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      return (
            
            <div className="flex">

                  <Sidebar />
                  <main className="flex-1 mt-lg min-h-[89vh] overflow-y-scroll">{children}</main>
            </div>
      );
};

export default AdminLayout;

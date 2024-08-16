// En _app.tsx
import React from 'react';
import { useClient } from 'next/client';
import type { AppProps } from 'next/app';
import '../globals.css'; // Asegúrate de importar tus estilos globales aquí si los tienes

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return useClient(
    <div className="app">
      <Component {...pageProps} />
    </div>
  );
};

export default App;

// _app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import '../globals.css'; // Import your global styles

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="app">
      <Component {...pageProps} />
    </div>
  );
};

export default App;

import React from 'react';

const Layout = ({ children }) => {
  return (
    <main className="pt-16 min-h-screen">
      {children}
    </main>
  );
};

export default Layout;

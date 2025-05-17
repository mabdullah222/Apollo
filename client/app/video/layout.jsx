import React from 'react';
import Navbar from "@/components/navbar";
const Layout = ({children}) => {
    return (
        <div className={`lg:flex lg:flex-row h-full w-full text-white`}>
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;

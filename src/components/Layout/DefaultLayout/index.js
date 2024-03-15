import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import React, { useState } from 'react';
function DefaultLayout({ children }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const hideSidebar = () => {
        setSidebarVisible(false);
    };
    return (
        <div>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar sidebarVisible={sidebarVisible} hideSidebar={hideSidebar} />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

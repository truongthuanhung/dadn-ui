import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Report() {
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('isLoggedIn') === null) {
            navigate('/login');
        }
    }, []);
    return (
        <div className="Report mt-[65px] ml-[70px]">
            <h2>Report page</h2>
        </div>
    );
}

export default Report;

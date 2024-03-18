import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
function Report() {
    const navigate = useNavigate();
    const authContext = useAuth();
    useEffect(() => {
        if (!authContext.auth) {
            navigate('/login');
        }
    }, [authContext.auth, navigate]);
    return (
        <div className="Report mt-[65px] ml-[70px]">
            <h2>Report page</h2>
        </div>
    );
}

export default Report;

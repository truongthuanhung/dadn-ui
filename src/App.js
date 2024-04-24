import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, unknownRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import { useAuth } from './contexts/useAuth';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    const authContext = useAuth();
    
    const renderRoutes = authContext.auth
        ? [...publicRoutes, ...privateRoutes, ...unknownRoutes]
        : [...publicRoutes, ...unknownRoutes];
    return (
        <Router>
            <div className="App">
                <Routes>
                    {renderRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
                <ToastContainer autoClose={2500}/>
            </div>
        </Router>
    );
}

export default App;

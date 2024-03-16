import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, authRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import { useAuth } from './contexts/AuthContext';
function App() {
    const authContext = useAuth();
    const renderRoutes = !authContext.isLogin ? [...publicRoutes, ...authRoutes] : [...publicRoutes, ...privateRoutes];
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
            </div>
        </Router>
    );
}

export default App;

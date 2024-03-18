import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, unknownRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import { useAuth } from './contexts/useAuth';
function App() {
    const authContext = useAuth();
    console.log(authContext);
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
            </div>
        </Router>
    );
}

export default App;

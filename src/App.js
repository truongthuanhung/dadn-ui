import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes, authRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
function App() {
    const renderRoutes = [...publicRoutes, ...privateRoutes, ...authRoutes];
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

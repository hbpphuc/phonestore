import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { defaultRoute, publicRoutes } from './routes';

function App() {
    const Default = defaultRoute.component;
    return (
        <div className="w-full min-h-screen overflow-y-auto">
            <Routes>
                <Route path={defaultRoute.path} element={<Default />}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page />}
                            />
                        );
                    })}
                </Route>
            </Routes>
        </div>
    );
}

export default App;

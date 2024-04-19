import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { AuthProvider } from './contexts/useAuth';
import { ProfileProvider } from './contexts/useProfile';
import { NotifyProvider } from './contexts/useNotify';
import { BoundProvider } from './contexts/useBound';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <ProfileProvider>
            <NotifyProvider>
                <BoundProvider>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </BoundProvider>
            </NotifyProvider>
        </ProfileProvider>
    </AuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

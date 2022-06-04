import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Layout } from './components/Layout';
import { SocketListeners } from './components/SocketListeners';
import { Channels } from './pages/Channels';
import { Me } from './pages/Channels/Me';
import './styles/fonts.css';
import './styles/animations.css';

function App() {
  return (
    <div className="App">
      <SocketListeners>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/channels/@me" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/channels/:channelId" element={<Channels />} />
                <Route path="/channels/@me" element={<Me />} />
                <Route path="/channels/@me/:channelId" element={<Me />} />
              </Route>
            </Route>
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </SocketListeners>
    </div>
  );
}

export default App;

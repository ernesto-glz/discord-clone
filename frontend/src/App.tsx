import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/private-route';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { WSListeners } from './components/ws-listener';
import { GuildPage } from './pages/guild-page';
import './styles/dots-loading-animation.css';
import './styles/whitney-fonts.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <WSListeners>
          <Routes>
            <Route path="/" element={<Navigate to="/channels/@me" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/channels/:guildId" element={<GuildPage />} />
              <Route path="/channels/:guildId/:channelId" element={<GuildPage />} />
            </Route>
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </WSListeners>
      </BrowserRouter>
    </div>
  );
}

export default App;

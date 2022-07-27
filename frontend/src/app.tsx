import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/private-route';
import { GuildPage } from './pages/guild-page';
import LoginPage from './pages/auth/login-page';
import RegisterPage from './pages/auth/register-page';
import LogoutPage from './pages/auth/logout-page';
import FriendsPage from './pages/friends-page';
import './styles/index.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/channels/@me" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/channels/@me" element={<FriendsPage />} />
            <Route path="/channels/:guildId/:channelId" element={<GuildPage />} />
          </Route>
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

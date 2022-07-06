import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/private-route';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { GuildPage } from './pages/guild-page';
import { ready } from './redux/states/auth';
import { useAppDispatch } from './redux/hooks';
import './styles/dots-loading-animation.css';
import './styles/whitney-fonts.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ready())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;

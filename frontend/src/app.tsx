import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import { GuildPage } from "./pages/guild-page";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import LogoutPage from "./pages/auth/logout-page";
import FriendsPage from "./pages/friends-page";
import { useAppDispatch } from "./store/hooks";
import { ready } from "./store/states/auth";

type Props = { children: React.ReactNode };

const Router: React.FC<Props> = ({ children }) => {
  return isElectron ? (
    <HashRouter>{children}</HashRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ready());
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/channels/@me" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/channels/@me" element={<FriendsPage />} />
            <Route path="/channels/:guildId/:channelId" element={<GuildPage />} />
          </Route>
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

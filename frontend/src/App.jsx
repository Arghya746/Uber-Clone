import { Route, Routes } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

// Pages
import CaptainHome from "./pages/CaptainHome";
import CaptainLogin from "./pages/Captainlogin";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainRiding from "./pages/CaptainRiding";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import Riding from "./pages/Riding";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserSignup from "./pages/UserSignup";

// Providers
import CaptainProvider from "./context/CaptainProvider";
import SocketProvider from "./context/SocketProvider";
import UserProvider from "./context/UserProvider";

const App = () => {
  return (
    <SocketProvider>
      <UserProvider>
        <CaptainProvider>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/riding" element={<Riding />} />
            <Route path="/captain-login" element={<CaptainLogin />} />
            <Route path="/captain-signup" element={<CaptainSignup />} />
            <Route path="/captain-riding" element={<CaptainRiding />} />

            <Route
              path="/home"
              element={
                <UserProtectWrapper>
                  <Home />
                </UserProtectWrapper>
              }
            />
            <Route
              path="/user/logout"
              element={
                <UserProtectWrapper>
                  <UserLogout />
                </UserProtectWrapper>
              }
            />
            <Route
              path="/captain-home"
              element={
                <CaptainProtectWrapper>
                  <CaptainHome />
                </CaptainProtectWrapper>
              }
            />
            <Route
              path="/captain/logout"
              element={
                <CaptainProtectWrapper>
                  <CaptainLogout />
                </CaptainProtectWrapper>
              }
            />
          </Routes>
        </CaptainProvider>
      </UserProvider>
    </SocketProvider>
  );
};

export default App;

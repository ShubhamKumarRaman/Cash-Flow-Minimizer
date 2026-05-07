import { BrowserRouter, Routes, Route } from "react-router-dom";
import login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/group/:id" element={<GroupDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
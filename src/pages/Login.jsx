import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import apiClient from "../config/axiosConfig";
import "../style/style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Email dan password tidak boleh kosong!");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      // FIX: Langsung tembak API Karyawan
      const response = await apiClient.post("/login/karyawan", {
        email: email,
        password: password,
      });

      const token = response.data.token || (response.data.data && response.data.data.token);

      if (token) {
        localStorage.setItem("token", token);
        
        // Karyawan pasti punya role (bos, cs, teknisi) di dalam tokennya
        const decoded = jwtDecode(token);
        localStorage.setItem("role", decoded.role);

        navigate("/dashboard");
      } else {
        setErrorMsg("Token tidak valid dari server.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Koneksi ke server gagal.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <div className="logo-section">
          <img src="/src/assets/fix.png" alt="Logo Dental" />
          <h1>DENTAL</h1>
          <h2>MANAGEMENT SYSTEM</h2>
          <p>Silakan Masuk Untuk Melanjutkan Ke Sistem</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-box">
          <div className="avatar">
            <i className="fa-regular fa-circle-user"></i>
          </div>

          <h3>Masuk Sebagai Karyawan</h3>

          {errorMsg && <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>{errorMsg}</p>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
{/* 
          <div className="register-link">
            Anda seorang Dokter? <Link to="/login-dokter" style={{color: 'blue'}}>Login di sini</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
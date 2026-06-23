import React from 'react';
import { Link } from 'react-router-dom';
import "../style/LandingPage.css"; 

function LandingPage() {
  return (
    <div className="landing-wrapper">
      
      {/* NAVBAR ATAS */}
      <header className="landing-header">
        <div className="logo-brand">
          <img src="/assets/Logo.png" alt="Dental Lab Logo" onError={(e) => { e.target.src = "/assets/Logo.png" }} />
          <div>
            <span className="logo-text">DENTAL LAB</span>
            <span className="logo-subtext">MANUFACTURE</span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#tentang" className="nav-link">Tentang Kami</a>
          <a href="#layanan" className="nav-link">Layanan Lab</a>
        </nav>
      </header>

      {/* HERO SECTION - Fokus Penuh Mitra Dokter */}
      <main className="landing-main">
        <div className="hero-left">
          <div className="badge-tag">
            ✨ Digital Prosthetic Management System
          </div>
          <h1 className="hero-title">
            Precision & Quality <br />
            <span className="highlight">For Your Dental Lab</span>
          </h1>
          <p className="hero-desc">
            Platform digital end-to-end untuk restorasi dental modern. Mudahkan alur 
            pemesanan, produksi crown, bridge, veneer, hingga akrilik dengan presisi maksimal.
          </p>

          <div className="hero-buttons">
            {/* 🌟 Tombol Masuk Hanya Dikhususkan Untuk Dokter / Klinik Mitra */}
            <Link to="/login-dokter" className="btn-portal btn-primary">
              Mulai Pesan
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img 
            src="/src/assets/logo.png" 
            alt="Dental Manufacture Illustration" 
            onError={(e) => { e.target.src = "/assets/Logo.png" }} 
          />
        </div>
      </main>

      {/* FOOTER - Akses Karyawan Disamarkan / Dihidden */}
      <footer className="landing-footer">
        &copy; {new Date().getFullYear()} Dental Lab Manufacture. All rights reserved. 
        {/* Opsional: Tautan login karyawan ditaruh sangat samar di footer atau di-exclude sama sekali */}
        <span style={{marginLeft: '20px', fontSize: '10px', color: '#cbd5e1'}}>
          <Link to="/login" style={{color: '#94a3b8', textDecoration: 'none'}}>Internal System</Link>
        </span>
      </footer>

    </div>
  );
}

export default LandingPage;
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../style/style.css"; // 🌟 Impor CSS Sidebar di sini

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role') || 'guest';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? "nav-item active" : "nav-item";

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img 
          src="/src/assets/logokecil.png" 
          alt="Logo" 
          style={{ width: '100%', maxWidth: '45px', height: 'auto', objectFit: 'contain' }} 
          onError={(e) => { e.target.src = "/src/assets/Logo.png" }} 
        />
        <div>
          <p className="logo-title">DENTAL</p>
          <p className="logo-sub">SYSTEM</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>

        {role === 'teknisi' && (
          <>
            <Link to="/produk" className={isActive('/produk')}>Produk</Link>
            <Link to="/pesanan" className={isActive('/pesanan')}>Pesanan</Link>
            <Link to="/produksi" className={isActive('/produksi')}>Produksi</Link>
          </>
        )}

        {role === 'dokter' && (
          <>
            <Link to="/pesanan" className={isActive('/pesanan')}>Pesanan</Link>
            <Link to="/pengiriman" className={isActive('/pengiriman')}>Pengiriman</Link>
            <Link to="/transaksi" className={isActive('/transaksi')}>Transaksi</Link>
          </>
        )}

        {role === 'bos' && (
          <>
            <Link to="/produk" className={isActive('/produk')}>Produk</Link>
            <Link to="/pesanan" className={isActive('/pesanan')}>Pesanan</Link>
            <Link to="/persetujuan" className={isActive('/persetujuan')}>Persetujuan</Link>
            <Link to="/produksi" className={isActive('/produksi')}>Produksi</Link>
            <Link to="/pengiriman" className={isActive('/pengiriman')}>Pengiriman</Link>
            <Link to="/transaksi" className={isActive('/transaksi')}>Transaksi</Link>
            <Link to="/karyawan" className={isActive('/karyawan')}>Karyawan</Link>
          </>
        )}

        {role === 'cs' && (
          <>
            <Link to="/pesanan" className={isActive('/pesanan')}>Pesanan</Link>
            <Link to="/pengiriman" className={isActive('/pengiriman')}>Pengiriman</Link>
            <Link to="/produksi" className={isActive('/produksi')}>Produksi</Link>
            <Link to="/transaksi" className={isActive('/transaksi')}>Transaksi</Link>
            <Link to="/produk" className={isActive('/produk')}>Produk</Link>
          </>
        )}
      </nav>
      
      <button onClick={handleLogout} className="btn-keluar" style={{ marginBottom: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
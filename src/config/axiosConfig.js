import axios from 'axios';
import Swal from "sweetalert2";


let isSessionExpired = false;

// buat instance dasar
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Ambil token dari penyimpanan browser (localStorage)
    const token = localStorage.getItem('token');
    
    // Jika token ada, tambahkan format "Bearer <token>" ke header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401 && !isSessionExpired) {

      isSessionExpired = true;

      await Swal.fire({
        icon: "warning",
        title: "Sesi Login Berakhir",
        text: "Silakan login kembali.",
        confirmButtonText: "Login",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default apiClient;
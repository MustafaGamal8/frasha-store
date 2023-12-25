import Footer from './components/Footer';
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ToastContainer autoClose={1000} />
    </>
  )
}

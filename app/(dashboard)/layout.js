import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./ProtectedRoute";

export const metadata = {
  title: 'Dashboard - Frasha Store',
  description: 'Dashboard for Frasha Store',
}


export default function Layout({ children }) {
  return (
    <>
      <ProtectedRoute children={children} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}


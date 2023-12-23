import Navbar from './components/Navbar'
import './globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Frasha Store',
  description: 'متخصصون في بيع منتجات الهاند ميد والتطريز والهدايا و لملابس والاكسسورات',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body >
          <Navbar />
          {children}
        <ToastContainer  autoClose={1000}/>
      </body>
    </html>
  )
}

import NavBar from './components/Navbar'
import './globals.css'

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
        <NavBar />

        {children}
      </body>
    </html>
  )
}

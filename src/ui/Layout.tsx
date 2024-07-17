import Hearder from "./Hearder"
import Footer from "./Footer"
import {Toaster } from "react-hot-toast"
const Layout = ({ children }:{children:React.ReactNode}) => {
  return (
      <>
        <Hearder/>  
      {children}
      <Footer />
      <Toaster  
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        toastOptions={{
          style: {
            background: 'black',
            color: 'white'
            
          }
        }}
      
      
      />
      </>
  )
}

export default Layout

import { Outlet } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';


function Layout({children}) {
  return (
    <div className='layout-container'>
       <Header/>
           <main className='content'>
              {children}
           </main>
       <Footer/>
    </div>
  )
}

export default Layout;
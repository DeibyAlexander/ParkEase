import React from 'react'
import Logo from '../assets/img/bggdccfa1111.png'
import '../assets/css/aside.css'

const Aside = () => {
  return (
    <div className='aside'>
 

            <div className='navbar'>
                <div className='logo'>
                    <img src={Logo}></img>  
                </div>
                <div className='links'>
                    <a href="#" style={{ color: '#00ED4B' }}>Clientes</a>
                    <a href="#">Servicios</a>
                    <a href="#">Registros</a>
                    <a href="#">Reportes</a>
                </div>
                <div className='footer'>
                  <a href="">ParkEase</a>
                </div>
                
            </div>

    </div>
  )
}

export default Aside
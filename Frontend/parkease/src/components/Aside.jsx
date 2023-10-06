import React from 'react'
import Logo from '../assets/img/bggdccfa1111.png'
import '../assets/css/aside.css'

const Aside = () => {
  return (
    <div className='aside'>
 

            <nav>
                <div className='logo'>
                    <img src={Logo}></img>  
                </div>
                <hr className='raya'></hr>
                <div>
                    <a href="">Hola</a>
                    <a href="">Hola</a>
                    <a href="">Hola</a>
                    <a href="">Hola</a>
                </div>
   
                <a href="">Hola</a>
            </nav>

    </div>
  )
}

export default Aside
import React from 'react'
import Logo from "../../components/Logo";
import Avatar from "../../components/Avatar";

import './style.styl'
import IconSearch from '../../assets/search.png'



const Header = () => {

  return (
    <div className='header_container'>
      <div className='header_bar' >
        <a href="/index" className='logo'>
          <Logo />
        </a>
        <a href="/search" className='search_icon'>
          <img className="icon-search" src={IconSearch} />
        </a>
        <a href="/my" className='avatar'>
          <Avatar />
        </a>
      </div>
  
    </div>
  )
}



export default Header
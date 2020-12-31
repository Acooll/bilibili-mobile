import React, { useEffect, useState } from 'react'
import Logo from "../../components/Logo";
import Avatar from "../../components/Avatar";

import './style.styl'
import IconSearch from '../../assets/search.png'





const Header: React.FC = () => {


  return (
    <div className='header_container'>
      <div className='header_bar'>
        <a href="/index" className='logo'>
          <Logo />
        </a>
        <a href="" className='search_icon'>
          <img className="icon-search" src={IconSearch} />
        </a>
        <a href="" className='avatar'>
          <Avatar />
        </a>
      </div>
  
    </div>
  )
}



export default Header
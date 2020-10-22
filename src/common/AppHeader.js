import React, { Component } from 'react'
import './css/styles.css'
import './AppHeader.css'
import { Link, NavLink } from 'react-router-dom'
import $ from 'jquery'

class AppHeader extends Component {
  componentDidMount () {
    $('.navTrigger').click(function () {
      $(this).toggleClass('active')
      $('#mainNav').toggleClass('mobileNav')
      $('#mainListDiv').toggleClass('show_list')
      $('#mainListDiv').fadeIn()
    })
    $(window).scroll(function () {
      if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix')
      } else {
        $('.nav').removeClass('affix')
      }
    })
  }

  render () {
    return (
      <nav id='mainNav' className='nav'>
        <div className='container'>
          <div className='logo'>
            <Link to='/'>Master Diet</Link>
          </div>
          <div id='mainListDiv' className='main_list'>
            {this.props.authenticated ? (!window.location.href.includes('startForm') ? (
              <ul className='navlinks'>
                <li><NavLink to='/diary'>Diary</NavLink></li>
                <li><NavLink to='/profile'>Profile</NavLink></li>
                <li><NavLink to='/achievements'>Achievements</NavLink></li>
                <li>
                  <a onClick={this.props.onLogout}>Logout</a>
                </li>
              </ul>
            ) : (
              <ul className='navlinks' />
            )
            ) : (
              <ul className='navlinks'>
                <li>
                  <NavLink to='/login'>Login/SignUp</NavLink>
                </li>
              </ul>
            )}
          </div>
          <span className='navTrigger'>
            <i />
            <i />
            <i />
          </span>
        </div>
      </nav>
    )
  }
}

export default AppHeader

import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './AppHeader.css'

class AppHeader extends Component {
  render () {
    return (
      <header className='app-header'>
        <div className='container'>
          <div className='app-branding'>
            <Link to='/' className='app-title'>Master Diet</Link>
          </div>
          <div className='app-options'>
            <nav className='app-nav'>
              {this.props.authenticated ? (
                <ul>
                  <li>
                    <NavLink to='/profile'>Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to='/startForm'>Start Form</NavLink>
                  </li>
                  <li>
                    <NavLink to='/productBrowser'>Product Browser</NavLink>
                  </li>
                  <li>
                    <NavLink to='/bmiCalculator'>BMI Calculator</NavLink>
                  </li>
                  <li>
                    <a onClick={this.props.onLogout}>Logout</a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to='/login'>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to='/signup'>Signup</NavLink>
                  </li>

                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

export default AppHeader

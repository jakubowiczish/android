import React from 'react'
import './LoginSignupContainer.css'
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '../../constants'
import { login, signup } from '../../util/APIUtils'
import Alert from 'react-s-alert'
import $ from 'jquery'

class LoginSignupContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginEmail: '',
      loginPassword: '',
      signupName: '',
      signupEmail: '',
      signupPassword: ''

    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
  }

  componentDidMount () {
    const signUpButton = document.getElementById('signUp')
    const signInButton = document.getElementById('signIn')
    const container = document.getElementById('login_signup_container_id')

    if ($(window).width() <= 480) {
      $('.login-signup-container').addClass('hide')
    } else {
      $('.mob-div').addClass('hide')
    }
    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active')
    })

    $(window).on('resize', function () {
      if ($(window).width() < 480) {
        $('.login-signup-container').addClass('hide')
        $('.mob-div').removeClass('hide')
      }
      if ($(window).width() > 480) {
        $('.login-signup-container').removeClass('hide')
        $('.mob-div').addClass('hide')
      }
    })
  }

  handleInputChange (event) {
    const target = event.target
    const inputName = target.name
    const inputValue = target.value

    this.setState({
      [inputName]: inputValue
    })
  }

  handleLoginSubmit (event) {
    event.preventDefault()

    const loginRequest = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    }

    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken)
        window.location.reload(true)
        Alert.success('You\'re successfully logged in!')
      })
      .catch(error => {
        console.log(error)
        Alert.error('Oops! Something went wrong. Please try again!')
      })
  }

  handleSignupSubmit (event) {
    event.preventDefault()

    const signUpRequest = {
      name: this.state.signupName,
      email: this.state.signupEmail,
      password: this.state.signupPassword
    }

    signup(signUpRequest)
      .then(() => {
        Alert.success('You\'re successfully registered. Please login to continue!')
      })
      .catch(error => {
        console.log(error)
        Alert.error('Oops! Something went wrong. Please try again!')
      })
  }

  render () {
    return (
      <div className='center-login-signup-form'>
        <div className='mob-div'>
          <div className='top-box'>
            <form className='login-signup-form padding-box' action='#' onSubmit={this.handleLoginSubmit}>
              <h1>Sign in</h1>
              <div className='social-container'>
                <a href={FACEBOOK_AUTH_URL} className='social login-signup-icon-a fab facebook-icon' />
                <a href={GOOGLE_AUTH_URL} className='social login-signup-icon-a fab google-icon' />
                <a href={GITHUB_AUTH_URL} className='social login-signup-icon-a fab github-icon' />
              </div>
              <span>or use your account</span>
              <input
                className='login-signup-text-input'
                type='email'
                placeholder='Email'
                name='loginEmail'
                value={this.state.loginEmail}
                onChange={this.handleInputChange} required
              />
              <input
                className='login-signup-text-input'
                type='password'
                placeholder='Password'
                name='loginPassword'
                value={this.state.loginPassword}
                onChange={this.handleInputChange} required
              />
              <button className='login-signup-button'>
                Sign In
              </button>
            </form>
          </div>
          <div>
            <form className='login-signup-form padding-box' action='#' onSubmit={this.handleSignupSubmit}>
              <h1>Create Account</h1>
              <input
                className='login-signup-text-input'
                type='text'
                placeholder='Name'
                name='signupName'
                value={this.state.signupName}
                onChange={this.handleInputChange} required
              />
              <input
                className='login-signup-text-input'
                type='email'
                placeholder='Email'
                name='signupEmail'
                value={this.state.signupEmail}
                onChange={this.handleInputChange} required
              />
              <input
                className='login-signup-text-input'
                type='password'
                placeholder='Password'
                name='signupPassword'
                value={this.state.signupPassword}
                onChange={this.handleInputChange} required
              />
              <button className='login-signup-button'>
              Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className='login-signup-container' id='login_signup_container_id'>
          <div className='form-container sign-up-container'>
            <form className='login-signup-form' action='#' onSubmit={this.handleSignupSubmit}>
              <h1>Create Account</h1>
              <div className='social-container'>
                <a href={FACEBOOK_AUTH_URL} className='social login-signup-icon-a fab facebook-icon' />
                <a href={GOOGLE_AUTH_URL} className='social login-signup-icon-a fab google-icon' />
                <a href={GITHUB_AUTH_URL} className='social login-signup-icon-a fab github-icon' />
              </div>
              <span>or use your email for registration</span>
              <input
                className='login-signup-text-input'
                type='text'
                placeholder='Name'
                name='signupName'
                value={this.state.signupName}
                onChange={this.handleInputChange} required
              />
              <input
                className='login-signup-text-input'
                type='email'
                placeholder='Email'
                name='signupEmail'
                value={this.state.signupEmail}
                onChange={this.handleInputChange} required
              />
              <input
                className='login-signup-text-input'
                type='password'
                placeholder='Password'
                name='signupPassword'
                value={this.state.signupPassword}
                onChange={this.handleInputChange} required
              />
              <button className='login-signup-button'>
                Sign Up
              </button>
            </form>
          </div>
          <div className='form-container sign-in-container'>
            <form className='login-signup-form' action='#' onSubmit={this.handleLoginSubmit}>
              <h1>Sign in</h1>
              <div className='social-container'>
                <a href={FACEBOOK_AUTH_URL} className='social login-signup-icon-a fab facebook-icon' />
                <a href={GOOGLE_AUTH_URL} className='social login-signup-icon-a fab google-icon' />
                <a href={GITHUB_AUTH_URL} className='social login-signup-icon-a fab github-icon' />
              </div>
              <span>or use your account</span>
              <input
                className='login-signup-text-input'
                type='email'
                placeholder='Email'
                name='loginEmail'
                value={this.state.loginEmail}
                onChange={this.handleInputChange} required
              />
              <input
                className='login-signup-text-input'
                type='password'
                placeholder='Password'
                name='loginPassword'
                value={this.state.loginPassword}
                onChange={this.handleInputChange} required
              />
              <button className='login-signup-button'>
                Sign In
              </button>
            </form>
          </div>
          <div className='overlay-container'>
            <div className='overlay'>
              <div className='overlay-panel overlay-left'>
                <h1>Welcome Back!</h1>
                <p className='message-panel-left-right'>
                  To keep connected with us please login with your personal info
                </p>
                <button className='ghost login-signup-button' id='signIn'>
                  Sign In
                </button>
              </div>
              <div className='overlay-panel overlay-right'>
                <h1>Hello, Friend!</h1>
                <p className='message-panel-left-right'>
                  Please enter your personal details and start your journey
                </p>
                <button className='ghost login-signup-button' id='signUp'>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginSignupContainer

import React from 'react'
import './LoginSignupContainer.css'
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '../../constants'
import { login, signup } from '../../util/APIUtils'
import Alert from 'react-s-alert'

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
    const container = document.getElementById('container')

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active')
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
      'email': this.state.loginEmail,
      'password': this.state.loginPassword
    }

    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken)
        // this.props.history.push('/')
        window.location.reload(true)
        Alert.success('You\'re successfully logged in!')
      })
      .catch(error => {
        Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
      })
  }

  handleSignupSubmit (event) {
    event.preventDefault()

    const signUpRequest = {
      'name': this.state.signupName,
      'email': this.state.signupEmail,
      'password': this.state.signupPassword
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
      <div>
        <div className="center-login-signup-form">
          <div className="login-signup-container" id="container">
            <div className="form-container sign-up-container">
              <form action="#" onSubmit={this.handleSignupSubmit}>
                <h1>Create Account</h1>
                <div className="social-container">
                  <a href={FACEBOOK_AUTH_URL} className="social fab facebook-icon"/>
                  <a href={GOOGLE_AUTH_URL} className="social fab google-icon"/>
                  <a href={GITHUB_AUTH_URL} className="social fab github-icon"/>
                </div>
                <span>or use your email for registration</span>
                <input type="text"
                       placeholder="Name"
                       name="signupName"
                       value={this.state.signupName}
                       onChange={this.handleInputChange} required
                />
                <input type="email"
                       placeholder="Email"
                       name="signupEmail"
                       value={this.state.signupEmail}
                       onChange={this.handleInputChange} required
                />
                <input type="password"
                       placeholder="Password"
                       name="signupPassword"
                       value={this.state.signupPassword}
                       onChange={this.handleInputChange} required
                />
                <button>Sign Up</button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form action="#" onSubmit={this.handleLoginSubmit}>
                <h1>Sign in</h1>
                <div className="social-container">
                  <a href={FACEBOOK_AUTH_URL} className="social fab facebook-icon"/>
                  <a href={GOOGLE_AUTH_URL} className="social fab google-icon"/>
                  <a href={GITHUB_AUTH_URL} className="social fab github-icon"/>
                </div>
                <span>or use your account</span>
                <input type="email"
                       placeholder="Email"
                       name="loginEmail"
                       value={this.state.loginEmail}
                       onChange={this.handleInputChange} required
                />
                <input type="password"
                       placeholder="Password"
                       name="loginPassword"
                       value={this.state.loginPassword}
                       onChange={this.handleInputChange} required
                />
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="ghost" id="signIn">Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Please enter your personal details and start your journey</p>
                  <button className="ghost" id="signUp">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginSignupContainer
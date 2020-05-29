import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from "react-google-login";

function App() {

    const responseGoogle = (response) => {
        console.log(response)
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Welcome to Master Diet
                </p>
            </header>
            <h1>
                <GoogleLogin
                    clientId="597685077162-qu9s606hglv6k5jnk4j8faj5f1dtpdp0.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />,
            </h1>

        </div>
    );
}

export default App;

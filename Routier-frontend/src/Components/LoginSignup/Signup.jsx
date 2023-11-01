import './Signup.css'
import { useState } from 'react';
import tourset from '../Assets/tourSet.png'
import fb from '../Assets/fb.png'
import logo from '../Assets/Signuplogo.png'
import logotext from '../Assets/Signuplogotext.png'
import googlebutton from '../Assets/google.png'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { useGoogleLogin  } from '@react-oauth/google';

const LoginSignup = () => {

    const [user, setUser] = useState({});
    //google login setup
    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            setUser(codeResponse)
        }
    });

    //facebook login setup
    const responseFacebook = (response) => {                           //success
        console.log("facebook result  " + response.credential)
        setUser(response)
    }
    const handleLoginFailure = (error) => {                            //failure
        console.log(error)
    }

    return (
        <>
            <div>
                {/* <img src={logo} alt='logo' className='logo'></img>
                <img src = {logotext} alt='routier' className='logotext'></img> */}
            </div>
            <img src={tourset} alt='tourset' className='tourset'></img>
            <div className="container">
                <form method="post" className='signupForm'>
                    <div className="header">
                        <div className="text">Create Account</div>
                        <div className='customlogin'>
                            <button type='button' onClick={() => login()} className='custombutton'>
                            <img src={googlebutton} alt='google'></img>
                                    <div>
                                        Signup with Google
                                    </div>
                            </button>

                            <div className='loginbutton'>
                                <FacebookLogin
                                    appId="3478666502461850"
                                    autoLoad
                                    fields="name, email, picture"
                                    callback={responseFacebook}
                                    onFailure={handleLoginFailure}
                                    render={(renderProps) => (
                                        <button type='button' onClick={renderProps.onClick} className='custombutton'>
                                            <img src={fb} alt='fb'></img>
                                            <div>Signup with Facebook</div>
                                        </button>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='or'>
                        -OR-
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" placeholder='Full Name' />
                        </div>
                        <div className="input">
                            <input type="email" placeholder='Email Address' />
                        </div>
                        <div className="input">
                            <input type="password" placeholder='Password' />
                        </div>
                        <div className="input">
                            <input type="password" placeholder='Repeat Password' />
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className='signupSubmit' type='submit'>Create Account</button>
                    </div>
                    <div className='alreadyacc'>
                        Already have account?
                        <a href='./Login' className='redirect'>Log in</a>
                    </div>
                </form>

            </div>
        </>
    )
}

export default LoginSignup
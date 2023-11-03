import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {

    const [isCfSignIn, setCfSignIn] = useState(false)

    function switchSignInMethod() {
        setCfSignIn(!isCfSignIn)
        console.log(isCfSignIn)
    }


    return (
        <div className='container'>
            <h2 className='hint'>Sign In With</h2>
            <div className='option-btn btn' onClick={switchSignInMethod}>
                <img className='icon' src={!isCfSignIn ? 'assets/develop.png' : 'assets/3031869.png'} alt='CodeForces Logo' />
                <div className='btn-text'>{!isCfSignIn ? 'Coder\'s Aid' : 'CodeForces'}</div>
            </div>
            <div className='divider'></div>

            <div className='group'>
                <label>{!isCfSignIn ? 'Handle Or Email' : 'Username'}</label>
                <div className='username-feeld feeld' contenteditable="true"></div>
            </div>
            <div className='group'>
                <label>Password</label>
                <div className='password-feeld feeld' contenteditable="true"></div>
            </div>

            <div className='signin-btn btn'>Sign In</div>
        </div>
    );
}

export default SignIn;

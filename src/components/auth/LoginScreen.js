
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {



  const dispatch = useDispatch()

  const { loading } = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''

  })

  const { email, password } = formValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLoginEmailPassword(email, password))
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin())
  }

  

  return (

    <div className="wrapper">
  <form className="auth__form animate__animated animate__fadeIn animate__faster" onSubmit={handleLogin}>
    <p className="title">Log in</p>
    <input 
    type='text'
    placeholder='Email'
    name='email'
    autoComplete='off'
    value={email}
    onChange={handleInputChange} autofocus/>
    <i className="fas fa-envelope"></i>
    <input 
    type='password'
    placeholder='Password'
    name='password'
    value={password}
    onChange={handleInputChange} />
    <i class="fa fa-key"></i>
    <div className='auth__social-networs'>
         <p>Login with social network</p>
          <div
            className='google-btn'
            onClick={handleGoogleLogin}
          >
            <div className='google-icon-wrapper'>
              <img className='google-icon' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt='google button' />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
    <Link to='/auth/register' className='link'>Create new account</Link>
    <button 
    type='submit'
    disabled={loading}
    >
      <i className="spinner"></i>
      <span className="state">Log in</span>
    </button>
  </form>
  
 
</div>

  )
}

import React from 'react'
import { Link } from 'react-router-dom'

import validator from 'validator'

import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '../../hooks/useForm'
import { removeError, SetError } from '../../actions/ui'
import { startEmailRegister } from '../../actions/auth'

export const RegisterScreen = () => {
  const dispatch = useDispatch()
  const { msgError } = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: ''

  })

  const { name, email, password, password2 } = formValues

  const handleRegister = (e) => {
    e.preventDefault()
    if (isFormValid()) {
      dispatch(startEmailRegister(email, password, name))
    }
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(SetError('Name is required'))
      return false
    } else if (!validator.isEmail(email)) {
      dispatch(SetError('Email is not valid'))
      return false
    } else if (password !== password2) {
      dispatch(SetError('Passwords must match'))
      return false
    } else if (password.length < 5) {
      dispatch(SetError('Password must be at least 6 characters'))
      return false
    }

    dispatch(removeError())

    return true
  }

  return (
    
    <div className="wrapper">
    <form className="auth__form animate__animated animate__fadeIn animate__faster" onSubmit={handleRegister} >
      <p className="title">Register</p>
      <input 
      type='text'
      placeholder='Name'
      name='name'
      value={name}
      onChange={handleInputChange}
      autoComplete='off'/>
      <i className="fa fa-user"></i>
      <input 
      type='text'
      placeholder='Email'
      name='email'
      value={email}
      onChange={handleInputChange}
      autoComplete='off'/>
      <i className="fas fa-envelope"></i>
      <input 
      type='password'
      placeholder='Password'
      name='password'
      value={password}
      onChange={handleInputChange}/>
      <i class="fa fa-key"></i>
      <input 
      type='password'
      placeholder='Confirm password'
      name='password2'
      value={password2}
      onChange={handleInputChange} />
      <i class="fa fa-key"></i>
      <Link to='/auth/login' className='link'>Already registered?</Link>
      <button 
      type='submit'
      >
        <i className="spinner"></i>
        <span className="state">Register</span>
      </button>
      
      </form>
  
  </div>)
  
}
{/* 
<input 
      type='text'
      placeholder='Email'
      name='email'
      value={email}
      onChange={handleInputChange}
      autoComplete='off'/>
      <i className="fas fa-envelope"></i>
      <input 
      type='password'
      placeholder='Password'
      name='password'
      value={password}
      onChange={handleInputChange}/>
      <i class="fa fa-key"></i>
      <input 
      type='password'
      placeholder='Confirm password'
      name='password2'
      value={password2}
      onChange={handleInputChange} />
      <i class="fa fa-key"></i>
      <Link to='/auth/login' className='link'>Already registered?</Link>
      <button 
      type='submit'
      disabled={loading}
      >
        <i className="spinner"></i>
        <span className="state">Register</span>
      </button>
    </form>  */}
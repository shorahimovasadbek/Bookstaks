import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import './register.css'
import RegisterAxiosPost from '../utils/RegisterAxios/RegisterAxiosPost';
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'


export default function Register() {
  const [button, setButton] = useState(false)
  const [name, setValName] = useState('')
  const [phone, setValPhone] = useState('')
  const [pass1, setValPass1] = useState('')
  const [pass2, setValPass2] = useState('')
  const navigate = useNavigate()
  const data = {
    full_name: name,
    phone_number: phone,
    password: pass1,
    password2: pass2
  }

  const showNotification = () => {
    notification.info({
      message: `Notification`,
      description: 'You have entered less than 6 passwords or your passwords do not match, your number must be at least 9 characters long! ex: 907007666',
    })
  }

  useEffect(() => {
    setVal()
  }, [name, phone, pass1, pass2])

  function setVal() {
    if (name !== '' && phone !== '' && pass1 !== '' && pass2 !== '') {
      setButton(true)
    } else {
      setButton(false)
    }
  }

  function Register_User() {
    if (pass1.length > 5 && pass2.length > 5 && pass1 === pass2) {
      RegisterAxiosPost.postUser(data)
        .then(ress => {
          console.log(ress);
        })
      navigate('/login')
    } else {
      showNotification()
    }
    setValName('')
    setValPhone('')
    setValPass1('')
    setValPass2('')
  }


  return (
    <div className='form_div'>
      <div className='d-flex justify-content-center pb-4'>
        <code className='fs-3 px-3 py-2 register fw-bold'>Register now</code>
      </div>
      <form action="" className='form-control'>
        <div class="form-floating mb-3">
          <input value={name} type="email" onInput={(val) => setValName(val.target.value)} class="form-control fw-bold " id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">Name</label>
        </div>
        {/* {
          () && <div className='example_form bg-light rounded px-1 pt-3'>
          <h5>Example of filling out the form.</h5>
          <ul>
            <li>name: optional</li>
            <li>phone number: +998908230804</li>
            <li>password: At least 6 letters and symbols.</li>
          </ul>
        </div>
        } */}
        <div class="form-floating mb-3">
          <input value={phone} type="number" onInput={(val) => setValPhone(val.target.value)} class="form-control fw-bold number" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">Phone number</label>
        </div>
        <div class="form-floating mb-3">
          <input value={pass1} type="password" onInput={(val) => setValPass1(val.target.value)} class="form-control fw-bold" maxLength={10} id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
          <input value={pass2} type="password" onInput={(val) => setValPass2(val.target.value)} class="form-control fw-bold" maxLength={10} id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Confirm password</label>
        </div>
        {
          (button) && <div className='d-flex justify-content-center'><Button onClick={() => Register_User()} className='px-4 py-2' variant="contained">Send</Button></div>
        }
      </form>
    </div>
  )
}

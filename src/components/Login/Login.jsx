import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import './login.css'
import LoginUser from '../utils/LoginAxios/LoginUser';
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const [p_number, setPnumber] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const data = {
    phone_number: p_number,
    password: password
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    LoginUser.LoginUserPost(data)
      .then(ress => {
        console.log(ress, 'bu ress....');
        localStorage.setItem('token', ress.data.data.token.access)
      })
    setIsModalOpen(false);
    navigate('/home')
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='login_content'>
      <div className='login_button'>
        <Button onClick={showModal}>
          LogIn
        </Button>
      </div>
      <Modal className='modal_ant' title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input type="number" value={p_number} onInput={(val) => setPnumber(val.target.value)} placeholder='phone number' className='form-control border px-4' />
        <input type="password" value={password} onInput={(val) => setPassword(val.target.value)} placeholder='password' className='form-control border my-4 px-4' />
      </Modal>
    </div>
  );
}

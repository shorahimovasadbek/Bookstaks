import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

export default function ViewMore() {
  const more = useLocation()
  const navigate = useNavigate()
  console.log(more);

  return (
    <div className='container my-4'>
      <div className="row">
        <div className="col-5">
          <img style={{width: '100%'}} src={more.state.image} alt="img" />
        </div>
        <div className="col-7">
          <h3>{more.state.title}</h3>
          <p>{more.state.description}</p>
        </div>
      </div>
      <button className='btn btn-primary mt-4' onClick={() => navigate('/')}>Home</button>
    </div>
  )
}

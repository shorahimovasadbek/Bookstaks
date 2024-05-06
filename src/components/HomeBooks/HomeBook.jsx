import React, { useEffect, useState } from 'react'
import CrudBooks from '../utils/CRUDBook/CrudAxios'
import './home.css'
import logoImg from '../../assets/booklogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal } from 'antd';


export default function HomeBook() {
  const [books, setBooks] = useState([])
  const [name, setValName] = useState('')
  const [Url, setValImgUrl] = useState('')
  const [desk, setValDesk] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [del_add_edit, setDel_add_edit] = useState(false)
  const [id_book, setId] = useState('')
  const navigate = useNavigate()

  let formData = new FormData()
  formData.append('image', Url)
  formData.append('title', name)
  formData.append('description', desk)

  useEffect(() => {
    CrudBooks.getBooks()
      .then(ress => {
        setBooks(ress.data)
      })
  }, [del_add_edit]);

  const showModal = (id, desk, title) => {
    setValDesk(desk)
    setValName(title)
    setId(id)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    CrudBooks.editBooks(id_book, formData)
      .then(ress => {
        setDel_add_edit(!del_add_edit)
      })
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function Back_login() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  function handleImages(e) {
    setValImgUrl(e.target.files[0])
  }

  function Send() {
    CrudBooks.postBooks(formData)
      .then(ress => {
        setDel_add_edit(!del_add_edit)
      })
  }

  function Delete(id) {
    CrudBooks.deleteBooks(id)
      .then(ress => {
        setDel_add_edit(!del_add_edit)
      })
  }

  return (
    <div className='big_content'>
      <div className='book_store'>
        <div className='container'>
          <nav className='d-flex justify-content-between align-items-center px-3 py-2'>
            <div><img src={logoImg} alt="logo" /></div>
            <div><Button onClick={Back_login} variant="contained">LogOut</Button></div>
          </nav>
          <p className='book_store_title text-capitalize'>Welcome to our <span className='end_word'>bookstore!!!</span></p>
        </div>

        <button class="btn btn-primary create_card" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Create Card</button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Add a new book 😉.</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <input type="text" onInput={(val) => setValName(val.target.value)} placeholder='Book name' className='form-control border' />
            <input type="file" onChange={handleImages} placeholder='Img URL' className='form-control mt-3 border' />
            <input type="text" onInput={(val) => setValDesk(val.target.value)} placeholder='Description' className='form-control my-3 border' />
            <div className='d-flex justify-content-center'>
              <Button onClick={Send} color='primary' variant='contained' data-bs-dismiss="offcanvas">Send</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          {
            (books) ? books.map((item, index) => {
              return (
                <div key={index} className="col-3 my-4">
                  <Card sx={{ boxShadow: 3, position: 'relative' }}>
                    <CardMedia
                      sx={{ height: 180 }}
                      image={item.image}
                      title="books in girls"
                    />
                    <Link to='/viewmore' state={item}>
                      <Button variant='contained' className='position-absolute top-0 end-0'>View</Button>
                    </Link>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" va color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" variant='contained' onClick={() => showModal(item.id, item.description, item.title)}>Edit</Button>
                      <Button size="small" variant='contained' className='bg-danger' onClick={() => Delete(item.id)}>Delete</Button>
                    </CardActions>
                  </Card>
                </div>
              )
            })
              :
              <div className='d-flex justify-content-center ringLoader'><RingLoader color="#36d7b7" /></div>
          }
        </div>
      </div>
      <Modal className='modal_ant' title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input type="text" value={name} onInput={(val) => setValName(val.target.value)} placeholder='Book name' className='form-control border' />
        <input type="file" onChange={handleImages} placeholder='Img URL' className='form-control mt-3 border' />
        <input type="text" value={desk} onInput={(val) => setValDesk(val.target.value)} placeholder='Description' className='form-control my-3 border' />
      </Modal>
    </div>
  )
}

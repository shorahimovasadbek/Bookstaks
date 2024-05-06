import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL

const client = axios.create({
  baseUrl
})

export default client
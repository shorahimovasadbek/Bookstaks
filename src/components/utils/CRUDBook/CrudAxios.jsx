import fetchApi from '../FetchAxios/fetchApi'

class CrudBooks {
  async getBooks () {
    let endPoint = '/blog/list/'
    const response = await fetchApi.get(`${process.env.REACT_APP_BASE_URL}${endPoint}`)
    .then(ress => {
      return ress
    })
    .catch(err => {
      return JSON.stringify(err)
    })
    return response
  }


  async postBooks(data) {
    let endPoint = '/blog/create/'
    const Headers = {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}}
    const response = await fetchApi.post(`${process.env.REACT_APP_BASE_URL}${endPoint}`, data, Headers )
    .then(ress => {
      return ress 
    })
    .catch(err => {
      return JSON.stringify(err)
    })
    return response
  }


  async deleteBooks(id){
    let endPoint = '/blog/destroy/'
    const Headers = {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}}
    const response = await fetchApi.delete(`${process.env.REACT_APP_BASE_URL}${endPoint}${id}/`, Headers )
    .then(ress => {
      return ress 
    })
    .catch(err => {
      return JSON.stringify(err)
    })
    return response
  }

  async editBooks(id, data){
    let endPoint = '/blog/retrieve/'
    const Headers = {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}}
    const response = await fetchApi.patch(`${process.env.REACT_APP_BASE_URL}${endPoint}${id}/`, data ,Headers )
    .then(ress => {
      return ress 
    })
    .catch(err => {
      return JSON.stringify(err)
    })
    return response
  }
}

export default new CrudBooks
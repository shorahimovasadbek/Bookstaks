import fetchApi from '../FetchAxios/fetchApi'

class RegisterAxiosPost {
  async postUser(data) {
    let endPoint = '/account/register/'
    const response = await fetchApi.post(`${process.env.REACT_APP_BASE_URL}${endPoint}`,data)
    .then( ress => {
      return ress
    })
    .catch(err => {
      return JSON.stringify(err)
    })
    return response
  }
}

export default new RegisterAxiosPost
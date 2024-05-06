import fetchApi from '../FetchAxios/fetchApi'

class LoginUsers {
  async LoginUserPost(data) {
    let endPoint = '/account/login/'
    const response = await fetchApi.post(`${process.env.REACT_APP_BASE_URL}${endPoint}`, data)
      .then(ress => {
        return ress
      })
      .catch(err => {
        return JSON.stringify(err)
      })
    return response
  }
}

export default new LoginUsers
// axios
import axios from 'axios'

const baseURL = 'https://leenexport.com/api/v1'
//const baseURL = 'https://test.leenexport.com/api/v1'

export default axios.create({
  baseURL
  // You can add your headers here
})

// axios
import axios from 'axios'

const baseURL = 'https://leenexport.com/api/v1'
//const baseURL = 'http://localhost:5000/api/v1'

export default axios.create({
  baseURL
  // You can add your headers here
})

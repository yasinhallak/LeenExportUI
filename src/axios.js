// axios
import axios from 'axios'

//onst baseURL = 'https://testapi.leenexport.com/api/v1'
const baseURL = process.env.VUE_APP_BASE_API_Url

export default axios.create({
  baseURL
  // You can add your headers here
})

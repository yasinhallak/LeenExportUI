// axios
import axios from 'axios'

//const baseURL = 'https://testapi.leenexport.com/api/v1'
const baseURL = process.env.VUE_APP_BASE_API_Url
axios.defaults.withCredentials=true;
axios.defaults.headers={
  Accept: "application/json",
  "Content-Type": "application/json"
}
export default axios.create({
  baseURL
  // You can add your headers here
})

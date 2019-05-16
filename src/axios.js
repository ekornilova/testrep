import axios from 'axios'

const instance  = axios.create({
    baseURL: 'https://react-kornilova-burger.firebaseio.com/'
})
export default instance
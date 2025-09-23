import axios from 'axios'


//we will make api calls on this instance
export const instance = axios.create({
    baseURL: 'http://localhost:5000',
    //cookies will be sent with every request
    withCredentials: true
})
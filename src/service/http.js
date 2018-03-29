import axios from 'axios'

const http = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Expose-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }
})

export default http

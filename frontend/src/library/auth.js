
import axios from 'axios'

//Authorization requests

export const registerUser = formData => {
  return axios.post('/api/register', formData)
}

export function loginUser(formData){
  return axios.post('/api/login', formData)
}

export function setToken(token){
  localStorage.setItem('token', token)
}

export function logout(){
  localStorage.removeItem('token')
}

export const getToken = () =>{
  return localStorage.getItem('token')
}

const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  
  return JSON.parse(atob(parts[1]))
}

export const authenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.floor(Date.now() / 1000)
  return now < payload.exp
}


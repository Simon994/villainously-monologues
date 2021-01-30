import axios from 'axios'

export function getAllQuotes() {
  return axios.get('/api/villains')
}

export function getSingleQuote(quoteId){
  return axios.get(`/api/villains/${quoteId}`, withHeaders())
}

export function createQuote(formData){
  return axios.post('/api/villains', formData, withHeaders())
}

export function updateQuote(id, formData){
  return axios.put(`/api/villains/${id}`, formData, withHeaders())
}

export function deleteQuote(id){
  return axios.delete(`/api/villains/${id}`, withHeaders())
}


function withHeaders(){
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}
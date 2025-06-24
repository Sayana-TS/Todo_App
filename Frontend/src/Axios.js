import axios from 'axios'

const Backend = axios.create({
  baseURL: 'http://localhost:2004/api/todo'
});

export default Backend
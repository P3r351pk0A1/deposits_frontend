import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar  from './components/NavBar'
import App from './App'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <NavBar />
    <App />
  </>,
)
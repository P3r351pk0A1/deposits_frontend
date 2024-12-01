import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
// import NavbarComponent  from './components/NavBar'
import App from './App'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
  })
}
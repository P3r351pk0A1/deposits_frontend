// import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
// import NavbarComponent  from './components/NavBar'
import App from './App'
import { store } from './store'
import { Provider } from "react-redux";

// Функция для удаления куки
function deleteCookie(name: string) {
  document.cookie = name + '=; Max-Age=0; path=/';
}

// Удаление куки session_id при загрузке страницы
window.addEventListener('load', () => {
  deleteCookie('session_id');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store= {store}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
    </Provider>
  </>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/deposits_frontend/serviceWorker.js")
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
  })
} 
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginPage/>
      <App/>
  </React.StrictMode>
)

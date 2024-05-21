import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)


// HOMEWORK

// od predhondiot proekt vo node da implementirate jwt tokent no da go stavite na session storage ili cookies
// da creirate globalen state vo redux ili context i tamo da go zacuvate.
// i da hendlate podatoci od otj globalen state.
// full singin signup form.
// da kreirate recept 

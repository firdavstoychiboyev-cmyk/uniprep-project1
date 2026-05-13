import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './uniprep_ver_.jsx' // This is your main component
import './index.css'
import { Analytics } from "@vercel/analytics/react" // <--- ADD THIS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics /> {/* <--- ADD THIS */}
  </React.StrictMode>,
)

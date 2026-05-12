import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './uniprep_ver_.jsx' // Проверь, что имя файла именно такое!

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

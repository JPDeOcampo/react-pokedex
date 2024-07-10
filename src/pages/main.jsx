import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ShareState from '../components/shared/context/share-state/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShareState>
      <App />
    </ShareState>
  </React.StrictMode>,
)

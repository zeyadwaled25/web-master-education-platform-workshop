import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Helmet } from 'react-helmet'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Helmet>
      <title>LearnHub - Your Online Learning Platform</title>
      <meta name="description" content="Empowering learners worldwide with high-quality online courses and expert instruction." />
    </Helmet>
    <App />
  </StrictMode>,
)

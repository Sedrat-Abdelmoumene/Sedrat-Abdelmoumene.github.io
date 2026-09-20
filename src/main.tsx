import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './redesign.css'
import './theme-fixes.css'
import './portrait-modal.css'
import './background-effects.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

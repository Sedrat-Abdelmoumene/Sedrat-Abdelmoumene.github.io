import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './project.css'
import './skills.css'
import './skill-icons.css'
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

import { StrictMode } from 'react' //StrictMode严格模式
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

//渲染root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

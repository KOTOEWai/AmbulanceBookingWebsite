import React from 'react'
import './App.css'
import Routes from './components/route'
import { AuthProvider } from './components/AuthContext'
function App() {
   

  return (
   <React.StrictMode>
   <AuthProvider>
   <Routes/>
   </AuthProvider>
   </React.StrictMode>
  )
}

export default App
 
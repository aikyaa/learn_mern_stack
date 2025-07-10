import { Route, Routes } from 'react-router-dom'
// import './App.css'
import {Box,Button} from '@chakra-ui/react'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { useColorModeValue } from './components/ui/color-mode'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.950")}>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App

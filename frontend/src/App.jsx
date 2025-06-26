import { Route, Routes } from 'react-router-dom'
// import './App.css'
import {Box,Button} from '@chakra-ui/react'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { useColorModeValue } from './components/ui/color-mode'

function App() {

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.950")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  )
}

export default App

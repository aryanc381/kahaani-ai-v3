import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './pages/signup';
import { ThemeProvider } from './components/theme-provider';
import Login from './pages/login';
import { Toaster } from './components/ui/sonner';
import Home from './pages/home';

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>

    <div className='mt-[3vw] m-[10vw]'>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
    
    </ThemeProvider>
  )
}

export default App

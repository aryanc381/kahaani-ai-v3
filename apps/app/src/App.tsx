import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './pages/signup';
import { ThemeProvider } from './components/theme-provider';
import Login from './pages/login';
import { Toaster } from './components/ui/sonner';

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>

    <div className='mt-[3vw] m-[10vw]'>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
    
    </ThemeProvider>
  )
}

export default App

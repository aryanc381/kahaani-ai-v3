import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Signup from './pages/signup';
import { ThemeProvider } from './components/theme-provider';

function App() {


  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>

    <div className='mt-[3vw] m-[10vw]'>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
    
    </ThemeProvider>
  )
}

export default App

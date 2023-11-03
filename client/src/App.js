import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signin' element={<SignIn/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
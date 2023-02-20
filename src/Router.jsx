import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CetakDataPO from './Pages/CetakDataPO'
import FromInput from './Pages/FromInput'
import Login from './Pages/Login'
import PrivateRoutes from './PrivateRouter/PrivateRouter'

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<FromInput />} path="/frominput" exact />
                        <Route element={<CetakDataPO />} path="/cetakpo" />
                    </Route>
                    <Route element={<Login />} path="/" />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

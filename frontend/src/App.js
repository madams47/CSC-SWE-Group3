import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateAddress from './CreateAddress';
import UpdateAddress from './UpdateAddress';
import SignupForm from './LoginPage';
//import Validation from './Validationsignup';
import Test from './Test';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import GenerateReport from './GenerateReport';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='MainPage' element={<MainPage />}></Route>
        <Route path='/CreateAddress' element={<CreateAddress />}></Route>
        <Route path='/UpdateAddress' element={<UpdateAddress />}></Route>
        <Route path='/SignupForm/' element={<SignupForm />}></Route>
        <Route path='/Test/' element={<Test />}></Route>
        <Route path='/GenerateReport/' element={<GenerateReport />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

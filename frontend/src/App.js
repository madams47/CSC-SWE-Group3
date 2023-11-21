import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreateWorkItem from './CreateWorkItem';
import UpdateWorkItem from './UpdateWorkItem';
//import Validation from './Validationsignup';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import GenerateReport from './GenerateReport';
import Admin from './Admin';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='MainPage' element={<MainPage />}></Route>
        <Route path='/Admin' element={<Admin />}></Route>
        <Route path='/CreateUser' element={<CreateUser />}></Route>
        <Route path='/UpdateUser/:User_Name' element={<UpdateUser />}></Route>
        <Route path='/CreateWorkItem' element={<CreateWorkItem />}></Route>
        <Route path='/UpdateWorkItem/:Job_ID' element={<UpdateWorkItem />}></Route>
        <Route path='/GenerateReport/:Work_Item_List' element={<GenerateReport />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App

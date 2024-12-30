import './App.css'
import DashboardLayoutBasic from './components/Layout/DashboardLayoutBasic'
import SignUp from './Components/Register/SignUp'
import Login from './Components/Login/Login'
import {BrowserRouter as Router ,Routes,Route, BrowserRouter} from 'react-router-dom';
import Logout from './Components/Logout/Logout';
import UserProtectedWrapper from './Components/Protect Route/UserProtectedWrapper';
import MasterData from './Components/MasterData/MasterData';
import Classroom from './Components/MasterData/MasterDataPages/Classroom/Classroom';
import Professor from './Components/MasterData/MasterDataPages/Professor/Professor';
import Create from './Components/MasterData/CRUD/Create';
import Update from './Components/MasterData/CRUD/Update';
import Year from './Components/MasterData/MasterDataPages/Year/Year'
import TimeSlot from './Components/MasterData/MasterDataPages/Timeslot/Timeslot'


function App() {
  
  return (
    <BrowserRouter>
         <Routes>
               <Route path="/" element={<Login/>} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/SignUp" element={    <UserProtectedWrapper><SignUp/></UserProtectedWrapper>}/>
              <Route path="/logout" element={ <UserProtectedWrapper> <Logout/></UserProtectedWrapper>}/>
              <Route path="/DashboardLayoutBasic" element={ <UserProtectedWrapper><DashboardLayoutBasic /></UserProtectedWrapper>}/>
              <Route path='/MasterData' element={<UserProtectedWrapper><MasterData/></UserProtectedWrapper>} />
               <Route path ="/Classroom" element={<UserProtectedWrapper><Classroom/></UserProtectedWrapper>} />
               <Route path ="/Professor" element={<UserProtectedWrapper><Professor/></UserProtectedWrapper>} />
               <Route path ="/Year" element={<UserProtectedWrapper><Year/></UserProtectedWrapper>} />
               <Route path ="/TimeSlot" element={<UserProtectedWrapper><TimeSlot/></UserProtectedWrapper>} />
               <Route path ="/Create" element={<Create/>} />
               <Route path="/Update/:id" element={<Update/>} />

          </Routes>
    </BrowserRouter>
  )

}

export default App

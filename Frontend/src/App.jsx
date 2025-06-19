import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserProtect from './components/UserProtect';
import Home from './pages/Home';
import ClassVideo from './pages/ClassVideo';
import ChangePass from './pages/ChangePass';
import Aptitude from './pages/Aptitude';
import Login from './pages/Login';
import TaskReply from './components/TaskReply';
import { useDispatch, useSelector } from 'react-redux';
import ProjectHome from './pages/ProjectHome';
import ProjectProtect from './components/ProjectProtect';
import { LogoutData } from './Redux/UserSlice';



function App() {

  const loginInfo = useSelector((state) => state.userlogin?.LoginInfo?.[0]);
  const dispatch = useDispatch();
  var check
  check = loginInfo ? loginInfo.selectedTrainingId ?
    loginInfo.selectedTrainingId : loginInfo.trainingIdArray[0] ? loginInfo.trainingIdArray[0] :
      loginInfo.pro_stud_id ? loginInfo.pro_stud_id : null : null

  // Determine `check` based on available ID

  var id = loginInfo ? loginInfo.pro_stud_id : null

  useEffect(() => {
    if (check == null) {
      dispatch(LogoutData());
    }
  }, [loginInfo, dispatch,check]);


  return (
    <div>




      <Router>
        <Routes>
          {/* Public Route */}
          <Route path='/login' element={<Login />} />

          {/* Protected Routes Wrapper */}
          <Route element={<UserProtect />}>
            <Route path='/' element={id ? <ProjectHome /> : <Home />} />
            <Route path='/ClassVideo' element={<ClassVideo />} />
            <Route path='/ChangePass' element={<ChangePass />} />
            <Route path='/Aptitude' element={<Aptitude />} />
            <Route path='/TaskReply' element={<TaskReply />} />
          </Route>
          {/* project Protected Routes Wrapper */}
          <Route element={<ProjectProtect />}>
            <Route path='/' element={id ? <ProjectHome /> : <Home />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
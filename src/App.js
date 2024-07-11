import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import WorkoutList from './pages/WorkoutList';
import AddWorkout from './pages/AddWorkout';

import './App.css';

import { UserProvider } from './UserContext';

const GET_PROFILE_URL = 'https://fitness-tracker-oahg.onrender.com/users/getProfile';

function App() {

    //Add a global user state
    const [user, setUser] = useState({
      id: null,
      isAdmin: null
    });

    useEffect(() => {

      if (localStorage.getItem('token')) {
        fetch(GET_PROFILE_URL, {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
          }
        })
        .then(res => res.json())
        .then(data => {
  
          if (typeof data.user !== "undefined") {
    
            setUser({
              id: data.user._id,
              isAdmin: data.user.isAdmin
            });

          } else {
    
            setUser({
              id: null,
              isAdmin: null
            });
    
          }
    
        })
      }

    }, []);

  return (
    <UserProvider value={{user, setUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/workouts" element={<WorkoutList />} />
            <Route path="/addWorkout" element={<AddWorkout />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
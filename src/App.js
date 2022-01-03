import logo from './logo.svg';
import './App.css';
import Item from './components/paths/Item';
import AuthProvider from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/paths/Home';
import FilterClothes from './components/paths/FilterClothes';
import Profile from './components/paths/Profile';
import Cart from './components/paths/Cart';
import PrivateRoute from './components/PrivateRoute';
import { Fragment } from 'react';
import Login from './components/paths/Login';
import Signup from './components/paths/Signup';
import PrivateRouteForAuthentication from './components/PrivateRouteForAuthentication';
import AllItems from './components/paths/AllItems';
import UploadCollection from './components/paths/UploadCollection';

function App() {
  return (
    <AuthProvider>
      <Router>
        
        <Routes>
          <Route path="/clothes" element={<FilterClothes></FilterClothes>}>
          </Route>
          <Route path="/allitems" element={<AllItems></AllItems>}>
          </Route>
          <Route path="/item" element={<Item></Item>}>
          </Route>
          <Route path="/profile" element={<PrivateRoute><Profile></Profile></PrivateRoute>}>
          </Route>
          <Route path="/adminonly" element={<UploadCollection></UploadCollection>}>
          </Route>
          <Route path="/cart" element={<Cart></Cart>}>
          </Route>
          <Route path="/login" element={<PrivateRouteForAuthentication><Login></Login></PrivateRouteForAuthentication>}>
          </Route>
          <Route path="/signup" element={<PrivateRouteForAuthentication><Signup></Signup></PrivateRouteForAuthentication>}>
          </Route>
          <Route path="/" element={<Home></Home>}>
          </Route>
        </Routes>
        
      </Router>
     </AuthProvider>


  );
}

export default App;

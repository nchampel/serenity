import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Moon from './pages/Moon';
import SideBar from './component/SideBar';
import Earth from './pages/Earth';

// const image = {
//   'earth': '../assets/terre.jpg',
//   'moon': './lune.jpg',
// };

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SideBar />
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/lune" element={<Moon /* image={image.moon} */ />} />
        <Route path="/terre" element={<Earth />} />
      </Routes>
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

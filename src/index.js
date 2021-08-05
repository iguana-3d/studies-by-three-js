import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Three01 from './three01';
import Three02 from './three02';

ReactDOM.render(
   <React.StrictMode>
      <div className="container">
         <Three02 />
         {/* <Three01 /> */}
      </div>
      {/* <App /> */}
   </React.StrictMode>,
   document.getElementById('root')
);
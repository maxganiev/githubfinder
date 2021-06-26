import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';


(()=>{
if(navigator.onLine){
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
} else {
  document.getElementById('root').innerHTML = `
  <p> No Internet conection, attempting to reload... </p>  `;

  //attempting to reload the page
  setTimeout(()=>{document.location.reload()},3000)
}
})()

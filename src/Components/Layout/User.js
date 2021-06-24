import React, {useContext, useEffect} from 'react';
import {githubContext} from '../../context/github/githubContext';
import Spinner_gif from '../Imgs/spinner.gif';
import { Link } from 'react-router-dom';

export const User = ({match})=>{

const GithubContext = useContext(githubContext);

const { loading, user: {name, avatar_url, login, bio}, getLogin} = GithubContext;


useEffect(()=>{
//call the function inside GithubState to fill user {}; match is props object, params is what defined in Route after colon: /user/:login :
getLogin(match.params.login);
// eslint-disable-next-line
}, []);


if(loading === false){
  return(
    <ul className = "card list" style={ulStyle}>
      <li> <p> {name} </p> </li>
      <li> <img src={avatar_url} alt="loading..." className="round-img" style={{width: '40%', height: '40%', objectFit: 'contain'}}></img> </li>
      <li> <big> {login} </big> </li>
      <br/>
      <br/>
      <li> <p className = "lead form-text text-center"> {bio} </p> </li>
      <li> <Link to={`/user/${login}/followers`} className="btn btn-link btn-sm" style={{backgroundColor: 'red', color: 'ffffff'}}> Check out the followers... </Link> </li>
      <li> <Link to={'/'} className="btn btn-link btn-sm" style={{backgroundColor: 'black', color: 'white'}}>  Get back </Link> </li>
    </ul>
  )
} else {
  return (
    <div style={{width: '100vw', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={Spinner_gif} alt="loading..." style={{ width: '40%', height: '40%', objectFit: 'contain'}}></img>
    </div>
  )
}
}



const ulStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center'
};
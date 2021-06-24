import React, {useContext, useEffect} from 'react';
import {githubContext} from '../../context/github/githubContext';
import Spinner_gif from '../Imgs/spinner.gif';
import {FetchErr} from './FetchErr';
import { Link } from 'react-router-dom';






export const Followers = ({match})=>{

  const GithubContext = useContext(githubContext);
  const { followers, loading, fetchErrStyle, fetchErrContent, hasFollowers, getFollowers } = GithubContext;

  useEffect(()=>{
    //call the function inside GithubState to fill followers []; match is props object, params is what defined in Route after colon: /user/:login/followers :
    getFollowers(match.params.login);
    // eslint-disable-next-line
    }, []);
  

  //paginaton step back
  let windowLocationHref = window.location.href;
  let currentUrl = windowLocationHref.slice(windowLocationHref.indexOf('user')+5, windowLocationHref.indexOf('followers')-1);
  
  if(loading === false){
    if(hasFollowers === false){
      return (
      <FetchErr style = {fetchErrStyle} content = {fetchErrContent} />
      )
    } else {
    return(
      <div>
      <Link to={`/user/${currentUrl}`}> <button className="btn btn-link btn-sm" style={{backgroundColor: 'black', color: 'white'}}>Get back</button> </Link>
      {followers.map((follower)=>{
      return (
      <div style = {{display: 'block'}} key = {follower.id}>
      <Follower data = {follower}  />
      </div>
      )
      })}
      </div>
    )
    }
  } else{
    return(
    <img src={Spinner_gif} alt="loading..." style={{position: 'relative', top: '20%', left: '40%', width: '20%', height: '20%', objectFit: 'contain'}}></img>
    )
  }
}

const Follower = ({ data })=>{
    //distructuring:
    const {login, avatar_url} = data;
    //the old way of doing the same thing: const Followers = ({data : {login...}})
  return (
    <div className= 'card text-center'>
      <img src = {avatar_url} alt = '' style = {{width: '10%', height: '10%'}}></img>
      <h4> {login} </h4>
      <h5> Link to the repos: </h5> 
      <Link to = {`/user/${login}/repos`} className = "btn btn-dark">   Check out the repos...  </Link>
    </div>
  )
}


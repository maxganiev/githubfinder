import React, { useContext, Fragment, useEffect } from 'react';
import {githubContext} from '../../context/github/githubContext';
import Spinner_gif from '../Imgs/spinner.gif';
import {FetchErr} from './FetchErr';


export const UserRepos = ({match, history})=>{
  const GithubContext = useContext(githubContext);
  const { repos, loading, fetchErrStyle, fetchErrContent, getRepos} = GithubContext;

  useEffect(()=>{
    //call the function inside GithubState to fill user repos []; match is props's object, params is what defined in Route after colon: /user/:login/repos :
    getRepos(match.params.login);
    // eslint-disable-next-line
  },[]);

  const getBack = ()=>{
    //history is also a  props's inbuilt method:
    history.goBack()
  }

  //as long as I want an user avatar (that are actually the same alongside the whole fetched array) to be rendered only once, I first slice the initial array and afterwards map over it
  const sliced = repos.slice(0,1);
  
  if(loading === false){
    return(
      <div className = 'card text-center' >
        <FetchErr style = {fetchErrStyle} content = {fetchErrContent} />
        <br/>
        {/**here I am mapping over a newly created array that renders the avatar only once */}
        {sliced.map((rep)=>{return( <Fragment key = {rep.id}> <h3> {rep.owner.login} </h3> <img src={rep.owner.avatar_url} alt="avatar" className="round-img" style={{width: '20%', height: '20%', objectFit: 'contain'}} />  </Fragment> )})}
        <button onClick={getBack} className="btn btn-link btn-sm" style={{backgroundColor: 'black', color: 'white'}}> Get back </button>
        {repos.map((repo)=>{
           return (
          <div key = {repo.id} style={gridStyle}>
            
          <div>
          <h5>Repo name:</h5>
          <p> {repo.full_name} </p>
          </div>
          
          <div style={{fontSize: 'calc(0.4rem + 1vmin)'}}>
          <h5> brief bio: </h5>
          <p> {repo.description === null ? 'description is empty' : repo.description} </p>
          <h5> link: </h5>
          <a href= {repo.html_url} target='_blank' rel="noreferrer">visit</a>
          <h5> created: </h5>
          <p> {repo.created_at} </p>
          <h5> updated: </h5>
          <p> {repo.updated_at} </p>
          </div>

          </div>
           )
        })}
      </div>
    )
  } else{
    return(
      <section className = 'card text-center' style={{position:'relative'}} >
    <img src={Spinner_gif} alt="loading..." style={{position: 'relative', top: '10%', left: 'auto', width: '10%', height: '10%', objectFit: 'contain'}}></img>
    </section>
    )
  }
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  fontSize: 'calc(0.4rem + 1vmin)',
  border: '1px white solid',
  background: 'black',
  color: 'white',
  alignItems: 'center'
};


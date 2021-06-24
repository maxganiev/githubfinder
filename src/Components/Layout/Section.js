import {Users} from './Users';
import Spinner_gif from '../Imgs/spinner.gif';
import React, {useContext} from 'react';
import {githubContext} from '../../context/github/githubContext';
import {FetchErr} from './FetchErr';

//because users prop is a list, it is being handled as a JS element; also, each root element of a list has to have a key
export const Section = ()=>{
  const GithubContext = useContext(githubContext);

  const { loading, getLogin, users, fetchErrStyle, fetchErrContent } = GithubContext;


  if(loading === false){
    if(users.length === 0){
      return <FetchErr style = {fetchErrStyle} content = {fetchErrContent} />
    } else {
    return(
      <section className = 'card text-center' style={sectionStyle} >
        {users.map((user)=>{
           return (
          <div style = {testStyle} key = {user.id}>
          <Users user = {user} getLogin = {getLogin}  />
          </div>
           )
        })}
      </section>
    )
      }
  }
  else{
    return(
      <section className = 'card text-center' style={{position:'relative'}} >
    <img src={Spinner_gif} alt="loading..." style={{position: 'relative', top: '10%', left: 'auto', width: '10%', height: '10%', objectFit: 'contain'}}></img>
    </section>
    )
  }
};


const sectionStyle = {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)'
};

const testStyle = {
  backgroundColor: '#edfaf1',
};




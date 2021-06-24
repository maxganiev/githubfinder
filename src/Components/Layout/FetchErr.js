import React, { useContext } from 'react';
import {githubContext} from '../../context/github/githubContext';

export const FetchErr = ()=>{
const GithubContext = useContext(githubContext);
const { fetchErrStyle, fetchErrContent } = GithubContext;

  return(
      <div style = {fetchErrStyle}>
        <p>{fetchErrContent}</p>
      </div>
  )
}


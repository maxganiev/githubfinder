import React, {useReducer, useEffect } from 'react';
import { githubContext } from './githubContext';
import { githubReducer } from './githubReducer';


//import types to be called inside a dispatcher:
import {  
  SEARCH_USERS,
  SET_LOADING,
  SET_FETCHERR_STYLE,
  SET_FETCHERR_CONTENT,
  HAS_USERS,
  GET_USER_DATA,
  GET_FOLLOWERS,
  HAS_FOLLOWERS,
  USER_REPOS,
  SEARCH_STRING,
  INCREMENT,
  DECREMENT
} from '../types';

//setting local var to hide API token:
let githubToken = process.env.REACT_APP_GITHUB_TOKEN;
// if (process.env.NODE_ENV !== 'production') {
//   githubToken = process.env.REACT_APP_GITHUB_TOKEN;
  
// } else {
//   githubToken = process.env.GITHUB_TOKEN;
// }

//setting up an initial state:
export const GithubState = (props)=>{
  const initialState = {
    users: [],
    loading: false,
    fetchErrStyle: {display: 'none'},
    fetchErrContent: '',
    hasUsers: false,
    user: {},
    followers: [],
    hasFollowers: false,
    repos: [],
    searchString: '',
    increment: 1,
    decrement: null
  };


  //inititalize the reducer to dispatch actions to our githubReducer:
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //increment in default state = 1, so when the page is first loaded, searchUsers fetches this param as 1; however, calling useEffect changes increment state to 2 when the page fist loaded, so next time we call this function, it will accept this param as 2 already
  useEffect(()=>{
    (async()=>{
      setIncrement(state.increment);
    })();
    // eslint-disable-next-line
  }, []);

  //functions (or actions); they need to be called if it is necessary to change a set-by-default state; otherwise a state will remain as initially set:

  //the function to remember query param to allow pagination (see SearchComponents, function fetchUsers (lines 38, 43)):
  const setSearchString = (arg)=> {
    dispatch({type: SEARCH_STRING, payload: arg});
  };

  //set arg for page increment:
  const setIncrement = (arg)=> dispatch({type: INCREMENT, payload: arg});

  //set arg for page decrement:
  const setDecrement = (arg)=> dispatch({type: DECREMENT, payload: arg});

  //searchUsers (the name calls for itself :) ):
  const searchUsers = async(searchQuery, increment)=>{
    // const regex = '^[A-Za-zа-яА-Яё0-9_-]*$';
   
    if(searchQuery.trim() !== '' && searchQuery !== null && searchQuery !== undefined){
    //while the request has not yet been sent
    setLoading();

    let query = searchQuery;
  
    
    if(searchQuery.indexOf(' ')!==-1){
      query = searchQuery.replace(/ /g, '%20')
    }
 
    setSearchString(query);

    const request = await fetch(`https://api.github.com/search/users?q=${query}&page=${increment}`, {
    method: 'GET',
    headers:{
    Authorization: `Basic ${githubToken}`
    }
    });

    if(request.status === 200){
      const data = await request.json();
      setUsers(data.items);
      setHasUsers(data.items.length);
  
      if(data.items.length === 0){
      setFetchErrStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'red'
      });
      setfetchErrContent('no users have been found');
      setHasUsers(data.items.length); 
      setIncrement(1);
      setDecrement(0);
      } else {
      setfetchErrContent('');
      setFetchErrStyle({display: 'none'})
      }
    } 
    else if(request.status === 422){
      document.getElementById('root').innerHTML = `Misspelling, check the input!`;
      //attempting to reload the page
      setTimeout(()=>{document.location.reload()},3000)
    }
    else{
      request.status === 403 ?
      document.getElementById('root').innerHTML = `
      <p> You seem to have exceeded the permitted amount of requests... Try again later </p>  `: (()=>{
        document.getElementById('root').innerHTML = `Poor connection, trying to reload...`;
           //attempting to reload the page
           setTimeout(()=>{document.location.reload()},3000)
      })();
    }
   } 
};


  //setLoading:
  const setLoading = ()=> dispatch({type: SET_LOADING});

  //setUsers:
  const setUsers =  (arr)=> dispatch({type: SEARCH_USERS, payload: arr});

   //setUser:
   const setUser =  (user)=> dispatch({type: GET_USER_DATA, payload: user});

    //setUsers:
  const setFollowers =  (arr)=> dispatch({type: GET_FOLLOWERS, payload: arr});

  //setHasUsers:
  const setHasUsers = (arr)=> dispatch({type: HAS_USERS, payload: arr > 0 ? true : false});

    //setFetchErrStyle:
  const setFetchErrStyle = (style)=> dispatch({type: SET_FETCHERR_STYLE, payload: style});

  //setfetchErrContent:
  const setfetchErrContent =(msg)=> dispatch({type: SET_FETCHERR_CONTENT, payload: msg});

  //get login:
  const getLogin = async(login)=>{
    if(typeof login !== undefined){
      setLoading();
      const request = await fetch(`https://api.github.com/users/${login}`, {
        method: 'GET',
        headers:{
        Authorization: `Basic ${githubToken}`
        }
      });
      
      if(request.status === 200){
      const response = await request.json();
      setUser(response);
      } else {
        request.status === 403 ?
        document.getElementById('root').innerHTML = `
        <p> You seem to have exceeded the permitted amount of requests... Try again later </p>  `:
        document.getElementById('root').innerHTML = `Poor connection...` 
      }
    }
  };

  //get followers:
  const getFollowers = async(login)=>{
    if(typeof login !== undefined){
      setLoading();
      const request = await fetch(`https://api.github.com/users/${login}/followers?per_page=30`, {
        method: 'GET',
        headers:{
        Authorization: `Basic ${githubToken}`
        }
      });
      
      
      
      if(request.status === 200){
      setLoading();
      const response = await request.json();

      if(response.length === 0){
      setFollowers([]);
      setHasFollowers(response.length);
      setFetchErrStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'red'
      });
      setfetchErrContent('no followers atm...');
      } else {
      setFollowers(response);
      setHasFollowers(response.length);
      setFetchErrStyle({display: 'none'});
      setfetchErrContent('');
      }


      } else {
        request.status === 403 ?
        document.getElementById('root').innerHTML = `
        <p> You seem to have exceeded the permitted amount of requests... Try again later </p>  `: (()=>{
          document.getElementById('root').innerHTML = `Poor connection, trying to reload...`;
             //attempting to reload the page
             setTimeout(()=>{document.location.reload()},3000)
        })();
      }

  }
};


  //checking if followers persist:
  const setHasFollowers = (arr)=> dispatch({type: HAS_FOLLOWERS, payload: arr > 0 ? true : false});

  //set repos:
  const setRepos = (arr)=> dispatch({type:USER_REPOS, payload: arr});

  //getting repos:
  const getRepos =  async (login)=>{
  
    setLoading();
    ////new request to get the list of reposes
     const request = await fetch(`https://api.github.com/users/${login}/repos?per_page=30`, {
      method: 'GET',
      headers:{
      Authorization: `Basic ${githubToken}`
      }
    });
     
     if(request.status === 200){
     setLoading();
     const response = await request.json();
     if(response.length === 0){
      setRepos([]);

      setFetchErrStyle({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
      });
 
      setfetchErrContent('the user has no repos atm...');
     } 
     
     else {
     setRepos(response);

     setFetchErrStyle({
       display: 'none'
     });

     setfetchErrContent('');
    }
     } 
     
     else {
      request.status === 403 ?
      document.getElementById('root').innerHTML = `
      <p> You seem to have exceeded the permitted amount of requests... Try again later </p>  `: (()=>{
        document.getElementById('root').innerHTML = `Poor connection, trying to reload...`;
           //attempting to reload the page
           setTimeout(()=>{document.location.reload()},3000)
      })();
     }
 }


  //dispatching the Provider; its prop (value) is now available per the app globally:
  return (
    <githubContext.Provider
    value = {{
      users: state.users,
      setUsers,
      searchUsers,
      loading: state.loading,
      fetchErrStyle: state.fetchErrStyle,
      fetchErrContent: state.fetchErrContent,
      hasUsers: state.hasUsers,
      setHasUsers,
      getLogin,
      user: state.user,
      setUser,
      followers: state.followers,
      getFollowers,
      hasFollowers: state.hasFollowers,
      setFollowers,
      repos: state.repos,
      getRepos,
      setRepos,
      searchString: state.searchString,
      setSearchString,
      increment: state.increment,
      decrement: state.decrement,
      setIncrement,
      setDecrement
    }}
    >
      {/**props.children means that a prop could be anything (in this case, a whole app is wrapped within a Provider), it's not an obligatory to set it up in advance (bit more material is here https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891) */}
      {props.children}
    </githubContext.Provider>
  )
};

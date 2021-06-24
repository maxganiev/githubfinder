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

//setting local var to hide API token:
// let githubToken;
// if (process.env.NODE_ENV !== 'production') {
//   githubToken = process.env.REACT_APP_GITHUB_TOKEN;
  
// } else {
//   githubToken = process.env.GITHUB_TOKEN;
// }


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
    const regex = '^[A-Za-zа-яА-Яё0-9_-]*$';
   
    if(searchQuery.trim() !== '' && searchQuery !== null && searchQuery !== undefined && searchQuery.match(regex)){
    //while the request has not yet been sent
    setLoading();

    let query = searchQuery;
  
    
    if(searchQuery.indexOf(' ')!==-1){
      query = searchQuery.replace(/ /g, '%20')
    }
 
    setSearchString(query)

    const request = await fetch(`https://api.github.com/search/users?q=${query}&page=${increment}`, {
      method: 'GET',
      headers:{
      Authorization: `Basic ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });

   if(request.status !== 200) {
        //these custom functions (or methods) have to be called if state is gonna be changed in this particular case (the value will be received via dispatch from the Reducer; otherwise no need to call it, and state will remain initially set)
        setFetchErrStyle( {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'red'
        });
        
        setfetchErrContent('server failure...');
        throw new Error('fetching problems has occured...');
   } else {
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
    } else {
      setfetchErrContent('');
      setFetchErrStyle({display: 'none'})
    }
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
        Authorization: `Basic ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      });
  
      const response = await request.json();
      setUser(response);
    }
  };

  //get followers:
  const getFollowers = async(login)=>{
    if(typeof login !== undefined){
      setLoading();
      const request = await fetch(`https://api.github.com/users/${login}/followers?per_page=30`, {
        method: 'GET',
        headers:{
        Authorization: `Basic ${process.env.REACT_APP_GITHUB_TOKEN}`
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
      setFetchErrStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'red'
      });
      setfetchErrContent('server failure...');
      setLoading();
      throw new Error('fetching problems has occured...');
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
     const request_repos = await fetch(`https://api.github.com/users/${login}/repos?per_page=30`, {
      method: 'GET',
      headers:{
      Authorization: `Basic ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });
     
     if(request_repos.status === 200){
     setLoading();
     const response_repos = await request_repos.json();
     if(response_repos.length === 0){
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
     setRepos(response_repos);

     setFetchErrStyle({
       display: 'none'
     });

     setfetchErrContent('');
    }
     } 
     
     else {
      setFetchErrStyle({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red'
      });
      setfetchErrContent('server failure...');
      setLoading();
      throw new Error('fetching problems has occured...');
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

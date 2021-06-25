import React, { useState, useContext } from "react";


//importing githubContext to be available here
import {githubContext} from '../../context/github/githubContext';


export const Search = ()=>{
  //initializing githubContext via new var; now props initialized in the Context value (searchUsers func and hasUsers bool) are available as its methods:
  const GithubContext = useContext(githubContext);

  const [searchQuery, setSearchQuery] = useState('');

  //event handlers: onChange handler is a must to update state of a form, otherwise we won't be able to enter a text into an input
  const onChange = (e)=> setSearchQuery(e.target.value);

  const keyCodes = ['AltLeft', 'AltRight', 'Tab', 'MetaLeft', 'PrintScreen', 'Insert', 'Delete', 'Backslash', 'Enter', 'ShiftRight', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ControlRight', 'ControlLeft', 'ShiftRight', 'ShiftLeft', 'CapsLock', 'Escape'];
  
  const onInput = (e) => {
  for(let i = 0; i < keyCodes.length; i++){
  if(keyCodes.includes(e.code)){
    return;
  } else {
  setSearchQuery(e.target.value);

  //passing input value as a query param:
  setTimeout(() => {
    GithubContext.searchUsers(searchQuery, GithubContext.increment);
  }, 300);
  break;
  }
  }

  if(searchQuery === ''){
    resetUsers();
  }
  };

  
  //the function to fetch users whie paginating:
  const fetchUsers = async(e)=>{
    if(e.target.className.includes('btn btn-dark btn-fetch ')){
      //first change
      //mind reverse iteration - it works faster (++x rather than x++)
      //as state updates asynchronouslly (which means if it is updated now, it will either be consumed by a Component's function with next render or has to be returned as prop in JSX), I am changing both increment and decrement simulteneously so as to have them ready in state for next fetch request/ render; obviously, decrement is always a step behind increment
      GithubContext.setIncrement(++GithubContext.increment);
      GithubContext.setDecrement(GithubContext.increment - 1);
      
      //here, as input value (that is actually  searchQuery param) gets empty when the current page left, I get its last value that was memorized in Context state when searchQuery had last been changed/ updated; to be able to paginate without losing already fetched/ rendered data, I am now passing context state value rather than input value:
      GithubContext.searchUsers(GithubContext.searchString, GithubContext.increment);
    } else if(e.target.className.includes('btn btn-light btn-fetch ')){
      //see explanations above
      GithubContext.setIncrement(--GithubContext.increment);
      GithubContext.setDecrement(GithubContext.increment-1);
      GithubContext.searchUsers(GithubContext.searchString, GithubContext.decrement);
    }
  };

  //the function to reset all states back to default:
  const resetUsers = ()=>{
  const {  setUsers, setHasUsers, setIncrement, setDecrement, setUser, setFollowers, setRepos, setSearchString } = GithubContext;

  setUsers([]);
  setHasUsers(false);
  setIncrement(1);
  setDecrement(0);
  setUser({});
  setFollowers([]);
  setRepos([]);
  setSearchString('');
  setSearchQuery('');
  }



  if(GithubContext.hasUsers === false){
  return(
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <input type="search" placeholder="Start typing to fetch users..." style={{width: '70%', height: '10%', margin: '3% auto'}} value={searchQuery} onChange = {onChange} onKeyUp = {onInput} autoFocus /> 
    </div>
  )
  } else if(GithubContext.hasUsers === true && GithubContext.increment <= 1) {
    return(
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <input type="search" placeholder="Start typing to fetch users..." style={{width: '70%', height: '10%', margin: '3% auto', flexDirection:'column', alignItems:'center', justifyContent:'center'}} value={searchQuery} onChange = {onChange} onKeyUp = {onInput} autoFocus />
      <button className = 'btn btn-dark btn-fetch ' style={{margin:'0 auto', width:'100%'}} onClick = {fetchUsers}> Get next users...</button>
      <button className = 'btn btn-clear ' style={{margin:'0 auto', width:'30%', color: 'black', backgroundColor: 'red' }} onClick = {resetUsers}> Reset users </button>
      </div>
    )
  }  else if(GithubContext.hasUsers === true && GithubContext.increment > 1) {
    return(
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <input type="search" placeholder="Start typing to fetch users..." style={{width: '70%', height: '10%', margin: '3% auto'}} value={searchQuery} onChange = {onChange} onKeyUp = {onInput} autoFocus  />
      <button className = 'btn btn-dark btn-fetch ' style={{margin:'0 auto', width:'100%'}} onClick = {fetchUsers}> Get next users...</button>
      <button className = 'btn btn-light btn-fetch ' style={{margin:'0 auto', width:'100%'}} onClick = {fetchUsers} > Get previous users...</button>
      <button className = 'btn btn-clear ' style={{margin:'auto', width:'30%', color: 'black', backgroundColor: 'red' }} onClick = {resetUsers}> Reset users </button>
      </div>
    )
  } else {
    return null;
  }
};


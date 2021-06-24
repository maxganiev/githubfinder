import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React from 'react';


export const Users = ({user})=>{

  const {login, avatar_url} = user;


  return (
    <div className= 'card text-center'>
      <img src = {avatar_url} alt = '' style = {{width: '10%', height: '10%'}}></img>
      <h4> {login} </h4>
      <Link to={`/user/${login}`} className="btn btn-dark btn-sm" > More </Link>
    </div>
  )
};

//with standard destructuring:
// export const Users = (props)=>{
// const {login, avatar, http_url} = this.props.user;
//   return (
//     <section className = 'card text-center'>
//       <img src = {avatar} alt = '' style = {{width: '10%', height: '10%'}}></img>
//       <h4> {login} </h4>
//       <a href={http_url}> <button className="btn btn-dark btn-sm">Click</button> </a>
//     </section>
//   )
// };

//type checking - means type Object is obligatory:
Users.propTypes = {
  user:PropTypes.object.isRequired,
  getLogin: PropTypes.func.isRequired
};

Users.defaultProps = {
  user: {
    id: 'id',
    login: 'no user atm',
    avatar_url: 'https://static.thenounproject.com/png/55393-200.png',
    html_url: '/'
    }
};


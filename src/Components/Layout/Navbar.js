import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Github_logo from '../Imgs/github-9-64.ico';

export const Navbar = ()=>{
  return (
    <nav className = "navbar" style={{position:'sticky', top:'0', left: '0', zIndex:'100000'}}>
      <ul >
      <ListItem content = 'GITHUB FINDER' isLink = {false} hasImage = {false}/>
      <ListItem  hasImage = {true}  isLink = {false}/>
      <ListItem link = '/' content = 'Home' isLink = {true} hasImage = {false} />
      <ListItem link = '/contacts' content = 'Contacts' isLink = {true} hasImage = {false} />
      </ul>
    </nav>
  )
};

const ListItem = ({content, link, isLink, hasImage})=>{
  //old way of doing destructuring:
  // const {content} = props;
    if(isLink && !hasImage){
    return (
    <li> <Link to={link}>{content}</Link></li> 
    )
    } else if(!isLink && !hasImage) {
    return (
      <li> <h2> {content} </h2> </li> 
      )
    } else if(!isLink && hasImage) {
      return (
        <li>  <img src = {Github_logo} alt = 'Github logo...'  /> </li> 
        )
      }
};




  //default props to be shown by default if an actual props are omitted; overriden by actual props when provided
  ListItem.defaultProps = {
    content : 'some default data',
    link : '/',
    isLink: PropTypes.bool.isRequired,
    hasImage: PropTypes.bool.isRequired
  };

  //type checking (unlike in typeScript, DOM is rendered but a mistake in the console will persist)
  ListItem.propTypes = {
    content: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  };






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

//the reducer to change initially set state values when called via functions containing dispatchers (see GithubState.js):
export  const githubReducer = (state, action)=>{
  switch(action.type){
    //default state:
    default: return state;

    case SET_LOADING:
      return {
        //...state - whatever default state is
        ...state,
        loading: true
      }

      case SEARCH_USERS:
        return {
          ...state,
          //payload: means whatever data is being transfered via certain action
          users: action.payload,
          loading: false
        }

        case SET_FETCHERR_STYLE:
          return {
            ...state,
            fetchErrStyle: action.payload
          }

          case SET_FETCHERR_CONTENT:
            return {
              ...state,
              fetchErrContent: action.payload
            }

            case HAS_USERS:
              return {
                ...state,
                hasUsers: action.payload
              }

                case GET_USER_DATA:
                  return {
                    ...state,
                    user: action.payload,
                    loading: false
                  }

                  case HAS_FOLLOWERS:
                    return {
                      ...state,
                      hasFollowers: action.payload
                    }

                    case GET_FOLLOWERS:
                      return {
                        ...state,
                        followers: action.payload,
                        loading: false
                      }

                      case USER_REPOS:
                        return {
                          ...state,
                          repos: action.payload,
                          loading: false
                        }

                        case SEARCH_STRING:
                          return {
                            ...state,
                            searchString: action.payload
                          }

                          case INCREMENT:
                            return {
                              ...state,
                              increment: action.payload
                            }

                            case DECREMENT:
                              return {
                                ...state,
                                decrement: action.payload
                              }

  }
}
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
} from '../types';
//this recievs the data from the dispatch, updates the data and sends down to any component that needs it
export default (state, action) =>{
    switch(action.type) {
        case SEARCH_USERS:
            return{
                ...state,
                //users gets filled with the payload from our API request in GithubState dispatch
                users: action.payload,
                loading: false,
            }
            case GET_USER:
                return{
                    ...state,
                    user: action.payload,
                    loading: false,
                }
                case GET_REPOS:
                return{
                    ...state,
                    repos: action.payload,
                    loading: false,
                }
            case CLEAR_USERS:
                return{
                    ...state,
                    users: [],
                    loading: false,
                }
        case SET_LOADING:
            return{
                //the 3 dots takes whatever value is already in the state
                ...state,
                loading: true,
            }
        default:
            return state;
    }
}
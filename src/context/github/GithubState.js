import React, {useReducer} from 'react';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
} from '../types';

//set the intial states
const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

//initialize the dispatch, this sends the state up to the reducer
const [state, dispatch] = useReducer(githubReducer, initialState);

//Search Users
const searchUsers = (text) =>{
    setLoading();
    
    fetch(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
        // old way with useState hook 
        // setUsers(data.items);

        dispatch({ 
            type: SEARCH_USERS,
            //we are passing the API data so we need a payload
            payload: data.items
        })
    });
  }

//Get User
const getUser = (username) => {
    setLoading();
    
    fetch(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // old way with useState hook   
      // setUser(data);
      dispatch({
          type: GET_USER,
          payload: data,
      })
    });
  }

//Get Repos 
const getUserRepos = (username) => {
    setLoading();
    
    fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc$client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
    //old way with useState hook
    //   setRepos(data);
    dispatch({
        type: GET_REPOS,
        payload: data,
    }) 
    });
  }

//Clear Users
const clearUsers = () => {
    //old way with useState hook
    // setUsers([]);

    dispatch({type: CLEAR_USERS})
  }

//Set Loading function
const setLoading = () => dispatch({ type: SET_LOADING });

//Provider makes these states & actions available to all componenets in app
return (<githubContext.Provider
value={{
    users: state.users,
    user: state.user,
    repos: state.repos,
    loading: state.loading,
    searchUsers,
    clearUsers,
    getUser,
    getUserRepos,
}}
>
{props.children}

</githubContext.Provider>
);

}

export default GithubState;
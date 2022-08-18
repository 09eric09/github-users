import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';
import {Link} from 'react-router-dom';

 const User = ({match}) => {
     //Initialize Context
    const githubContext = useContext(GithubContext);
    //destructure the context
    const { loading, user, getUser, getUserRepos, repos } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
    }, [])

    const { 
        name,
        avatar_url, 
        location,
        bio,
        blog,
        company,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
        } = user;

    if (loading) return <Spinner/>

    return (

    <>
        <Link to='/' className='btn btn-light'> 
            Back To Search
        </Link>
        Hireable: {' '}
        {hireable ? <i className="fas fa-check text-success"></i> 
        : <i className="fas fa-times-circle text-danger"></i> }

        <div className="card grid-2">
            <div className="all-center">
                <img src={avatar_url} className="round-img" alt="" style={{width: '150px'}}/>
                <h1>{name}</h1>
                <p>Location: {location}</p>
            </div>
            <div>
                {bio && 
                <Fragment> 
                    <h3>Bio</h3>
                    <p>{bio}</p>
                    </Fragment>   
                    }
                    <a href={html_url} className="btn btn-dark my-1" >Visit Github Profile</a>
                    <ul>
                        <li>
                        {login && 
                        <Fragment>
                            <strong>Login: {login}</strong>
                    </Fragment>
                        }
                        </li>

                        <li>
                        {company && 
                        <Fragment>
                            <strong>Company: {company}</strong>
                    </Fragment>
                        }
                        </li>

                        <li>
                        {blog && 
                        <Fragment>
                            <strong> Website: {blog}</strong>
                    </Fragment>
                        }
                        </li>
                    </ul>

            </div>
        </div>

    <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Folling: {following}</div>
        <div className="badge badge-danger">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
    </div>

    <Repos repos={repos} />

    </>   
    )
}

// User.propTypes = {
//     loading: PropTypes.bool,
//     user: PropTypes.object.isRequired,
//     repos: PropTypes.array.isRequired,
//     getUser: PropTypes.func.isRequired,
//     getUserRepos: PropTypes.func.isRequired,
// }

export default User;

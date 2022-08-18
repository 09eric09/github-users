import React from 'react'
import RepoItem from './RepoItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'


 const Repos = ({repos, loading}) => {

    if (loading) {
        return <Spinner/>
    } else {
        return (
        <div>
            {repos && repos.map(repo => (
                <RepoItem repo={repo} key={repo.id}/>
            ))}
        </div>
        );
    }

}

Repos.propTypes = {
    repos: PropTypes.array.isRequired,
}

export default Repos;

import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';


 const Users = () => {
    //Initialize the github context 
    const githubContext = useContext(GithubContext);
    //Destructure the context
    const { loading, users } = githubContext;

    if (loading) {
        return <Spinner/>
    } else {
        return (
        <div style={userStyle}>
            {users && users.map(user => (
                <UserItem key={user.id} userprop={user}/>
            ))}
        </div>
        );
    }

}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gridGap: '1rem',
}

export default Users;

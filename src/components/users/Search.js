import React, {useState, useContext} from 'react'
import GithubContext from '../../context/github/githubContext';
import Users from './Users';

const Search = ({ setAlert })=> {
    //we have to intialize the githubContext with useContext hook first!
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');
    const onChange = (e) => setText(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please Enter Something', 'light');
        }else {
            //Old way of doing it with useState and props
            // searchUsers(text);

            //New way with useContext
            githubContext.searchUsers(text);
            setText('');
        }
    }
        return (
            <div>
            <form onSubmit={onSubmit} className="from">
                <input onChange={onChange} type="text" name="text" placeholder="Search Users" value={text}/>
                <input type="submit" value="search" className="btn btn-dark btn-block" />
                {githubContext.users.length > 0 && 
                <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>
                }
            </form>
            </div>
        )  
}

// we don't need these proptypes anymore with context
// Search.propTypes = {
//     searchUsers: PropTypes.func.isRequired,
//     clearUsers: PropTypes.func.isRequired,
//     showClear: PropTypes.bool.isRequired,
//     setAlert: PropTypes.func.isRequired,
// }

export default Search;

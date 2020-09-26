import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserDelete extends Component {
    render() {
        const local = JSON.parse(localStorage.getItem('users_delete'));
        
        return (
            <>
                <div className='box__view'>
                    <span><Link to='/'>Voltar</Link></span>
                    <ul>
                       {local.map(data => (
                           <li
                            key={data.id}
                            style={{
                                marginTop: 5
                            }}
                           >{data.login}</li>
                       ))}
                    </ul>
                </div>
            </>
        );
    }
}

export default UserDelete;
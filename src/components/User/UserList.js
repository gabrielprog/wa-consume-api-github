import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserList extends Component {
    render() {
        return (
            <>
                <div className='box__userView'>
                    <img src={this.props.avatar_url} alt='avatar_url'/>
                    <span>UserID: {this.props.user_id}</span>
                    <span>NodeID: {this.props.node_id}</span>
                    <span>Login: {this.props.login}</span>
                    <span>Followers:
                         <Link to={this.props.followers}>
                            &nbsp;Seguidores
                        </Link>
                    </span>
                    <span>Following: 
                        <Link to={this.props.followings}>
                            &nbsp;Seguindo
                        </Link>
                    </span>

                    <a 
                    href={"https://github.com/" + this.props.login}
                    target='_black'>
                        <button>
                            Abrir github
                        </button></a>
                    <button 
                    onClick={this.props.onDelete}>
                        Deleta Usúario
                    </button>
                </div>
            </>
        );
    }
}

export default UserList;
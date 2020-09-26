import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import UserList from '../User/UserList';

import api from '../../services/api';

class UserSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user_id: [],
            loading: true
        }
    }

    async handleGetUsers(url_user) {
    
        const data = await api.get(`/users/${url_user}`);

        this.setState({
            users: data.data,
            loading: false
        });
    }

    async componentDidMount() {
        const params = this.props.match.params;
        await this.handleGetUsers(encodeURIComponent(params.url_user))
    }

    handleDeleteElement(event) {
        this.setState({
            users: this.state.users.filter(
                users => users !== event
            )
        });
    }


    render(){
        return ( 
        <>
            <div className='box__view'>
            <span><Link to='/'>Voltar</Link></span>
                <UserList 
                avatar_url={this.state.users.avatar_url}
                user_id={this.state.users.id}
                node_id={this.state.users.node_id}
                login={this.state.users.login}
                followers={`/followers/${encodeURIComponent(this.state.users.followers_url)}`}
                followings={`/followings/${encodeURIComponent(this.state.users.following_url)}`}
                
                />
            </div>
        </>
        );
    }  
}

export default UserSearch;
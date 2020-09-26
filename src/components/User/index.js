import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './User.css';

import api from '../../services/api';

import UserList from './UserList';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            users_delete: [],
            loading: true,
            fiel_search: '',
            user_id: ''
        }
    }

    async handleGetUsers() {
        
        const data = await api.get(`/users`,
        {
            params: {
                per_page: 10
            }
        });

        this.setState({
            users: data.data,
            loading: false
        });
    }


    async componentDidMount() {
        await this.handleGetUsers();       
    }

    componentDidUpdate(_, prevState) {
        if(prevState.fiel_search !== this.state.fiel_search){
            this.searchUser(this.state.fiel_search);
        }
    }

    componentWillUnmount() {
        localStorage.setItem('users_delete', JSON.stringify(this.state.users_delete));
    }

    handleDeleteElement(event) {
        this.setState({
            users_delete: [...this.state.users_delete, event]
        });
        this.setState({
            users: this.state.users.filter(
                users => users !== event
            )
        });
    }

    handleInputChange = (event) => {
        this.setState({
            fiel_search: event.target.value
        });
    }

    searchUser(field) {
        try {
            const {login} = this.state.users.find(
                element => 
                (
                    (
                        element.id == field 
                        ||
                        element.login == field
                        ) ?  element.id
                : null));
            this.setState({
                user_id: String(login)
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {   
        if(this.state.loading) {
            return <div className='loading'>CARREGANDO...</div>
        }
        
        return (
            <>
            <div className='box__view'>
                
                <input
                type='text'
                placeholder='Pesquisa'
                onChange={this.handleInputChange}
                />
                <Link to=
                {`/user/${this.state.user_id.length !== 0 ? this.state.user_id : null}`}>
                    <button>
                        Pesquisa usúarios
                    </button>
                </Link>

                <Link 
                    to='/delete'
                >
                <button>
                        Ver Usúarios Deletados
                </button></Link>
    
                {this
                .state
                .users
                .map(user => (
                    
                    <UserList 
                    avatar_url={user.avatar_url}
                    user_id={user.id}
                    node_id={user.node_id}
                    login={user.login}
                    followers={`/followers/${encodeURIComponent(user.followers_url)}`}
                    followings={`/followings/${encodeURIComponent(user.following_url)}`}
                    onDelete={() => this.handleDeleteElement(user)}
                    />
                ))}
            </div>
            </>
        );
    }
}

export default User;
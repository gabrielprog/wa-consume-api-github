import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import api from '../../services/api';


class Follower extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            followers: [],
            loading: true
        }
    }
    async handleGetFollwers(followers_url) {  
        
        const data = await api.get(followers_url);

        const followerNumber = String(Number(
            data
            .headers
            .link
            .split('page=')[2]
            .slice(0, 3)
            .replace('>','')
            .replace(';', ''))
            * Number(data.data.length));

        this.setState({
            followers: [...this.state.followers, followerNumber],
            loading: false
        });
    }

    async componentDidMount() {
        const params = this.props.match.params;
        await this.handleGetFollwers(decodeURIComponent(params.url_followers));
    }

    render() {
        if(this.state.loading) {
            return <div className='loading'>CARREGANDO...</div>
        }

        return (
            <>
            <div className='box__view'>
                <span><Link to='/'>Voltar</Link></span>
                <span style={
                    {
                        marginTop: 5
                    }
                }>TOTAL SEGUIDORES: {
                    this.state.followers
                }</span>
            </div>
            </>
          )
    }
}

export default Follower;
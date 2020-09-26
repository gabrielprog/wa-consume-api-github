import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import api from '../../services/api';

class Following extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        followings: [],
        loading: true
    }
  }

  async handleGetFollowing(following_url) {

    const data = await api.get(
        following_url.replace('{/other_user}','')
        );

    const followingNumber =
    data.headers.link ? 
    Number(
        data
        .headers
        .link
        .split('page=')[2]
        .split(' rel="last"')[0]
        .replace('>','')
        .replace(';', ''))
        * Number(data.data.length) : data.data.length;
    
    this.setState({
        followings: [...this.state.followings, followingNumber],
        loading: false
    });
  }

  async componentDidMount() {
    const params = this.props.match.params;
    await this.handleGetFollowing(decodeURIComponent(params.url_followings));
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
                }>TOTAL SEGUINDO: {
                    this.state.followings
                }</span>
      </div>
      </>
    )
  }
}

export default Following;
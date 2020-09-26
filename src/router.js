import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './styles/App.css';
import './styles/Box.css';
import './styles/Loading.css';

import User from './components/User/';
import Follower from './components/Follower/';
import Following from './components/Following/';
import Delete from './components/UserDelete/';
import UserSearch from './components/UserSearch/';

export default function Routes() {
    return (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={User} />
            <Route path='/followers/:url_followers' component={Follower} />
            <Route path='/followings/:url_followings' component={Following} />
            <Route path='/user/:url_user' component={UserSearch} />
            <Route path='/delete' component={Delete} />
        </Switch>
    </BrowserRouter>
    );
}
import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUserInfo, clearUserInfo} from '../../redux/reducer'
import './Nav.css'

class Nav extends Component {
    componentDidMount() {
        this.getExistingSession()
    }

    getExistingSession  = () => {
        axios.get('/auth/me')
            .then(res => this.props.updateUserInfo(res.data))
    }

    logout = () => {
        axios.post('/auth/logout')
            .then(res => this.props.clearUserInfo())
    }

    render() {
        return (
            <div className='nav-container'>
                <div>
                    <img src={this.props.profileImg} alt='Avatar' />
                    <span>{this.props.username}</span>
                </div>
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/new'><button>New Post</button></Link>
                <Link to='/'><button>Logout</button></Link>
            </div>
        )
    }
}

const checkout = state => ({
    // id: state.id,
    username: state.username,
    profileImg: state.profileImg
})

export default connect(checkout, {updateUserInfo, clearUserInfo})(Nav)
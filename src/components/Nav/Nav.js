import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Nav.css'

class Nav extends Component {
    render() {
        return (
            <div className='nav-container'>
                <div>
                    <img src={this.props.profileImg} alt='Avatar' />
                    <span>{this.props.username}</span>
                </div>
                <Link to='/'><button>Home</button></Link>
                <Link to='/new'><button>New Post</button></Link>
                <Link to='/auth'><button>Logout</button></Link>
            </div>
        )
    }
}

const checkout = state => ({
    id: state.id,
    username: state.username,
    profileImg: state.profileImg
})

export default connect(checkout)(Nav)
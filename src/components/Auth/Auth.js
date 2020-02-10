import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserInfo} from '../../redux/reducer'

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = () => {
        const newUser = {username: this.state.username, password: this.state.password}
        axios.post('/auth/register', newUser)
            .then(res => {
                console.log(res)
                this.props.updateUserInfo(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    login = () => {
        const loginCreds = {username: this.state.username, password: this.state.password}
        axios.post('/auth/login', loginCreds)
            .then(res => {
                this.props.updateUserInfo(res.data)
                this.props.history.push('/dashboard')
            })
    }

    render() {
        return (
            <div>
                <input name='username' placeholder='Username' onChange={this.handleChange} value={this.state.username} />
                <input type='password' name='password' placeholder='Password' onChange={this.handleChange} value={this.state.password} />
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

export default connect(undefined, {updateUserInfo})(withRouter(Auth))
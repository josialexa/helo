import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import defaultImg from '../../no_image.jpg'
import './Form.css'

class Form extends Component {
    constructor() {
        super()

        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = () => {
        const {title, img, content} = this.state
        const newPost = {
            author: this.props.id,
            title,
            img,
            content
        }

        axios.post('/api/posts', newPost)
            .then(res => {
                this.props.history.push('/dashboard')
            })
    }

    render() {
        return (
            <div className='form-container'>
                <h1>New Post</h1>
                <label htmlFor='title'>Title:</label>
                <input name='title' value={this.state.title} onChange={this.handleChange} />
                <img src={this.state.img || defaultImg} className='form-post-img' alt='Upload Preview' />
                <label htmlFor='img'>Image URL:</label>
                <input name='img' value={this.state.img} onChange={this.handleChange} />
                <label htmlFor='content'>Content:</label>
                <textarea name='content' value={this.state.content} onChange={this.handleChange} />
                <button className='form-button' onClick={this.submit}>Post</button>
            </div>
        )
    }
}

const checkout = state => ({
    id: state.id
})

export default connect(checkout)(Form)
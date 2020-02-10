import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './Post.css'

class Post extends Component {
    constructor() {
        super()

        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        axios.get(`/api/post/${this.props.match.params.postid}`)
            .then(res => {
                console.log('post', res.data)
                this.setState({post: res.data})
            })
    }

    delete = id => {
        axios.delete(`/api/posts/${this.state.post.id}`)
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div className='post-container'>
                <div className='post-header'>
                    <span>{this.state.post.title}</span>
                    <div>
                        <span>by {this.state.post.author}</span>
                        <img src={this.state.post.profile_img} alt='Avatar' />
                    </div>
                </div>
                <div className='post-content-container'>
                    <div className='post-content-image' style={{backgroundImage: `url(${this.state.post.img})`}} alt='Post Content'></div>
                    {/* <img src={this.state.post.img} alt='post content' /> */}
                    <p>{this.state.post.content}</p>
                </div>
                <div>
                    {this.props.id == this.state.post.user_id ? 
                        <button className='post-delete-post-button' onClick={this.delete}>Delete Post</button> 
                    : 
                        null}
                </div>
            </div>
        )
    }
}

const checkout = state => ({
    id: state.id
})

export default connect(checkout)(Post)
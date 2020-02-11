import React, { Component } from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export default class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            search: '',
            myPosts: true,
            posts: [
        //         {
        //             title: 'test',
        //             author: 'testUser',
        //             profileImg: 'https://robohash.org/testUser'
        //         },
        //         {
        //             title: 'my dog',
        //             author: 'josi',
        //             profileImg: 'https://robohash.org/josi'
        //         }
            ]
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts = (searchTerm = this.state.search) => {
        axios.get(`/api/posts?myPosts=${this.state.myPosts}&search=${searchTerm}`)
            .then(res => this.setState({posts: res.data}))
    }

    handleChange = e => {
        e.target.name == 'myPosts' ?
            this.setState({
                myPosts: !this.state.myPosts
            })   
        :
            this.setState({
                [e.target.name]: e.target.value
            })
    }

    search = () => {
        this.getPosts()
        this.clearSearch()
    }

    resetSearch = () => {
        this.getPosts('')
        this.clearSearch()
    }

    clearSearch = () => {
        this.setState({
            search: '',
            myPosts: true
        })
    }

    render() {
        return (
            <div className='dashboard-container'>
                <input 
                    name='search' 
                    placeholder='Search by title' 
                    value={this.state.search} 
                    onChange={this.handleChange} />
                <button onClick={this.search}>Search</button>
                <button onClick={this.resetSearch}>Reset</button>
                <label htmlFor='myPosts'>My Posts</label>
                <input 
                    type='checkbox' 
                    name='myPosts'
                    checked={this.state.myPosts}
                    onChange={this.handleChange} />
                <div>
                    {this.state.posts.map(v => {
                        return (
                            <Link key={v.id} to={`/post/${v.id}`}>
                                    <div>
                                    <h1>{v.title}</h1>
                                    <div>
                                        <span>by {v.author}</span>
                                        <img src={v.profile_img} alt='Avatar' />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

// const checkout = state => ({
//     id: state.id
// })

// export default connect(checkout)(Dashboard)
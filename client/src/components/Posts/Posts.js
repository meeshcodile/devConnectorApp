import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import PostForm from './postForm'
import Spinner from '../common/Spinner'
import {getPost} from '../../actions/postAction'
import PostFeed from './postFeed'

class Posts extends Component {
    componentDidMount(){
        this.props.getPost()
    }
    render() {
        const {posts, loading} = this.props.post
        let postContent

        if(posts===null || loading){
            postContent =<Spinner/>
        }else{
            postContent = <PostFeed posts={posts}/>
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />  
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Posts.propTypes ={
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    post:state.post
})

export default connect(mapStateToProps, { getPost})(Posts)
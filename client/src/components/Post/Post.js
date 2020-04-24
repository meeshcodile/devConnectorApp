import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import {getCommentPost} from '../../actions/postAction'
import PostItem from '../Posts/postItem'
import {Link} from 'react-router-dom'
import CommentForm from './comment'

class Post extends Component {
    componentDidMount(){
        this.props.getCommentPost(this.props.match.params.id)
    }
    render() {
        const{post,loading} = this.props.post
        let postContent

        if(post === null || loading || Object.keys(post).length === 0){
            postContent =<Spinner/>
        }else{
            postContent =(
                <div>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                </div>
            )
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back To Post Feed
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Post.propTypes ={
    getCommentPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    post:state.post
})

export default connect(mapStateToProps,{getCommentPost})(Post)

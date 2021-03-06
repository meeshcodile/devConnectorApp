import React, { Component } from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {deletePost, likePost, unLikePost} from '../../actions/postAction'

class PostItem extends Component {

    onDeleteClick(id){
        // console.log(id)
        this.props.deletePost(id)
    }

    onLikeClick(id){
        // console.log(id)
        this.props.likePost(id)
    }

    onUnlikeClick(id){
        // console.log(id)
        this.props.unLikePost(id)
    }

    findUserLike (likes){
        const {auth} = this.props
        if(likes.filter(like => like.user === auth.user.id).length > 0){
            return true
        }else{
            return false
        }
    }

    render() {
        const {post, auth, showActions} = this.props
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={post.avatar}
                                alt="" />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {showActions ? (<span>
                            <button type="button" onClick={this.onLikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                                <i className={classnames("fas fa-thumbs-up", {
                                    'text-info': this.findUserLike(post.likes)
                                })}></i>
                                <span className="badge badge-light">{post.likes.length}</span>
                            </button>
                            <button type="button" onClick={this.onUnlikeClick.bind(this, post._id)} className="btn btn-light mr-1">
                                <i className="text-secondary fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                Comments
                         </Link>
                            {post.user === auth.user.id ? (
                                <button type="button" onClick={this.onDeleteClick.bind(this, post._id)} className="btn btn-danger mr-1">
                                    <i className="fas fa-times"></i>
                                </button>) : null}
                        </span>) : null}
            
                </div>
                </div>
            </div>
        )
    }
}

PostItem.defaultProps ={
    showActions:true
}

PostItem.propTypes ={
    likePost:PropTypes.func.isRequired,
    unLikePost: PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth
})

export default connect(mapStateToProps,{deletePost, likePost,unLikePost})(PostItem)
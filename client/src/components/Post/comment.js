import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaGroup from '../common/textareaGroup'
import { addComment } from '../../actions/postAction'

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors })
        }
    }

    onSubmit(e) {
        e.preventDefault()
        // console.log('hello text')
        const { user } = this.props.auth
        const { postId } = this.props

        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addComment(postId,newComment)
        this.setState({ text: '' })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { errors } = this.state

        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Make Comment...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <TextAreaGroup
                                placeholder="reply a post"
                                name="text"
                                value={this.state.text}
                                onChange={this.onChange}
                                error={errors.text}
                            />
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
Comment.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,

})

export default connect(mapStateToProps, { addComment })(Comment)
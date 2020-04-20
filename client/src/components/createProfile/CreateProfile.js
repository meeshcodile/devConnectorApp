import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/textFieldGroup'
import InputGroup from '../common/inputGroup'
import SelectListGroup from '../common/selectListGroup'
import TextareaGroup from '../common/textareaGroup'


class CreateProfile extends Component {
    constructor(props){
        super(props)
       this.state ={
            displaySocialInputs:false,
           handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            errors:{}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    onSubmit(e){
        e.preventDefault()
        console.log('submitted')
    }
    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        const { errors, displaySocialInputs } = this.state

        let socialInputs
        if(displaySocialInputs){
            socialInputs=(
                <div>
                    <InputGroup
                        placeholder="twitter profile"
                        name="twitter"
                        icon="fab fa-twitter"
                        onChange={this.onChange}
                        error={errors.handle}
                        value={this.state.twitter}
                    />
                    <InputGroup
                        placeholder="youtube profile"
                        name="youtube"
                        icon="fab fa-youtube"
                        onChange={this.onChange}
                        error={errors.handle}
                        value={this.state.youtube}
                    />
                    <InputGroup
                        placeholder="facebook profile"
                        name="facebook"
                        icon="fab fa-facebook"
                        onChange={this.onChange}
                        error={errors.handle}
                        value={this.state.facebook}
                    />
                    <InputGroup
                        placeholder="linkedin profile"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        onChange={this.onChange}
                        error={errors.handle}
                        value={this.state.linkedin}
                    />
                    <InputGroup
                        placeholder="instagram profile"
                        name="instagram"
                        icon="fab fa-instagram"
                        onChange={this.onChange}
                        error={errors.handle}
                        value={this.state.instagram}
                    />
                </div>
            )
        }
        // select options for the status
        const options =[
            {label:'* select your professional status', value:0},
            {label:'Teacher', value:'Teacher'},
            { label: 'Engineer', value: 'Engineer' }, 
            { label: 'Developer', value: 'Developer' }

        ]
        return (
            
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="dispaly-4 text-center">create your profile</h1>
                            <p className="lead text-center">Let get some information to make your profile complete</p>
                            <small className="d-block pb-3 ">* required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="profile handle"
                                    name="name"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL, might be your fullname comapany name or nickname"
                                />
                                <SelectListGroup
                                    placeholder="status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    options={options}
                                    info="A unique handle for your profile URL, might be your fullname comapany name or nickname"
                                />
                                <TextFieldGroup
                                    placeholder="company"
                                    name="company"
                                    value={this.state.campany}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="your company name"
                                />
                                <TextFieldGroup
                                    placeholder="website"
                                    name="website"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL, might be your fullname comapany name or nickname"
                                />
                                <TextFieldGroup
                                    placeholder="skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="your skills"
                                />
                                <TextFieldGroup
                                    placeholder="Github username"
                                    name="githubusername"
                                    value={this.state.githunusername}
                                    onChange={this.onChange}
                                    error={errors.githunusername}
                                    info="yor github user name"
                                />
                                
                                <TextareaGroup
                                    placeholder="Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="A short story about yourself"
                                />
                                <div className="mb-3">
                                    <button onClick={()=>{
                                        this.setState(prevState =>({
                                            displaySocialInputs:!prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-light">Add your social Network links</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                    {socialInputs}
                                    <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

CreateProfile.propTypes ={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps =state =>({
    profile:state.profile,
    errors:state.errors
})

export default connect(mapStateToProps,{CreateProfile})(CreateProfile)
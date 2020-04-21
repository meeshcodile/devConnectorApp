import React, { Component } from 'react'
import PropTypes from 'prop-types'
import{connect} from 'react-redux'
import{getCurrentProfile, deleteAccount} from '../../actions/profileAction'
import Spinner from '../common/Spinner'
import {Link} from 'react-router-dom'
import ProfileActions from './profileActions'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteAccount(e){
      this.props.deleteAccount()
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              <Link to={`/profile/${profile.handle}`}>
                {" "}
                welcome {user.name}
              </Link>
            </p>
            <ProfileActions />

            {/* delete account button */}
            <div style={{ marginBottom: "60px" }}>
              <div
                onClick={this.onDeleteAccount.bind(this)}
                className="btn btn-danger"
              >
                Delete My Account
              </div>
            </div>
          </div>
        );
      } else {
        // user is loggedin but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">welcome {user.name}</p>
            <p>you will have to create a profile </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dasboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dasboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserProfileTopContent from "../../components/userProfile/UserProfileTopContent";
import UserAbout from "../../components/userProfile/UserAbout";
import {userActions} from "../../actions";

class AboutPage extends Component{

    componentWillMount() {
        const {userId} = this.props;
        if(userId) {
            this.props.dispatch(userActions.getById(userId));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            const {userId} = nextProps;
            if(userId) {
                this.props.dispatch(userActions.getById(userId));
            }
        }
    }

    handleUploadCoverPhoto = (file) => {
        const {userId} = this.props;
        this.props.dispatch(userActions.updateCoverPhoto(userId, file))
    }

    handleUploadProfilePicture = (file) => {
        const {userId} = this.props;
        this.props.dispatch(userActions.updateProfilePicture(userId, file))
    }

    render(){
        const {user} = this.props
        return(
            <div>
                <div className="container">
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="col-sm-12">
                                <UserProfileTopContent user={user} currentLink="about"
                                                       onUploadProfilePicture={this.handleUploadProfilePicture}
                                                       onUploadCoverPhoto={this.handleUploadCoverPhoto}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <UserAbout user={user}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId
    const {user} = state.users
    return{
        userId,
        user
    }
}

export default withRouter(connect(mapStateToProps, null)(AboutPage));
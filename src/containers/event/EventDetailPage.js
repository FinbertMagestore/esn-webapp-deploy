import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import '../../components/class/class.css'
import EventLeftmenu from "../../components/event/EventLeftmenu";
import EventTopContent from "../../components/event/EventTopContent";
import UserProfileInfo from "../../components/commons/views/UserProfileInfo";
import {classActions, eventActions} from "../../actions";
import {appUtils, fileUtils, userUtils} from "../../utils";
import PageNotFound from "../../components/commons/PageNotFound";

class EventDetailPage extends Component {
    componentWillMount() {
        const {eventId} = this.props;
        this.props.dispatch(eventActions.getById(eventId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.eventId !== this.props.eventId) {
            const {eventId} = nextProps;
            this.props.dispatch(eventActions.getById(eventId));
        }
    }

    render() {
        const {eventDetail, eventId, currentUser, loading} = this.props
        return (
            <div className="container">
                {
                    (eventDetail && eventDetail.id) ?
                        <div>
                            <div className="col-sm-2">
                                <div className="row">
                                    <EventLeftmenu currentPage="eventDetail" eventDetailTitle={eventDetail.title}/>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="row">
                                    <div className="event-main-content clearfix">
                                        <EventTopContent eventDetail={eventDetail} currentUser={currentUser}/>
                                        <div className="ui-box has-border-radius event-description clearfix">
                                            <div className="ui-box-title">
                                                <span>Details</span>
                                            </div>
                                            <div className="ui-box-content">
                                                {eventDetail.content}
                                            </div>
                                        </div>
                                        {
                                            eventDetail.userCreate ?
                                                (
                                                    <div className="ui-box has-border-radius event-about-user clearfix">
                                                        <div className="ui-box-title">
                                                            <span>About {userUtils.renderFullName(eventDetail.userCreate.firstName, eventDetail.userCreate.lastName)}</span>
                                                        </div>
                                                        <div className="ui-box-content clearfix">
                                                            <div className="user-profile-picture img-circle">
                                                                <img className="img-circle"
                                                                     src={eventDetail.userCreate && userUtils.renderProfileImageOfUser(eventDetail.userCreate.id)}/>
                                                            </div>
                                                            <div className="user-detail">
                                                                <UserProfileInfo user={eventDetail.userCreate}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <PageNotFound loading={loading}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const eventId = ownProps.match.params.eventId
    const {eventDetail} = state.events
    const {currentUser} = state.authentication
    var loading = appUtils.checkLoading(state)
    return {
        eventId,
        eventDetail,
        currentUser,
        loading
    }
}

export default withRouter(connect(mapStateToProps, null)(EventDetailPage));
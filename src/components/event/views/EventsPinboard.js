import React, {Component} from 'react'
import EventProfileInfo from "../../commons/views/EventProfileInfo";
import '../event.css'
import {dateUtils, fileUtils} from "../../../utils";
import {defaultConstants} from "../../../constants";

class EventsPinboard extends Component {

    renderEventDetail = (event, index) => {
        return (
            <div key={index} className="col-sm-3">
                <div className="event-pinboard clearfix">
                    <div className="event-photo">
                        <img
                            src={fileUtils.renderFileSource(event.eventImageID, defaultConstants.EVENT_PROFILE_PICTURE_URL)}/>
                    </div>
                    <div className="event-detail">
                        <div className="event-name">
                            <EventProfileInfo event={event}/>
                        </div>
                        <div className="event-location">
                            <i className="fa fa-map-marker"></i>
                            {event.location}
                        </div>
                        <div className="event-start">
                            <i className="fa fa-calendar"></i>
                            <b>
                                {dateUtils.convertISOToLocaleString(event.startTime)}
                                <span role="presentation" aria-hidden="true"> - </span>
                                {dateUtils.convertISOToLocaleString(event.endTime)}
                            </b>
                        </div>
                    </div>
                    {/*<div className="action-with-event dropdown">*/}
                        {/*<button type="button" data-toggle="dropdown" className="btn btn-white dropdown-toggle">*/}
                            {/*<i className="fa fa-share"></i>*/}
                            {/*<span className="share-text">Share</span>*/}
                            {/*<i className="fa fa-caret-down"></i>*/}
                        {/*</button>*/}
                        {/*<ul role="menu" className="dropdown-menu">*/}
                            {/*<li><a href="javascript:;">Invite Friends</a></li>*/}
                            {/*<li><a href="javascript:;">Share in message</a></li>*/}
                            {/*<li><a href="javascript:;">Share in new feed</a></li>*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }

    render() {
        const {events} = this.props
        return (
            <div className="events-content clearfix">
                {
                    (events && events.length > 0) ?
                        (
                            events.map((event, index) => this.renderEventDetail(event, index))
                        )
                        :
                        (
                            <div className="no-event">
                                No Events
                            </div>
                        )
                }
            </div>
        )
    }
}

export default EventsPinboard;
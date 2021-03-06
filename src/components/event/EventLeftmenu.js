import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import CreateEventModal from "./views/CreateEventModal";
import {eventActions} from "../../actions";
import {connect} from "react-redux";
import {dateUtils} from "../../utils";
import {eventConstants} from "../../constants";

class EventLeftmenu extends Component{
    constructor(props) {
        super(props)
        this.state = {modalIsOpen: false}
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    renderClassNameCurrentPage(currentPage, currentLink){
        if(currentPage == currentLink){
            return "events-headline-content current";
        }
        return "events-headline-content";
    }

    handleCreateEvent = (imageUpload, title, location, content, start, end, frequencyValue, frequencies) => {
        this.setState({modalIsOpen: false});
        const {currentUser} = this.props
        if(frequencyValue == eventConstants.FREQUENCY.ONCE){
            this.props.dispatch(eventActions.insert(null, currentUser.id, imageUpload, title, location,
                content, dateUtils.convertDateTimeToISO(start), dateUtils.convertDateTimeToISO(end)));
        } else {
            var periods = dateUtils.convertFrequencyInfoToEventTimes(frequencyValue, frequencies)
            // console.log(periods)
            var eventStartRequest = {}, eventEndRequest = {}
            if(frequencyValue == eventConstants.FREQUENCY.DAILY){
                eventStartRequest = frequencies.daily.startDate
                eventEndRequest = frequencies.daily.endDate
            } else if(frequencyValue == eventConstants.FREQUENCY.WEEKLY){
                eventStartRequest = frequencies.weekly.startDate
                eventEndRequest = frequencies.weekly.endDate
            }
            this.props.dispatch(eventActions.insertMulti(null, currentUser.id, imageUpload, title, location, content,
                dateUtils.convertDateTimeToISO(eventStartRequest), dateUtils.convertDateTimeToISO(eventEndRequest), periods));
        }
    }

    render(){
        const {currentPage, eventDetailTitle} = this.props

        return(
            <div className="events-left-menu">
                <CreateEventModal closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}
                                  onSubmit={this.handleCreateEvent}/>
                <div className="col-sm-12">
                    <div className="row">
                        <h2 className="title">
                            <i className="fa fa-calendar"></i>
                            <span>Events</span>
                        </h2>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="events-headline">
                            <Link to={`/events`}>
                                <div className={this.renderClassNameCurrentPage(currentPage, "events")}>
                                    <span>Events</span>
                                </div>
                            </Link>
                            {
                                eventDetailTitle ?
                                    (
                                        <div className={this.renderClassNameCurrentPage(currentPage, "eventDetail")}>
                                            <span className="event-detail">{eventDetailTitle}</span>
                                        </div>
                                    ) : ''
                            }
                            <Link to={`/events/calendar`}>
                                <div className={this.renderClassNameCurrentPage(currentPage, "calendar")}>
                                    <span>Calendar</span>
                                </div>
                            </Link>
                            <Link to={`/events/discovery`}>
                                <div className={this.renderClassNameCurrentPage(currentPage, "discovery")}>
                                    <span>Discover</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <a href="#" className="btn btn-white" onClick={this.openModal}>
                        <i className="fa fa-plus"></i>
                        Create event
                    </a>
                    {/*<a href="#" className="btn btn-white hidden-xs hidden-sm hidden-md">*/}
                        {/*<i className="fa fa-plus"></i>*/}
                        {/*Import event*/}
                    {/*</a>*/}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {currentUser} = state.authentication;
    return {
        currentUser,
    };
}


export default connect(mapStateToProps)(EventLeftmenu);
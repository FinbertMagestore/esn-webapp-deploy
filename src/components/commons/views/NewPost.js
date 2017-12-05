import React, {Component} from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import PostCreateAnnouncement from "./PostCreateAnnouncement";
import PostCreateAssignment from "./PostCreateAssignment";
import PostAddAttachment from "./PostAddAttachment";
import NewPostFooter from "./NewPostFooter";
import CreateEventModal from "../../event/views/CreateEventModal";

class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        const {classDetail, isTeacher} = this.props
        return (
            <div className="new-post">
                <div className="new-post-headline">
                    <Tabs>
                        <TabList>
                            <Tab>
                                <div className="new-post-headline-content">
                                    <i className="fa fa-edit"></i>
                                    Create announcement
                                </div>
                            </Tab>
                            {
                                isTeacher &&
                                (
                                    <Tab>
                                        <div className="new-post-headline-content">
                                            <i className="fa fa-tasks"></i>
                                            Create assignment
                                        </div>
                                    </Tab>
                                )
                            }
                            {/*<Tab>*/}
                                {/*<div className="new-post-headline-content">*/}
                                    {/*<i className="fa fa-question-circle"></i>*/}
                                    {/*Create question*/}
                                {/*</div>*/}
                            {/*</Tab>*/}
                            <Tab disabled={true}>
                                <div className="new-post-headline-content dropdown">
                                    <button data-toggle="dropdown" className="btn btn-white dropdown-toggle"
                                            type="button">
                                        <span className="fa fa-ellipsis-h"></span>
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul role="menu" className="dropdown-menu pull-right-xs">
                                        <li>
                                            <a href="javascript:;" onClick={this.openModal}>
                                                <i className="fa fa-calendar"></i>
                                                Create event
                                            </a>
                                            <CreateEventModal classDetail={classDetail} modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal}/>
                                        </li>
                                    </ul>
                                </div>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <PostCreateAnnouncement/>
                        </TabPanel>
                        {
                            isTeacher &&
                            (
                                <TabPanel>
                                    <PostCreateAssignment/>
                                </TabPanel>
                            )
                        }
                        {/*<TabPanel>*/}
                            {/*<h2>Any content 3</h2>*/}
                        {/*</TabPanel>*/}
                        <TabPanel>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default NewPost;
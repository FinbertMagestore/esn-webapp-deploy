import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ClassLeftmenu from "../../components/class/ClassLeftmenu";
import '../../components/class/class.css'
import ClassFiles from "../../components/class/ClassFiles";
import {classActions} from "../../actions";

class ClassFilePage extends Component{

    componentWillMount() {
        const {classId} = this.props;
        this.props.dispatch(classActions.getById(classId));
        this.props.dispatch(classActions.getTopics(classId));
        this.props.dispatch(classActions.getFiles(classId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.classId !== this.props.classId) {
            const {classId} = nextProps;
            this.props.dispatch(classActions.getById(classId));
            this.props.dispatch(classActions.getTopics(classId));
            this.props.dispatch(classActions.getFiles(classId));
        }
    }

    handleUploadFile = (classId, file) => {
        const {currentUser} = this.props
        this.props.dispatch(classActions.uploadFile(classId, file, currentUser.id))
    }

    handleDeleteFile = (fileId) => {
        const {classId} = this.props;
        this.props.dispatch(classActions.deleteFile(fileId))
    }

    render(){
        const {classDetail, classId, topics, files} = this.props
        return(
            <div>
                <div className="container">
                    <div className="col-sm-2">
                        <div className="row">
                            <ClassLeftmenu classDetail={classDetail} topics={topics}
                                           classId={classId} currentPage="files"/>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="row">
                            <ClassFiles classId={classId} files={files} onUploadFile={this.handleUploadFile}
                                onDeleteFile={this.handleDeleteFile}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const classId = ownProps.match.params.classId
    const {classDetail, topics, files} = state.classes
    const {currentUser} = state.authentication
    return {
        topics,
        files,
        currentUser,
        classId,
        classDetail
    }
}

export default withRouter(connect(mapStateToProps, null)(ClassFilePage));
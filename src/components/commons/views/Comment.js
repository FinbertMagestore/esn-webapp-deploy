import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import UserProfileInfo from "./UserProfileInfo";
import ReactComment from "./ReactComment";
import NewComment from "./NewComment";
import {fileUtils} from "../../../utils";
import {defaultConstants} from "../../../constants";

class Comment extends Component {
    render() {
        const {comment, post} = this.props
        var favouritedComment = false, hasReply = false, showReactComment = false
        const user = {
            id: comment.userID, firstName: comment.firstName, lastName: comment.lastName
        }
        return (
            <div className="comment clearfix">
                <div className="comment-user-profile-picture">
                    <Link to={`/users/${user.id}`}>
                        <img className="img-circle"
                             src={fileUtils.renderFileSource(comment.profileImageID, defaultConstants.USER_PROFILE_PICTURE_URL)}></img>
                    </Link>
                </div>
                <div className="comment-content-info">
                    <div className="comment-user">
                        <UserProfileInfo user={user}/>
                    </div>
                    <div className="comment-content">
                        <span>{comment.content}</span>
                    </div>
                    <div className="comment-time">
                        <span>{comment.timeUpdate}</span>
                    </div>
                    {
                        showReactComment &&
                        <ReactComment comment={comment} favouritedComment={favouritedComment}/>
                    }
                    {
                        hasReply &&
                        <div className="reply-new-comment">
                            <NewComment post={post}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Comment
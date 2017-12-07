import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Post from "./Post";
import NewComment from "./views/NewComment";
import Comments from "./Comments";

class Feed extends Component {
    renderFeedDetail(postDetail, index, user, contextView) {
        return (
            <div key={index} className="feed-content has-border-radius">
                <Post post={postDetail} contextView={contextView} user={user}/>
                <div className="post-new-comment">
                    <NewComment post={postDetail} user={user} contextView={contextView}/>
                </div>
                <Comments comments={postDetail.comments} post={postDetail} user={user} contextView={contextView}/>
            </div>
        )
    }

    render() {
        const {feed, user, contextView} = this.props
        return (
            <div className="feed">
                {
                    (feed && feed.length > 0) ?
                        (
                            feed.map((postDetail, index) =>
                                this.renderFeedDetail(postDetail, index, user, contextView)
                            )
                        ) :
                        <div className="no-post">No post</div>
                }
            </div>
        )
    }
}

export default Feed;
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import database from '../../../firebase/firebase';
import { connect } from 'react-redux';
// import { CloudFunctionManager } from '../../functions/functions';

const GroupPosts = ({ groupId, posts, members, authUid }) => {
    const sortedPosts = Object.entries(posts).sort((a, b) => b[1].created_on - a[1].created_on);
    console.log("sortedPosts: ", sortedPosts);
    return (
        <div>
            { 
                typeof posts === 'object' ? 
                sortedPosts.map(([id, post]) => {
                    const { from, created_on, message, like_count, comment_count } = post;
                    const { photo_url, display_name, title } = members[from];
                    return (
                        <div key={id}>
                            <Link
                                to={`/profile/${from}`} 
                                style={{ textDecoration: "none" }}
                            >
                                <img src={photo_url || "/images/anonymous.png"} alt="member profile photo" width="80px" height="100px"/>
                            </Link>
                            <p> {display_name} </p>
                            <p> {title} </p>
                            <p> {message} </p>
                            <p> {moment(created_on.toDate().toISOString()).format('LLL')} </p>
                            <button onClick={ async () => {
                                console.log(new Date());
                                await database.collection("groups").doc(groupId).collection("likes").doc(authUid).set({
                                    created_on: new Date(),
                                    from: authUid
                                });
                                database.collection("groups").doc(groupId).update({
                                    like_count: database.FieldValue.increment(1)
                                })
                                // CloudFunctionManager.onPostLiked()
                            }}>
                                <img src="/images/icons/likeButton.svg" alt="Like Button" width="20px" height="20px"></img>
                            </button>
                            <span>
                                <p> {like_count} Likes </p> <p> ~ {comment_count} Comments </p>
                            </span>
                        </div>
                    )
                }) : 
                <p style={{ color: "red" }}> {posts} </p>
            }
        </div>
    )
}

GroupPosts.propTypes = {
    posts: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
    authUid: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    authUid: state.auth.user.uid
})

export default connect(mapStateToProps)(GroupPosts);


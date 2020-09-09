import React from 'react';
import moment from 'moment';
import { history } from '../../routers/AppRouter';
import PropTypes from 'prop-types';

export const GroupPosts = ({ posts, members }) => {
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
                        <div key={id} style={{ listStyle: "none" }}>
                            <li
                                onClick={ () => {
                                    // const user = await fetchUserDocument(from);
                                    history.push({
                                        pathname: `/profile/${from}`
                                        // state: { user }
                                    })
                               }}
                            >
                                <img src={photo_url || "/images/anonymous.png"} alt="member profile photo" width="80px" height="100px"/>
                            </li>
                            <p> {display_name} </p>
                            <p> {title} </p>
                            <p> {message} </p>
                            <p> {moment(created_on.toDate().toISOString()).format('LLL')} </p>
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
    posts: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired
};

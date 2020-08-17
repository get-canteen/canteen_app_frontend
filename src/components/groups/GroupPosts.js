import React from 'react';
import moment from 'moment';
import { history } from '../../routers/AppRouter';
import { fetchUserDocument } from '../../actions/user';

export const GroupPosts = ({ posts, members }) => (
    <div>
        { 
            typeof posts === 'object' ? 
            Object.entries(posts).map(([id, post]) => {
                const { from, created_on, message, like_count, comment_count } = post;
                const { photo_url, display_name, title } = members[from];
                return (
                    <div key={id} style={{ listStyle: "none" }}>
                        <li
                            onClick={ async () => {
                                const user = await fetchUserDocument(from);
                                history.push({
                                    pathname: `/profile/${from}`,
                                    state: { user }
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
                            <p> {like_count} </p> 
                            <p> ~ {comment_count} Comments </p>
                        </span>
                    </div>
                )
            }) : 
            <p style={{ color: "red" }}> {posts} </p>
        }
    </div>
)

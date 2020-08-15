import React from 'react';
import { history } from '../../routers/AppRouter';
import { fetchUserDocument } from '../../actions/user';

export const GroupPosts = ({ posts, members }) => (
    <div>
        { 
            typeof posts === 'object' ? 
            Object.entries(posts).map(([id, post]) => 
                <div key={id} style={{listStyle: "none"}}>
                    <li
                        onClick={ async () => {
                            const user = await fetchUserDocument(post.from);
                            history.push({
                                pathname: `/profile/${post.from}`,
                                state: { user }
                            })
                        }}
                    >
                        <img src={[members[post.from].photo_url || "/images/anonymous.png"]} alt="member profile photo" width="80px" height="100px"/>
                    </li>
                    <p> {[members[post.from].display_name]} </p>
                    <p> {[members[post.from].title]} </p>
                    <p> {post.message} </p>
                    <div>
                        <p> {post.like_count} </p>
                    </div>
                    <div>
                        <p> {post.comment_count} </p>
                    </div>
                </div>
            ) : 
            <p style={{color: "red"}}> {posts} </p>
        }
    </div>
)

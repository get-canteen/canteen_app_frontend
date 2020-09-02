import React from 'react';
import { history } from '../../routers/AppRouter';
// import { fetchUserDocument } from '../../actions/user';

export const GroupMembers = ({ members }) => (
    <div>
        {
            typeof members === 'object' ? 
            Object.entries(members).map(([id, member]) => 
                <div key={id} style={{listStyle: "none"}}>
                    <li
                        onClick={ () => {
                            // const user = await fetchUserDocument(id);
                            history.push({
                                pathname: `/${id}`
                                // state: { user }
                            })
                        }}
                    >
                        <img src={[member.photo_url || "/images/anonymous.png"]} alt="member profile photo" width="80px" height="100px"/>
                        <p> {member.display_name} </p>
                        <p> {member.title} </p>
                    </li>
                </div>
            ) : 
            <p style={{color: "red"}}> {members} </p>    
        }
    </div>
)

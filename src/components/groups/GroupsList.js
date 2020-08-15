import React from 'react';
import { Link } from 'react-router-dom';
import { fetchAllGroups } from '../../actions/groups';

class GroupsList extends React.Component {
    state = { 
        allGroups: {} 
    };
    async componentDidMount() {
        const allGroups = await fetchAllGroups();
        this.setState({ allGroups });
    }
    render() {
        return (
            <div>
                <h3> Groups List </h3>
                <input placeholder="Search Canteen"/>
                <div 
                    style={{ listStyle: "none" }}
                >
                    <h3> Popular Groups </h3>
                    {Object.entries(this.state.allGroups).map(([id, group]) => (
                        <Link
                            key={id}
                            to={{
                                pathname: `group/${id}`,
                                state: { group }
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <img src={[group.photo_url || "/images/anonymous.png"]} width="80px" height="80px"/>
                            <p> {group.name} </p>
                            <p> {group.type.charAt(0).toUpperCase() + group.type.slice(1) + " Group"} </p>
                            <p> {group.description} </p>
                            <p> {group.members + " members"} </p>
                        </Link>
                    ))}
                </div>
                <div>
                    <h3> Most Popular Users </h3>
                </div>
            </div>
        )
    }
}

export default GroupsList;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useState, useEffect } from "react-redux";
// import { fetchAllGroups } from '../../actions/groups';

// const GroupList = () => {
//     const [allGroups, setAllGroups] = useState({});

//     useEffect(async () => {
//         const data = await fetchAllGroups();
//         setAllGroups(data);
//     })

//     return (
//         <div>
//             <h3> Groups List </h3>
//                 <input placeholder="Search Canteen"/>
//                 <div 
//                     style={{ textDecoration: 'none' }}
//                 >
//                     <h3> Popular Groups </h3>
//                     {Object.entries(allGroups).map(([id, group]) => (
//                         <Link
//                             key={id}
//                             to={{
//                                 pathname: `group/${id}`,
//                                 state: { group }
//                             }}
//                             style={{ textDecoration: 'none' }}
//                         >
//                             <img src={[group.photo_url || "/images/anonymous.png"]} width="80px" height="80px"/>
//                             <p> {group.name} </p>
//                             <p> {group.type.charAt(0).toUpperCase() + group.type.slice(1) + " Group"} </p>
//                             <p> {group.description} </p>
//                             <p> {group.members + " members"} </p>
//                         </Link>
//                     ))}
//                 </div>
//                 <div>
//                     <h3> Most Popular Users </h3>
//                 </div>
//         </div>
//     )
// }

// export default GroupList;
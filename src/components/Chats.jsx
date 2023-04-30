import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import { auth } from '../firebase';
import axios from 'axios';

//components
import Navbar from './Navbar';
//context
import { AuthContext } from '../context/AuthContextProvider';
//styles
import styles from './Chats.module.css';

const Chats = () => {
    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext)
    const history = useHistory();

    useEffect(() => {
        if(!user) {
            history.push('/');
            return;
        }
        axios.get("https://api.chatengine.io/users/me", {
                headers: {
                    "project-id": "f6e739ee-bc59-4733-8b81-e6897e3541dd",
                    "user-name": user.email,
                    "user-secret": user.uid
                }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);
            getFile(user.photoURL)
            .then(avatar => {
                formdata.append('avatar', avatar , avatar.name)
                axios.post("https://api.chatengine.io/users/", formdata, {
                    headers: {
                        "private-key": "e1f563b3-9d78-4300-8bde-6de5e6f898fa"
                    }
                })
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
                })
        })
        }, [user, history])


        const getFile = async (url) => {
            const response = await fetch(url);
            const data = await response.blob();
            return new File([data], 'userPhoto/jpg', {type: 'image/jpeg'})
        }

    const logoutHandler = async () => {
        await auth.signOut();
        history.push('/');
    }
    if (!user || loading) return 'loading ... '
    return (
        <div className={styles.container} >
            <Navbar logoutHandler={logoutHandler} />
            <ChatEngine
            height = 'calc(100vh - 50px)'
            projectID = 'f6e739ee-bc59-4733-8b81-e6897e3541dd'
            userName =  {user.email}
            userSecret = {user.uid}
            />
        </div>
    );
};

export default Chats;



// import React, { useState, useEffect, useContext } from 'react';
// import { auth } from '../firebase';
// import { useHistory } from 'react-router-dom';
// import { ChatEngine } from "react-chat-engine";
// import axios from 'axios';

// // Components
// import Navbar from './Navbar';

// // Styles
// import styles from "./Chats.module.css"

// // Context
// import { AuthContext } from "../context/AuthContextProvider";

// const Chats = () => {

//     const [loading, setLoading] = useState(true);
//     const user = useContext(AuthContext);
//     const history = useHistory();

//     useEffect(() => {
//         if(!user) {
//             history.push("/");
//             return;
//         }

//         axios.get("https://api.chatengine.io/users/me", {
//             headers: {
//                 "project-id": "f6e739ee-bc59-4733-8b81-e6897e3541dd",
//                 "user-name": user.email,
//                 "user-secret": user.uid
//             }
//         })
//         .then(() => {
//             setLoading(false)
//         })
//         .catch(() => {
//             let formdata = new FormData();
//             formdata.append("email", user.email);
//             formdata.append("username", user.email);
//             formdata.append("secret", user.uid);
//             getFile(user.photoURL)
//                 .then(avatar => {
//                     formdata.append("avatar", avatar, avatar.name)
//                     axios.post("https://api.chatengine.io/users/", formdata, {
//                         headers: {
//                             "private-key": "e1f563b3-9d78-4300-8bde-6de5e6f898fa"
//                         }
//                     })
//                     .then(() => setLoading(false))
//                     .catch(error => console.log(error))
                    
//                 })
//         })

//     }, [user, history])

//     const getFile = async (url) => {
//         const response = await fetch(url);
//         const data = await response.blob();
//         return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
//     }

//     const logoutHandler = async () => {
//         await auth.signOut();
//         history.push("/")
//     }

//     if (!user || loading) return "Loading..."

//     return (
//         <div className={styles.container}>
//             <Navbar logoutHandler={logoutHandler} />

//             <ChatEngine
//                 height="calc(100vh - 50px)"
//                 projectID="f6e739ee-bc59-4733-8b81-e6897e3541dd"
//                 userName={user.email}
//                 userSecret={user.uid}
//             />
//         </div>
//     );
// };

// export default Chats;
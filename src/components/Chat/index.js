import { React, useEffect, useState } from 'react';
import './style.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import io from "socket.io-client";
let socket;
export default function Chat() {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const ENDPOINT = 'https://localhost:5000';


    useEffect(() => {
        socket = io(ENDPOINT);

        setName(localStorage.getItem("id"))

        socket.emit('join', { name }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(msgs => [...msgs, message]);
        });

        socket.on("roomData", ({ users }) => {
            // setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    return (

        <>
            <div className="chat-wrapper">
                <div className="infoBar">
                    <div className="leftInnerContainer">online
                        {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
                    </div>
                    <div className="rightInnerContainer">close
                        {/* <a href="/"><img src={closeIcon} alt="close icon" /></a> */}
                    </div>
                </div>
                <ScrollToBottom className="messages">
                    {/* {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)} */}
                    <div className="messageContainer justifyStart">
                        <div className="messageBox backgroundLight">
                            <p className="messageText colorDark">asd</p>
                        </div>
                        <p className="sentText pl-10">asd</p>
                    </div>

                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">OK</p>
                        </div>
                    </div>
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">OK</p>
                        </div>
                    </div>
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">OK</p>
                        </div>
                    </div>
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">OK</p>
                        </div>
                    </div>
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">asdasdasdasdas asdas asdsad asd asd a sadasdasdas adasd</p>
                        </div>
                    </div>
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">OK</p>
                        </div>
                    </div>
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">OK</p>
                        </div>
                    </div>
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">OK</p>
                        </div>
                    </div>
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">ADMIN</p>
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">OK</p>
                        </div>
                    </div>
                </ScrollToBottom>
                <form className="form">
                    <input
                        className="input"
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                    />
                    <button className="sendButton" onClick={(e) => sendMessage(e)}><div><i className="fa fa-paper-plane" /></div></button>
                </form>
            </div>
        </>
    )
}
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
let stompClient = null;

export const connect = (username, token, onConnected, onError) => {
    // A function that creates a new SockJS connection
    // const socketFactory = () => new SockJS(SOCKET_URL);

    const socketFactory = () => new SockJS(`${SOCKET_URL}?token=${token}`);

    stompClient = new Client({
        webSocketFactory: socketFactory,

        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },

        debug: function (str) {
            // console.log('STOMP: ' + str);
        },
        reconnectDelay: 5000,
        onConnect: () => onConnected(stompClient, username), // Pass the client instance on successful connection
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
            if (onError) onError();
        },
    });

    stompClient.activate();
};

export const disconnect = () => {
    if (stompClient) {
        stompClient.deactivate();
    }
};

export const sendCommunityMessage = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat.communityMessage",
            body: JSON.stringify(message),
        });
    } else {
        console.error('Cannot send message, STOMP client is not connected.');
    }
};

export const sendMessage = (message, destination = "/app/chat.sendMessage") => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: destination,
            body: JSON.stringify(message),
        });
    } else {
        console.error('Cannot send message, STOMP client is not connected.');
    }
};

export const addLikes = (post) => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: "/app/chat.addLikes",
            body: JSON.stringify(post),
        });
    }
}
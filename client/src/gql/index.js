const { gql } = require("apollo-boost");

export const QUERY_TOTAL_USER_COUNT = gql`
    {
        totalUserCount
    }
`;

export const QUERY_GET_USER_CHATS = gql`
    query getUserChats($userId: ID!) {
        userChats(userId: $userId) {
            id
            name
            users {
                username
            }
            messages {
                id
                body
                originator {
                    id
                    username
                }
                createdAt
            }
        }
    }
`;

export const QUERY_GET_CHAT = gql`
    query getChat($id: ID!) {
        chat(id: $id) {
            id
            name
            users {
                username
            }
            messages {
                id
                body
                originator {
                    id
                    username
                }
                createdAt
            }
        }
    }
`;

export const MUTATION_LOGIN_USER = gql`
    mutation thing($username: String!, $password: String!) {
        authenticateUser(username: $username, password: $password) {
            token
            user {
                id
                username
            }
        }
    }
`;

export const MUTATION_REGISTER_USER = gql`
    mutation register($username: String!, $password: String!) {
        registerUser(username: $username, password: $password) {
            id
            username
            createdAt
        }
    }
`;

export const MUTATION_CREATE_NEW_CHAT = gql`
    mutation createNewChat(
        $name: String
        $users: [String!]!
        $originatorUsername: String!
    ) {
        createChat(
            name: $name
            users: $users
            originatorUsername: $originatorUsername
        ) {
            id
            name
            createdAt
            users {
                username
            }
            createdBy {
                id
                username
            }
            messages {
                body
                createdAt
                originator {
                    username
                }
            }
        }
    }
`;

export const SUBSCRIPTION_NEW_MESSAGE = gql`
    subscription newChats($chatIds: [ID!]!) {
        newMessage(chatIds: $chatIds) {
            id
            chatId
            createdAt
            body
            originator {
                id
                username
            }
        }
    }
`;

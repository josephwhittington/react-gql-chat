const { gql } = require("apollo-boost");

export const QUERY_TOTAL_USER_COUNT = gql`
    {
        totalUserCount
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

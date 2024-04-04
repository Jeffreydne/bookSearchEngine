import { gql } from 'apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                email
                password
            }
        }
    }
`

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
                password
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $description: String!, $bookId: String!, $authors: [String], $image: String, $link: String) {
        addBook(title: $title, description: $description, bookId: $bookId, authors: $authors, image: $image, link: $link) {
            book {
                title
                description
                bookId
                authors
                image
                link
            }
        }
    }
`

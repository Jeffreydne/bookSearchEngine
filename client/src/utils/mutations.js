import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
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
    mutation Mutation($email: String!, $password: String!) {
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
    mutation Mutation($userId: ID!, $title: String!, $description: String!, $bookId: String!, $authors: [String], $image: String, $link: String) {
        addBook(userId: $userId, title: $title, description: $description, bookId: $bookId, authors: $authors, image: $image, link: $link) {
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`
export const REMOVE_BOOK = gql`
    mutation Mutation($book: String!) {
        removeBook(book: $book) {
            book {
                bookId
            }
        }
    }
`
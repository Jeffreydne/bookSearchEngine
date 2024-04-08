const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    } 
     
    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
    type Auth {
        user: User,
        token: ID!
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addBook(title: String!, description: String!, bookId: String!, authors: [String], image: String, link: String ): User
        removeBook(bookId: String!): User
    }
    `;
module.exports = typeDefs;
const typeDefs = `
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        books: [Book]
    } 
     
    type Book {
        _id: ID!
        authors: String
        description: String!
        bookID: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        me(_id: String): User
    }
`;
module.exports = typeDefs;
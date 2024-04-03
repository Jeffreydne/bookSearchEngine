const { Book, User } = require('../models');

const resolvers = {
    Query: {
        me: async (_, args) => {
            return User.find(_id);
        },

    },
    Mutation: {

    }
};
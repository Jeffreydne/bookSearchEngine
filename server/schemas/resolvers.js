const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, args, context) => {
            try {
                console.log("Quiery meeee")
                //get user._id from the jwt payload using the authMiddleware context which is passed into graphql server (line 24 of server.js). This retrieves the logged in user without searching the database
                return User.findOne({_id: context.user._id});
                
            } catch (error) {
                console.log("Error finding User: ", error)
            }
        },
    },
    Mutation: {
        createUser: async(_, args) => {
            try {
                console.log("Create User mutation!")
                console.log(args)
                const newUser = await User.create(args)
                console.log(newUser)
                const token = signToken(newUser)
                return {user: newUser, token}
                
            } catch (error) {
                console.log("Error creating User: ", error)
            }
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email});
            
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
        addBook: async(_, args, context) => {
            try {
                console.log("Adding BOOk Mutation!")
                const updatedUser = await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { savedBooks: args } },
                  { new: true, runValidators: true }
                );
                return updatedUser
              } catch (error) {
                console.log("Error adding a book: ", error);
              }
        }, 
        removeBook: async(parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { books: book } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    }
};

module.exports = resolvers
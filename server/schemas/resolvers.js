const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_, args, context) => {
            try {
                console.log("Quiery meeee")
                return User.findOne({_id: context.user._id});
                
            } catch (error) {
                
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
        addBook: async(_, args, context) => {
            try {
                console.log("Adding BOOk Mutation!")
                const updatedUser = await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { savedBooks: args } },
                  { new: true, runValidators: true }
                );
                return updatedUser
              } catch (err) {
                console.log(err);
              }
        }
    }
};

module.exports = resolvers
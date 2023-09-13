const mongoose = require('mongoose');


// User collection schema
const schema = new mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
    },
    {
        timestamps: true
    }
)

// Admin collection schema
const Adschema = new mongoose.Schema(
    {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
    }
)

// Export collection schemas
const Users = mongoose.model('Users', schema);
const admins = mongoose.model('admins', Adschema);

module.exports = admins
module.exports = Users
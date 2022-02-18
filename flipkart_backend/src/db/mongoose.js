const mongoose = require('mongoose');

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const db_connection_url = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.connect(db_connection_url, options)
    .then(() => { 
        console.log("Database connected successfully !") 
    }
    ).catch(err => { 
        console.log(err) 
    }
);
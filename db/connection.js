// import mongoose
const mongoose = require('mongoose');
// connection URI
//   service              port#        db name
const MONGODB_URI = 'mongodb://localhost:27017/' + 'hero';
// config params
const config = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false,
};
// connect to the URI
mongoose.connect(MONGODB_URI, config);
// connect to the DB connection
const db = mongoose.connection;
// additional connection messages
db.on('error', (err) => console.log(err.message + ' is mongod not running'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// export mongoose
module.exports = mongoose;
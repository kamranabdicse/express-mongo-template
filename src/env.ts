import bluebird from 'bluebird';
import config from './config';
import mongoose from "mongoose";

mongoose.Promise = bluebird;
mongoose.connect(config.mongoURI, {
    keepAlive: true,
    connectTimeoutMS: 3000
}).then(() => {
    console.log("Connected to mongodb");
}).catch(() => {
    console.log("Failed connecting to mongodb");
});

const mongodb = mongoose.connection;

export { mongodb };
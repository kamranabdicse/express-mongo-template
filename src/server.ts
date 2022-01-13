import config from './config';
import app from './app';
import { Server } from 'http';
let env = require('./env');


const server: Server = app.listen(config.port, () => {
    console.log(
        `${config.appTitle} is running at`,
        `${config.appURI} in ${app.get("env")} mode`,
    );
    console.log(`Press CTRL-C to stop\n`);
});






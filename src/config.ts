import nodeConfig from 'config';

interface Config{
    appTitle: string,
    appURI: string;
    port: string;
    mongoURI: string,
    jwtScecret : string,
    aesKey : string,
}

const config: Config = {
    appTitle: nodeConfig.get<string>("APP_TITLE"),
    appURI : nodeConfig.get<string>('APP_URI'),
    port: nodeConfig.get<string>('PORT'),
    mongoURI: nodeConfig.get<string>('MONGO_URI'),
    jwtScecret: nodeConfig.get<string>('JWT_SECRET'),
    aesKey: nodeConfig.get<string>('AES_KEY'),
};

export default config;
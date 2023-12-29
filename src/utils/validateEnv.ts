import { cleanEnv, port, str, url } from 'envalid';

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DB_URL: str(),
    SECRET_KEY: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    MAIL_HOST: str(),
    MAIL_PORT: port(),
    MAIL_FROM: str(),
    MAIL_USER: str(),
    MAIL_PASSWORD: str(),
    CLIENT_URL: url(),
    DO_SPACES_ENDPOINT: url(),
    DO_SPACES_KEY: str(),
    DO_SPACES_SECRET: str(),
    DO_SPACES_BUCKET: str(),
  });
};

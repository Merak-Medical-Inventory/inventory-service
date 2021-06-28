import * as dotenv from 'dotenv';
dotenv.config();
const result = dotenv.config({
    path: `./env/development.env`,
});

if (result.error) {
    throw result.error;
}

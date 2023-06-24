const dotenv = require('dotenv');
const dbConnect = require('./src/configs/database.config');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Server shuting down ...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

dbConnect();

const port = process.env.PORT || 8001;

const server = app.listen(port, () => {
    console.log(`Phonestore app running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTED! 💥 Server shuting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

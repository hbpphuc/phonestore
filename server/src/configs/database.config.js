const mongoose = require('mongoose');

const dbConnect = () => {
    const db = process.env.DATABASE.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
    );

    mongoose
        .connect(db)
        .then(() => console.log('DB connection successful!'))
        .catch((err) => console.log(''));
};

module.exports = dbConnect;

const Roll = require('../models/roll');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const rolls = require('../data/rolls')
//Setting dotenv file
dotenv.config({ path: 'backend/config/config.env'})

connectDatabase();

const seedRolls = async () => {
    try {
        await Roll.deleteMany();
        console.log('Rolls are deleted');

        await Roll.insertMany(rolls)
        console.log('All Rolls are added')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedRolls()
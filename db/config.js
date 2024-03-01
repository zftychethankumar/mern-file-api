const mongoose = require('mongoose');

const connectDb = async () => {
    if (process.env.MODE === "development"){
        await mongoose.connect(process.env.MONGODB_DEV)
        .then(res =>{
            console.log(`local mongodb connected`)
        }).catch(err=> console.log(err))
    }
    if (process.env.MODE === "production"){
        await mongoose.connect(process.env.MONGODB_URL)
        .then(res =>{
            console.log(`local mongodb connected`)
        }).catch(err=> console.log(err))
    }
}

module.exports = connectDb
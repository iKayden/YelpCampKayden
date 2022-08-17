const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62fb1d1151078e0f9cb8c7fa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet eius placeat sit labore, numquam corporis, repudiandae perferendis ipsum dolore voluptatem officia reiciendis quasi dignissimos mollitia nihil cumque officiis beatae illo!',
            price: randPrice
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
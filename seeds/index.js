const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log('MongoDb is connected');
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your User ID
            author: '62faa1bc0b78051c94144dbf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet eius placeat sit labore, numquam corporis, repudiandae perferendis ipsum dolore voluptatem officia reiciendis quasi dignissimos mollitia nihil cumque officiis beatae illo!',
            price: randPrice,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/kaydenukr/image/upload/v1660883214/YelpCamp/sybnpdtwavlrxizdmemx.jpg',
                    filename: 'YelpCamp/sybnpdtwavlrxizdmemx'
                },
                {
                    url: 'https://res.cloudinary.com/kaydenukr/image/upload/v1660937152/YelpCamp/v8xipdtzc87l2b3dowpq.jpg',
                    filename: 'YelpCamp/v8xipdtzc87l2b3dowpq'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
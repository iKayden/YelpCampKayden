const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log('MongoDb is connected');
};

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62fb1d1151078e0f9cb8c7fa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet eius placeat sit labore, numquam corporis, repudiandae perferendis ipsum dolore voluptatem officia reiciendis quasi dignissimos mollitia nihil cumque officiis beatae illo!',
            price: randPrice,
            geometry: {
                type: 'Point',
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/kaydenukr/image/upload/v1660867195/YelpCamp/pxzoqvmcbjlozxrvcqlk.jpg',
                    filename: 'YelpCamp/pxzoqvmcbjlozxrvcqlk'
                },
                {
                    url: 'https://res.cloudinary.com/kaydenukr/image/upload/v1660867195/YelpCamp/epa4uhabei4z5biiyd33.jpg',
                    filename: 'YelpCamp/epa4uhabei4z5biiyd33'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
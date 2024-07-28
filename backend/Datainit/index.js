const Listing = require("../models/listing.js")
const datafile=require("./data.js")
console.log(datafile);
//connection to DB
const mongoose = require('mongoose');
let url = 'mongodb://127.0.0.1:27017/TaseTrove';
async function main() {
    await mongoose.connect(url);
}
main()
    .then(() => console.log('Connected!'))
    .catch((err) => console.log("Connection unsuccessfull!"))

initData = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(datafile.data);
    console.log("Data has been initialized!")
}
initData();
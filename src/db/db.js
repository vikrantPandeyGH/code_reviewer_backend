import mongoose from "mongoose";

function connect() {
    mongoose.connect(process.env.MONGO_URI)
    .then(function() {
        console.log('Connected to MongoDB Atlas successfully');
    })
    .catch(err => {
        console.log(err);
    });
}

export default connect
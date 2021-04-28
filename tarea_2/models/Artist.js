import mongoose, { Schema } from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const TrackSchema = new mongoose.Schema({

  id: {
    type: String,
    cast: false,
    unique: true,
    index: true

    // maxlength: [20, '_id cannot be more than 60 characters'],
  },
  album_id: {
    type: String,
    required: [true],
    // maxlength: [20, 'username cannot be more than 60 characters'],
  },
  name: {
    type: String,
    required: [true],
    // maxlength: [20, 'username cannot be more than 60 characters'],
  },
  age: {
    type: Number,
    required: [true],
    // maxlength: [20, 'username cannot be more than 60 characters'],
  },
  albums: {
    /* The owner of this pet */
    type: String,
    // required: [true, "Please provide the pet owner's name"],
    // maxlength: [20, "Cannot be more than 60 characters"],
  },
  tracks: {


    type: String,
    // required: [true, 'Please specify the species of your pet.'],
    // maxlength: [30, 'Cannot be more than 40 characters'],
  },
  self: {


    type: String,
  },

},{collection:'artists',strict:true, versionKey:false})



export default mongoose.models.TrackSchema || mongoose.model('TrackSchema', TrackSchema)
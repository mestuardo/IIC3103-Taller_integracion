import mongoose, { Schema } from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const ArtistSchema = new mongoose.Schema({

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
  duration: {
    /* The owner of this pet */
    type: Number,
    // required: [true, "Please provide the pet owner's name"],
    // maxlength: [20, "Cannot be more than 60 characters"],
  },
  times_played: {


    type: Number,
    // required: [true, 'Please specify the species of your pet.'],
    // maxlength: [30, 'Cannot be more than 40 characters'],
  },
  artist: {


    type: String,
  },
  album: {


    type: String,
  },
  self: {


    type: String,
  },

},{collection:'tracks',strict:true, versionKey:false})



export default mongoose.models.ArtistSchema || mongoose.model('ArtistSchema', ArtistSchema)
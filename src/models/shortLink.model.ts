//@ts-nocheck
import mongoose from "mongoose";
require('mongoose-type-url');

const ShortLinkSchema = new mongoose.Schema({
  url: {
    type: String,
    lowercase: true,
    required: 'URL is required!',
  },
  destinationUrl: {
    type: mongoose.SchemaTypes.Url,
    lowercase: true,
    required: 'Destination URL is required!',
  },
  userName: {
    type: String,
    lowercase: true,
    required: 'UserName is required!'
  },
  description: {
    type: String
  },
  tags: [{
    type: String
  }]
}, { timestamps: true });


const ShortLink = mongoose.model("ShortLink", ShortLinkSchema);
module.exports = ShortLink;

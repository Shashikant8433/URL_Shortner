//@ts-nocheck
import express, { Request, Response } from "express";
const router = express.Router();
const ShortLink = require("../models/shortLink.model")

router.route("/")
  .get((async (req: Request, res: Response) => {
    try {
      let allShortLinks = await ShortLink.find({ userName: req?.oidc?.user?.email });
      if (req.query.q) {
        allShortLinks = allShortLinks.filter(shortLink => {
          return shortLink.url.includes(req.query.q) || shortLink.destinationUrl.includes(req.query.q) || (shortLink.tags && shortLink.tags.some(tag => tag.includes(req.query.q)))
        })
      }
      if(req.query.sortBy === "latest"){
        allShortLinks = allShortLinks.sort((a,b)=>{
          const x = a.createdAt.getTime();
          const y = b.createdAt.getTime();
          return x < y ? 1 : x > y ? -1 : 0;
        })
      }
      if(req.query.sortBy === "oldest"){
        allShortLinks = allShortLinks.sort((a,b)=>{
          const x = a.createdAt.getTime();
          const y = b.createdAt.getTime();
          return x < y ? -1 : x > y ? 1 : 0;
        })
      }
      if(req.query.sortBy === "aUrl"){
        allShortLinks = allShortLinks.sort((a,b)=>{
          const x = a.url.toLowerCase();
          const y = b.url.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0;
        })
      }
      if(req.query.sortBy === "zUrl"){
        allShortLinks = allShortLinks.sort((a,b)=>{
          const x = a.url.toLowerCase();
          const y = b.url.toLowerCase()
          return x < y ? 1 : x > y ? -1 : 0;
        })
      }
      if(req.query.sortBy === "aDesc"){
        allShortLinks = allShortLinks.sort((a,b)=>{
          const x = a.description.toLowerCase();
          const y = b.description.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0;
        })
      }
      if(req.query.sortBy === "zDesc"){
        allShortLinks = allShortLinks.sort((a,b)=>{
          const x = a.description.toLowerCase();
          const y = b.description.toLowerCase()
          return x < y ? 1 : x > y ? -1 : 0;
        })
      }
      if (allShortLinks.length) {
        res.json({ success: true, message: "All ShortLinks", allShortLinks, resultLength: allShortLinks.length });
      } else {
        res.json({ success: false, message: "ShortLink not found" })
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Something went wrong", error });
    }
  }))

module.exports = router;

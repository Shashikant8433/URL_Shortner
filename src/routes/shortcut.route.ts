//@ts-nocheck
import express, { Request, Response } from "express";
const router = express.Router();
const ShortLink = require("../models/shortLink.model")

router.route("/")
  .post(async (req: Request, res: Response) => {
    try {
      const sameShortLinkFoundWithUrl = await ShortLink.find({ url: req?.body.url, userName: req?.oidc?.user?.email });
      if (!sameShortLinkFoundWithUrl.length) {
        const newShortLink = await new ShortLink({
          url: req.body.url,
          destinationUrl: req.body.destinationUrl,
          userName: req?.oidc?.user?.email
        });
        const savedShortLink = await newShortLink.save();
        res.json({ success: true, message: "ShortLink created Successfully", savedShortLink });
      } else {
        res.json({ success: false, message: "Duplicate ShortLink is not allowed", sameShortLinkFoundWithUrl })
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Something went wrong", error });
    }
  })
router.route("/:url")
  .get(async (req: Request, res: Response) => {
    try {
      const shortLinkFoundWithUrl = await ShortLink.find({ url: req.params?.url, userName: req.oidc.user?.email });
      console.log(shortLinkFoundWithUrl, 'shortLinkFoundWithUrl')
      if (shortLinkFoundWithUrl.length) {
        res.json({ success: true, message: "ShortLink found Successfully", shortLinkFoundWithUrl });
      } else {
        res.json({ success: false, message: "ShortLink not found" })
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Something went wrong", error });
    }
  }).patch(async (req: Request, res: Response) => {
    try {
      const shortLinkFoundWithUrl = await ShortLink.find({ url: req.params?.url, userName: req.oidc.user?.email });
      console.log(shortLinkFoundWithUrl, 'shortLinkFoundWithUrl')
      if (shortLinkFoundWithUrl.length) {
        const updatedShortLink = await ShortLink.update({ url: req.params?.url, userName: req.oidc.user?.email }, {...shortLinkFoundWithUrl,...req.body})
        res.json({ success: true, message: "ShortLink Updated successfully", updatedShortLink })
      } else {
        res.json({success:false,message:"ShortLink not found"})
      }
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Something went wrong", error });
    }
  }).delete(async(req: Request, res:Response)=>{
    try{
      const deletedShortLink = await ShortLink.deleteOne({url: req.params.url, userName: req.oidc.user.email})
      res.send({success: true,message: "ShortLink deleted successfully",deletedShortLink})
    } catch (error){
      console.error(error);
      res.json({success: false, message: "Something went wrong", error})
    }
  })

module.exports = router;

// Here is a simple description of all: POST is always for creating a resource ( does not matter if it was duplicated ) PUT is for checking if resource exists then update, else create new resource. PATCH is always for updating a resource.
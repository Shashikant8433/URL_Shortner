//@ts-nocheck
import express, { Request, Response } from "express";
const router = express.Router();
const User = require("../models/user.model")
const ShortLink = require("../models/shortLink.model")

router.route("/")
    .get(async (req: Request, res: Response) => {
        try {
            const userFound = await User.find({ email: req?.oidc?.user?.email });
            console.log(userFound.length);
            if (!userFound.length) {
                const { email, email_verified } = req.oidc.user;
                const newUser = await new User({
                    email: email,
                    userName: email,
                    isEmailVerified: email_verified
                });
                const savedUser = await newUser.save();
                res.json({ success: true, message: "Any message home", newUser });
            } else {
                res.json({ success: true, user: userFound })
            }
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "Error doing something" });
        }
    })
router.route("/:url")
    .get(async (req, res) => {
        try {
            const { url } = req.params;
            if (url) {
                const shortLinkFound = await ShortLink.find({ url: url, useName: req?.oidc?.user?.email });
                if (shortLinkFound.length) {
                    console.log("redirecting", shortLinkFound)
                    res.redirect(shortLinkFound[0].destinationUrl)
                } else {
                    res.json({ success: false, message: "no link found" })
                }
            }
        } catch (error) {
            console.error(error);
            res.json({ success: false, message: "Something went wrong", error });
        }
    })

module.exports = router;

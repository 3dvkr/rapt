import { Router, Request, Response } from "express";
import passport from "passport";
import argon2id from "argon2";

import prisma from "../utils/db";

export const router = Router();

router.post("/sign-up", async (req: Request, res: Response) => {
	const { username, password, email } = req.body;
	try {
		const hashPassword = await argon2id.hash(password);
		const newUser = await prisma.user.create({
			data: {
				username,
				email: email || "test@email.com",
				password: hashPassword,
				defaultBreakTime: 10,
				isAutoSession: false,
			},
		});
		res.json({
			message: newUser.username,
		});
	} catch (err) {
		console.log(err);
		res.status(400).send("error");
	}
});

router.get("/login", (req: Request, res: Response) => {
	res.send("login page");
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/api",
		successRedirect: "/api/dashboard",
	})
);
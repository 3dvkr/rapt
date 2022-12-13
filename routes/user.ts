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

router.post("/login", (req, res, next) =>
	passport.authenticate("local", (err, user, options) => {
		if (err) {
			next(err);
		} else if (user) {
			req.login(user, (err) => {
				if (err) next(err)
				else res.json({message: "logged in"})
			})
		} else {
			res.status(400).json({ message: options?.message });
		}
	})(req, res, next)
);

router.post("/categories", async (req: Request, res: Response) => {
	const { username, category, color } = req.body;
	try {
		const user = await prisma.user.findFirst({
			where: {
				username,
			},
			select: {
				id: true,
			},
		});

		if (!user) {
			return res.json({ message: "no user found" });
		}
		await prisma.categoryType.create({
			data: {
				name: category,
				color,
				usernameId: user.id,
			},
		});
		res.send({ message: `${category} saved` });
	} catch (err) {
		console.log(err);
	}
});

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			console.log(err);
			res.status(400).send({ message: "error" });
		}
		res.status(200).send({ message: "logout" });
	});
});

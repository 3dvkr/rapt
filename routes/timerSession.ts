import { Router, Request, Response } from "express";

import prisma from "../utils/db";

export const router = Router();

router.get("/timers", async (req: Request, res: Response) => {
	console.log("Get Items: ", req.session, req.user);
	try {
		if (req.user) {
			const items = await prisma.timerSession.findMany({
				where: {
					// @ts-expect-error
					usernameId: req.user.id,
				},
			});
			console.log(items);
			res.send(items);
		} else {
			res.status(404).send({ message: "please log in" });
		}
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

router.post("/timers", async (req: Request, res: Response) => {
	console.log(req.session, req.user);
	const { username, memo, category, duration } = req.body;
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
		await prisma.timerSession.create({
			data: {
				duration,
				memo,
				startTime: new Date(),
				category,
				usernameId: user.id,
			},
		});
		res.send({ message: `${memo} saved` });
	} catch (err) {
		console.log(err);
	}
});

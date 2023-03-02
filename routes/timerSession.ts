import { Router, Request, Response } from "express";

import prisma from "../utils/db";

export const router = Router();

router.get("/timers", async (req: Request, res: Response) => {
	try {
		if (req.user && ('id' in req.user) && req.user.id) {
			const items = await prisma.timerSession.findMany({
				where: {
					usernameId: req.user?.id
				},
				select: {
					category: true, memo: true, duration: true, id: true
				}
			});
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
	const { username, memo, category, duration, startTime } = req.body;
	try {
		const user = await prisma.user.findUnique({
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
				startTime, 
				category,
				usernameId: user.id,
			},
		});
		res.send({ message: `${memo} saved` });
	} catch (err) {
		console.log(err);
	}
});

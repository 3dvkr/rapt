import express, { type Request, type Response } from "express";
import "dotenv";
import passport from "passport";
import cors from "cors";
import session from "express-session";
import path from "path";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import prisma from "./utils/db";

import { isLoggedIn } from "./utils/auth";
import { router as userRoutes } from "./routes/user";
import { router as timerRoutes } from "./routes/timerSession";
import { User } from "@prisma/client";

const app = express();

express.urlencoded({ extended: true });
app.use(express.json());
app.use(cors())

app.use(
	session({
		name: "session",
		secret: process.env.SECRET as string,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day expiration
			sameSite: "lax",
		},
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/get-user", (req: Request, res: Response) => {
	if (req.user) {
		return res.json({ data: (req.user as User).username });
	}
	return res.json(null);
});

app.use("/api", userRoutes, [isLoggedIn, timerRoutes]); // this needs to run after api/get-user because the logout button doesn't work on the front end



app.listen(4000, () => {
	console.log("fridge running, ", 4000);
});

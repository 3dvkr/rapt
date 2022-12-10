import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import "dotenv";
import passport from "passport";
import session from "express-session";

import argon2id from "argon2";

import prisma from "./utils/db";

import { isLoggedIn } from "./utils/auth";

const app = express();

express.urlencoded({ extended: true });
app.use(express.json());

app.use(
	session({
		name: "session",
		secret: process.env.SECRET as string,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day expiration
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req: Request, res: Response) => {
	res.json({ message: "home" });
});

app.post("/sign-up", async (req: Request, res: Response) => {
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
			}
		})
		res.json({
			message: newUser.username,
		});
	} catch (err) {
		res.status(400).send("error");
	}
});

app.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/api",
		successRedirect: "/api/dashboard",
	})
);

app.get("/api/dashboard", isLoggedIn, (req: Request, res: Response) => {
	res.json({ message: "access granted" });
});

app.listen(4000, () => {
	console.log("fridge running, ", 4000);
});

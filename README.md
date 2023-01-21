# Rapt

Live site: https://rapt.onrender.com/

## Motivation

Rapt is a full-stack time-tracker and pomodoro app, to address concerns of a neurodiverse focus group reporting that many productivity apps and systems were failing them.

The main objectives of this were the data modeling and visualization for tracking history and providing feedback to users.

The app is designed to let the user choose what 'type' of session they'd like to timebox (whether that's a work session or a break session), instead of locking users into a work-break-work-break pattern. It lets users annotate and save their sessions. The history view lets users see a graph of the activities they worked on sorted by duration.

## Technologies used

### Front end
- React 18
- React Router 6.4
- TanStack Query 4
- Zustand
- TypeScript
- Tailwind/ DaisyUI

### Back end
- Node/Express
- Postgres
- Prisma
- TypeScript
- Passport

## Getting Started

### Installation
1. Clone the repo
```
git clone https://github.com/3dvkr/rapt.git
```

2. Install NPM packages
```
npm install
cd client
npm install
```
3. Set up a PostgreSQL-as-a-service instance, e.g. on ElephantSQL or Railway. 

4. Fill in the values in the `.env.example` file, and rename it to `.env`. The database url is a string provided by the PostgreSQL service.

5. In the project's root, run Prisma Migrate to initialize the database with the schema defined in `prisma/prisma.schema`
```
npx prisma generate
npx prisma db push
```

6. Run `npm run dev` in the root for the server, and the `client` folder for the front end.

## Optimizations
- add data visualization to dashboard/summary
- refactor mobile/small screen UI
- add pagination for timer session logs
- add filtering functionality for reviewing logs
- create settings page to allow user experience customization

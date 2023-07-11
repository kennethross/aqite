# angular-nest

Simple web app template with Angular + NestJS + swagger + Angular Material.

## Key Elements

There is some variations... https://github.com/mugifly/angular-nest/wiki#variations

- Angular -- for Frontend app.
- NestJS -- for Backend app.
- Database -- Cloud Mongodb
- ORM - Prisma
- ng-openapi-gen -- for API Client generation.
- Angular Material -- for UI.
- Docker -- for Production environment.
- Jest -- for Unit testing of Backend
- Render -- Backend hosting -- [Docs](https://aqite.onrender.com/docs)
- Netlify - [Frontend hosting](https://64ac05fe12e06119fa0bb053--voluble-creponne-a6ac7d.netlify.app/) 


---

## Quick Start

### Frontend
```
$ cd frontend/

$ npm i

$ npm run start:dev
```

Finally, open the web browser and navigate to `http://localhost:4200/`.
Also, when you edit the frontend source-code, auto-reloading applies your changes to the browser immediately.

### Backend
- Create a .env file
```
$ cd backend/

$ npm i

$ npm generate // npx generate prisma

$npm run start:dev
```

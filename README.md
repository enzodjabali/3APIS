# 3APIS

Build:
``docker compose build``

Install npm packages: 
``docker compose run web npm install``

Start: 
``docker compose up``

Run tests: 
``docker compose run web npm test``

Regenerate api-docs:
``docker compose run web swagger-autogen``

App is accessible on ``127.0.0.1:3000``
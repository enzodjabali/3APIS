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
``docker compose run web node ./docs/swagger.js``

App is accessible on ``127.0.0.1:3000``

Swagger is accessible on ``127.0.0.1:3000/api-docs``

Mongo Express is accessible on ``127.0.0.1:8081``

Mongo Express creditentials:
<br>
User: ``admin``
<br>
Password: ``pass``

Authentify to the api:

1. Create a user account
<img src="https://media.discordapp.net/attachments/774340712585625603/1174284158126796820/image.png?ex=65670858&is=65549358&hm=c3adace45b2e172be9bd12a061579aaddaa65fe0856ff037b001edd0eb09df40&=&width=1127&height=270">

2. Log into the account
<img src="https://media.discordapp.net/attachments/774340712585625603/1174284808302624768/image.png?ex=656708f3&is=655493f3&hm=63903c337ca047c9b622ffc6a64520ee5d1ce3ba4d182c5519a9816bf8b43e6c&=&width=1127&height=485">

3. Pass the Authorization jwt token (example on a route)
<img src="https://media.discordapp.net/attachments/774340712585625603/1174285388525875250/image.png?ex=6567097d&is=6554947d&hm=26e76dbfda3686a6f468ee41d2d87e4a93dc66ffc4a53b66f397d6ff0e4544f5&=&width=1127&height=282">

(PS: For adding your JWT token as a variable in postman, go to 'View more actions' on your collection > 'Edit' > 'Variables')
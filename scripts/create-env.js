const fs = require('fs');


fs.writeFileSync('./.env', `API_KEY = ${process.env.API_KEY}\nAPI_KEYA = ${process.env.API_KEYA}`)
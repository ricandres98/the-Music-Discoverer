const fs = require('fs');


fs.writeFileSync('./.env', 
`API_KEY = ${process.env.API_KEY}
API_KEYA = ${process.env.API_KEYA}
API_KEYB = ${process.env.API_KEYB}`)
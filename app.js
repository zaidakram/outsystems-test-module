const express = require('express')
const app = express()
const port = 8000

app.get('/version', (req, res) => {
  res.send('1.0.0')
});

app.use(express.static('./'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

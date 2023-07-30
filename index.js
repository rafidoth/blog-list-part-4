const app = require('./app') // the actual Express app
const {PORT} = require('./utils/config')
const {logger} = require('./utils/logger')

app.listen(PORT, () => {
    logger(`Server running on port ${PORT}`)
  })
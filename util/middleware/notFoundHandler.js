const path = require('path')
function notFoundHandler(req, res) {
  // res.status(404).json({ message: 'not found' })
  res
    .status(404)
    .sendFile(path.join(__dirname, '../../public/pages/notFound.html'))
}

module.exports = notFoundHandler

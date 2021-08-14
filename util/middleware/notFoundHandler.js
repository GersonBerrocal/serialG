function notFoundHandler(req, res) {
  res.sendStatus(404).json({ message: 'not found' })
}

module.exports = notFoundHandler

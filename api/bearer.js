module.exports = (req, res) => {
  res.json({
      bearer: process.env.BEARER
  })
}
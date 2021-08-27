require('dotenv').config();
const fetch = require('node-fetch')


const SPACES_URL = 'https://api.twitter.com/2/spaces/search?query=';

module.exports = async (req, res) => {

  const { state } = req.query;
  const url = `${SPACES_URL}${query}&state=${state}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER,
      'Content-Type': 'application/json'
    },
  });

  const result = await response.json();

  res.json({
    spaces: result
  })
}
require('dotenv').config();
const fetch = require('node-fetch')


const SPACES_URL = 'https://api.twitter.com/2/spaces/search?query=';

module.exports = async (req, res) => {
  const { body: { state, query } } = req;
  const url = `${SPACES_URL}${query}&state=${state}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER,
      'Content-Type': 'application/json'
    },
  });

  const spaces = await response.json()
  return res.send(spaces)

  // return res.json({
  //   spaces
  // })
}
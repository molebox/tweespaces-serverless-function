require('dotenv').config();
import axios from 'axios'

const SPACES_URL = 'https://api.twitter.com/2/spaces/search?query=';

async function getSpaces(query, state) {
  const url = `${SPACES_URL}${query}&state=${state}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;
  try {
    const result = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
    return result
  } catch (error) {
    return error
  }
}

export default async (req, res) => {
  const { body: { state, query } } = req;
  try {
    const result = await getSpaces(query, state)
    res.send({
      status: 200,
      spaces: result.data
    })
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    })
  }
}
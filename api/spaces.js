require('dotenv').config();
import fetch from 'node-fetch';
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})



const SPACES_URL = 'https://api.twitter.com/2/spaces/search?query=';

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


export default async (req, res) => {
  const { body: { state, query } } = req;

  await runMiddleware(req, res, cors)

  const url = `${SPACES_URL}${query}&state=${state}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;

  async function fetchSpaces() {
    try {
      const spaces = await axios.get(url);
      return res.json({
        spaces: spaces
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error: ', error })
    }
  }

  await fetchSpaces()
}

  // const response = await fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': 'Bearer ' + process.env.BEARER,
  //     'Content-Type': 'application/json'
  //   },
  // });

  // const spaces = await response.json()

  // return res.json({
  //   spaces
  // })
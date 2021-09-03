require('dotenv').config();
import fetch from 'node-fetch';
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})



const SPACES_URL = 'https://api.twitter.com/2/spaces/search?query=';

export default async (req, res) => {
  const { body: { state, query } } = req;
  console.log(state, query)
  const url = `${SPACES_URL}${query}&state=${state}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;

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

  async function fetchSpaces() {
    try {
      const response = await axios.get(url);
      await runMiddleware(req, response, cors)
      return res.json({
        spaces: response
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
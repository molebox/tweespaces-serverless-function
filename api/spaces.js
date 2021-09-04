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
  console.log({ state, query })
  const url = `${SPACES_URL}${query}&state=${state}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;

  try {
    await runMiddleware(req, res, cors)
    const spaces = await axios.get(url, { Authorization: `Bearer ${process.env.BEARER}` });


    return res.send({
      ...spaces
    })
  } catch (error) {
    return res.status(500).send({ message: 'Error, something went wrong: ', error })
  }

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
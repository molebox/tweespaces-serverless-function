require('dotenv').config();
import axios from 'axios'

const USER_BY_USERNAME_URL = 'https://api.twitter.com/2/users/by/username/';
const SPACE_BY_USER_URL = `https://api.twitter.com/2/spaces/by/creator_ids?user_ids=`

export default async (req, res) => {
    const { body: { username } } = req;

    try {

        const user = await axios.get(`${USER_BY_USERNAME_URL}${username}`, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } })
        const userSpace = await axios.get(`${SPACE_BY_USER_URL}${user.data.data.id}&space.fields=host_ids,created_at,creator_id,speaker_ids,started_at,state,title,updated_at,scheduled_start,is_ticketed&expansions=speaker_ids,creator_id,host_ids&user.fields=description,id,name,url,username,verified`, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } })
        res.send({
            status: 200,
            spaces: userSpace.data
        })
    } catch (error) {
        res.send({
            status: 500,
            message: `Error: ${error.message}`,
        })
    }
}
require('dotenv').config();
import axios from 'axios'

const USER_BY_USERNAME_URL = 'https://api.twitter.com/2/users/by/username/';
const SPACE_BY_USER_URL = `https://api.twitter.com/2/spaces/by/creator_id?user_ids=`

async function getUserIdByUsername(username) {
    const url = `${USER_BY_USERNAME_URL}${username}?user.fields=id`;
    try {
        const result = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        console.log('get id: ', result)
        return result
    } catch (error) {
        return error
    }
}

async function getSpaceByUser(id) {
    const url = `${SPACE_BY_USER_URL}${id}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;
    try {
        const result = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        return result
    } catch (error) {
        return error
    }
}

export default async (req, res) => {
    const { body: { username } } = req;
    console.log({ username })
    try {
        const user = await getUserIdByUsername(username)
        console.log({ user })
        const result = await getSpaceByUser(user.id)
        console.log({ result })
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
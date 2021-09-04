require('dotenv').config();
import axios from 'axios'

const USER_BY_USERNAME_URL = 'https://api.twitter.com/2/users/by/username/';

async function getUserIdByUsername(username) {
    const url = `${USER_BY_USERNAME_URL}${username}?user.fields=id`;
    try {
        const result = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        return result
    } catch (error) {
        return error
    }
}

export default async (req, res) => {
    const { body: { username } } = req;
    try {
        const result = await getUserIdByUsername(username)
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
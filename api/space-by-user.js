require('dotenv').config();
import axios from 'axios'

const USER_BY_USERNAME_URL = 'https://api.twitter.com/2/users/by/username/';
const SPACE_BY_USER_URL = `https://api.twitter.com/2/spaces/by/creator_id?user_ids=`

async function getUserIdByUsername(username) {
    const url = `${USER_BY_USERNAME_URL}${username}`;
    try {
        const result = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        return result.data
    } catch (error) {
        return console.log('Get username error: ', error.message)
    }
}

async function getSpaceByUser(id) {
    // const url = `${SPACE_BY_USER_URL}${id}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;
    const url = `${SPACE_BY_USER_URL}${id}`;

    try {
        const result = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        return result.data
    } catch (error) {
        return console.log('Get user space error: ', error.message)
    }
}

// server response: {
//     status: 200,
//         spaces: {
//         data: {
//             id: '1085477171055996928',
//                 name: 'Danny Thompson',
//                     username: 'DThompsonDev'
//         }
//     }
// }

export default async (req, res) => {
    const { body: { username } } = req;

    try {
        const user = await getUserIdByUsername(username)

        // const result = await getSpaceByUser(user.data.id)
        // console.log('Get user space result: ', result)

        res.send({
            status: 200,
            spaces: user.data
        })


    } catch (error) {
        res.send({
            status: 500,
            message: error.message,
        })
    }
}
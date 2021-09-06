require('dotenv').config();
import axios from 'axios'

const USER_BY_USERNAME_URL = 'https://api.twitter.com/2/users/by/username/';
const SPACE_BY_USER_URL = `https://api.twitter.com/2/spaces/by/creator_id?user_ids=`

async function getUserIdByUsername(username) {
    const url = `${USER_BY_USERNAME_URL}${username}`;
    try {
        const { data } = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        console.log('Get username success!: ', data)
        return data
    } catch (error) {
        return console.log('Get username error: ', error.message)
    }
}

async function getSpaceByUser(id) {
    const url = `${SPACE_BY_USER_URL}${id}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;

    try {
        const { data } = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        console.log('Get user space success!: ', data)

        return data
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
        const { data: userData } = await getUserIdByUsername(username)

        const { data } = await getSpaceByUser(userData.id)
        console.log('Get user space result: ', result)

        res.send({
            status: 200,
            spaces: userData.data
        })


    } catch (error) {
        res.send({
            status: 500,
            message: error.message,
        })
    }
}
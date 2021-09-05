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
    console.log({ id })
    const url = `${SPACE_BY_USER_URL}${id}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;
    try {
        const result = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        return result
    } catch (error) {
        return error
    }
}

async function getUserSpace(username) {
    const getIdUrl = `${USER_BY_USERNAME_URL}${username}`;

    try {
        const idResult = await axios.get(getIdUrl, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        console.log('get id: ', idResult)

        if (idResult) {
            const userSpaceUrl = `${SPACE_BY_USER_URL}${idResult.data.id}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;

            const result = await axios.get(userSpaceUrl, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });

            return result.data
        }
    } catch (error) {
        return error
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
    console.log({ username })
    try {
        // const user = await getUserIdByUsername(username)
        // console.log({ user })
        // const id = user.data.id;
        // const result = await getSpaceByUser(id)
        // console.log({ result })

        const result = await getUserSpace(username)

        if (result) {
            console.log({ result })
            res.send({
                status: 200,
                spaces: result.data
            })
        }

    } catch (error) {
        res.send({
            status: 500,
            message: error.message,
        })
    }
}
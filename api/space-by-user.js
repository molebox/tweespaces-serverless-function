require('dotenv').config();
import axios from 'axios'

const USER_BY_USERNAME_URL = 'https://api.twitter.com/2/users/by/username/';
const SPACE_BY_USER_URL = `https://api.twitter.com/2/spaces/by/creator_ids?user_ids=`

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
    // const url = `${SPACE_BY_USER_URL}${id}&space.fields=participant_count,scheduled_start,title&expansions=creator_id&user.fields=name,description,username`;
    const url = `${SPACE_BY_USER_URL}${id}`;

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

async function getUserSpace(username) {
    const getUserByUsernameUrl = `${USER_BY_USERNAME_URL}${username}`;
    try {
        axios.get(getUserByUsernameUrl, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } })
            .then((response) => {
                const getSpaceByUserUrl = `${SPACE_BY_USER_URL}${response.data.id}`;
                axios.get(getSpaceByUserUrl, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
            }).then((response) => {
                return response.data
            })
            .catch((error) => {
                return console.log('Error getting users spaces: ', error.message)
            })

    } catch (error) {
        return console.log('Get user space error: ', error.message)

    }
}

export default async (req, res) => {
    const { body: { username } } = req;

    try {
        // const { data } = await getUserIdByUsername(username)

        //     id = data.id
        //     const { data } = await getSpaceByUser(data.id)
        //     console.log('Get user space result: ', data)

        // const [getUserId] = await Promise.all([axios.get(`${USER_BY_USERNAME_URL}${username}`, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } })])

        // const data = await axios.get(`${SPACE_BY_USER_URL}${getUserId.data.data.id.toString()}`, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } });
        // console.log('Get user space success!: ', data)

        // const { data } = await getSpaceByUser(getUserId.data.data.id)

        // const userSpace = await getUserSpace(username)

        const user = await axios.get(`${USER_BY_USERNAME_URL}${username}`, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } })
        // console.log('id: ', user.data.data.id)
        // const userSpace = await axios.get(`${SPACE_BY_USER_URL}${user.data.data.id}&space.fields=host_ids,created_at,creator_id,id,lang,invited_user_ids,participants,speaker_ids,started_at,state,title,updated_at,scheduled_start,is_ticketed&expansions=invited_user_ids,speaker_ids,creator_id,host_ids&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } })
        const userSpace = await axios.get(`${SPACE_BY_USER_URL}${user.data.data.id}`, { headers: { 'Authorization': `Bearer ${process.env.BEARER}` } })

        console.log({ userSpace })
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

    // try {

    //     const { data } = await getSpaceByUser(id)
    //     console.log('Get user space result: ', data)

    //     res.send({
    //         status: 200,
    //         spaces: data
    //     })


    // } catch (error) {
    //     res.send({
    //         status: 500,
    //         message: `Error getting user spaces: ${error.message}`,
    //     })
    // }
}
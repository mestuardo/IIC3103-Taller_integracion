import dbConnect from '../../../../util/mongoose'

import Track from '../../../../models/Track'
import Cors from 'cors'
import initMiddleware from '../../../../util/init-middleware'


const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST','PUT','DELETE'],
  })
)


export default async function userHandler(req, res) {

  await cors(req, res)
  const {
    query: {track_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'PUT':
      try{      

        const track = await Track.findOne({id:track_id},{_id:0})
        if (!track){
          return res.status(404).json('canción no encontrada')
        }
        await Track.updateOne({id: track_id},{$inc: { times_played: 1 }})



      res.status(200).json('canción reproducida')
    } catch(err){
      res.status(404).json(err)
    }
      break

    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

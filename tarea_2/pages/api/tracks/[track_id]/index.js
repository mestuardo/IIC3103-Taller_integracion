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
    case 'GET':
      try{ 
      const track = await Track.findOne({id: track_id},{_id:0})
      // Get data from your database
      
      if (!track){
        return res.status(404).json('Canción no encontrada')
      }
      res.status(200).json(track)
    } catch(err){
      res.status(400).json(err)
    }
      break
    case 'DELETE':
      // Update or create data in your database
      const track = await Track.findOne({id:track_id},{_id:0})

      if (!track){
        return res.status(404).json('canción inexistente')

      }
      await Track.deleteOne({id:track_id})
      return res.status(204).send()
      

      break
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

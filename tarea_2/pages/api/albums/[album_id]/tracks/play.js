import dbConnect from '../../../../../util/mongoose'

import Album from '../../../../../models/Album'
import Track from '../../../../../models/Track'

import Cors from 'cors'
import initMiddleware from '../../../../../util/init-middleware'


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
    query: {album_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'PUT':
      try{      
        const album = await Album.findOne({id: album_id},{_id:0})
        if (album){
          const tracks = await Track.find({album_id: album_id},{_id:0})
          if (tracks.length>0){
            await Track.updateMany({album_id: album_id},{$inc: { times_played: 1 }})
            return res.status(200).json('canciones del álbum reproducidas')
          }else{
            return res.status(404).json('no existen canciones para este álbum')
          }
        }

        return res.status(404).json('álbum no encontrado')

       
        
      
    } catch(err){
      res.status(404).json(err)
    }
      break

    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

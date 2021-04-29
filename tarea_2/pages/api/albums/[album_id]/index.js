import dbConnect from '../../../../util/mongoose'
import Album from '../../../../models/Album'
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
    query: {album_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'GET':
      try{ 
      const album = await Album.findOne({id: album_id},{_id:0})
      // Get data from your database
      
      if (!album){
        return res.status(404).json('álbum no encontrado')
      }
      res.status(200).json(album)
    } catch(err){
      res.status(400).json(err)
    }
      break
    case 'DELETE':
      // Update or create data in your database
        const album = await Album.findOne({id: album_id},{_id:0},function(err,obj){
          if (err) {return res.status(404).json(err)}; 
        }
          )  
        if (!album){
          return res.status(404).json('álbum inexistente')
        }
        

        
        
      
      await Album.deleteOne({id:album_id})
      const tracks = await Track.find({album_id:album_id},{_id:0})
      if (tracks.length>0){
      await Track.deleteMany({album_id:album_id})
      }
      return res.status(204).json('álbum eliminado')

      break
    default:
      res.setHeader('Allow', ['GET', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

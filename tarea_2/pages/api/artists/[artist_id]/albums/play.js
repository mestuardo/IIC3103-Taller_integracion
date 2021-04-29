import dbConnect from '../../../../../util/mongoose'
import Album from '../../../../../models/Album'
import Track from '../../../../../models/Track'
import Artist from '../../../../../models/Artist'
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
    query: {artist_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'PUT':
      try{ 
        const artist = Artist.findOne({artist_id: artist_id},{_id:0})

        if (!artist){
          return res.status(404).json('artista no encontrado')
        }

        if (artist){
        var album_ids = [];
        const albums = await Album.find({artist_id: artist_id},{_id:0})
        if (albums.length==0){
          return res.status(200).json('no existen álbumes de este artista')
        }
        albums.forEach(album => album_ids.push(album.id) )
        const tracks = await Track.find({album_id: {$in: album_ids}},{_id:0})
        if (tracks.length>0){
          await Track.updateMany({album_id: {$in: album_ids}},{$inc: { times_played: 1 }})
          return res.status(200).json('todas las canciones del artista fueron reproducidas')
        }else{
          return res.status(404).json('no existen canciones de este artista')
        }
        }
        

        



     
    } catch(err){
      res.status(404).json('artista no encontrado')
    }
      break

    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

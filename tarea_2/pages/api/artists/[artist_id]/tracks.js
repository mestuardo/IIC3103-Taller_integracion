import dbConnect from '../../../../util/mongoose'
import Album from '../../../../models/Album'
import Track from '../../../../models/Track'
import Artist from '../../../../models/Artist'

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
    query: {artist_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'GET':
    
    try {
      const artist = Artist.findOne({id:artist_id},{_id:0})    
        if (!artist){
            return res.status(404).json('artista no encontrado')
        }
    var album_ids = [];
      const albums = await Album.find({artist_id: artist_id},{_id:0})
      // Get data from your database
      albums.forEach(album => album_ids.push(album.id) )
      const tracks = await Track.find({album_id:{$in:album_ids }},{_id:0})
      return res.status(200).json(tracks)
    } catch (error) {
        res.status(400).json(error)
      }
      break
    case 'POST':
      // Update or create data in your database
      const buff  = Buffer.from(req.body.name, 'utf-8')
      const IDbase64 = buff.toString('base64').substring(0,22);
      try {
        const album = await Album.create(
          {id: IDbase64,
        artist_id: artist_id,
          name: req.body.name,
          genre: req.body.genre,
          artist: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + artist_id  ,
          tracks: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/albums/' + IDbase64 +'/tracks' ,
          self: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/albums/' + IDbase64  
        
        }
        
        ) /* create a new model in the database */
        res.status(201).json(album.slice(1,artist.length-1))
      } catch (error) {
        const album = await Album.find({artist_id: artist_id},{_id:0})
        res.status(400).json(album)
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
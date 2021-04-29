import dbConnect from '../../../../../util/mongoose'
import Track from '../../../../../models/Track'
import Album from '../../../../../models/Album'


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
    case 'GET':
    try {
      const album = await Album.findOne({id:album_id},{_id:0})
      if (!album){
        return res.status(404).json('álbum no encontrado')
      }
      const tracks = await Track.find({album_id: album_id},{_id:0})
      // Get data from your database
      res.status(200).json(tracks)
    } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      const album = await Album.findOne({id:album_id},{_id:0})
      if (!album){
        return res.status(422).json('álbum no existe')
      }
      if (req.body.name==undefined){
        return res.status(400).json('input inválido')
      }
      if (req.body.duration==undefined){
        return res.status(400).json('input inválido')
      }
      const buff  = Buffer.from(req.body.name, 'utf-8')
      const IDbase64 = buff.toString('base64').substring(0,22);
      try {
        const album = await Album.findOne({id: album_id},{_id:0})
        const track = await Track.create(
          {id: IDbase64,
          album_id: album_id,
          name: req.body.name,
          duration: req.body.duration,
          times_played: 0,
          artist: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + album.artist_id  ,
          album: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/albums/' + album_id ,
          self: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/tracks/' + IDbase64  
        
        },async function(err,obj){
          if (err){
          if (err.name === 'MongoError' && err.code === 11000){
            const tra = await Track.findOne({id:IDbase64},{_id:0})
            return res.status(409).json(tra)}
          return res.status(400).json('input inválido')
          }
          const picked_obj = (({ id,album_id,name,duration,times_played,artist,album,self }) => ({ id,album_id,name,duration,times_played,artist,album,self }))(obj);
          return res.status(201).json(picked_obj)
        }
        
        ) /* create a new model in the database */
      } catch (error) {
        res.status(400).json(error)

      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
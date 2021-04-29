import dbConnect from '../../../../../util/mongoose'
import Album from '../../../../../models/Album'
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
    case 'GET':
    try {
      const artist = await Artist.findOne({id:artist_id},{_id:0})
      if (!artist){
        return res.status(404).json('artista no encontrado')
      }
      const albums = await Album.find({artist_id: artist_id},{_id:0,id:0,artist_id:0})
      // Get data from your database
      res.status(200).json(albums)
    } catch (error) {
        res.status(400).json(error)
      }
      break
    case 'POST':
      const artist = await Artist.findOne({id:artist_id},{_id:0})
      if (!artist){
        return res.status(422).json('artista no existe')      }

      if (req.body.name==undefined){
        return res.status(400).json('input inválido')
      }
      if (req.body.genre==undefined){
        return res.status(400).json('input inválido')
      }
      const buff  = Buffer.from(req.body.name+':'+artist_id, 'utf-8')
      const IDbase64 = buff.toString('base64').substring(0,22);
      try {
         await Album.create(
          {id: IDbase64,
        artist_id: artist_id,
          name: req.body.name,
          genre: req.body.genre,
          artist: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + artist_id  ,
          tracks: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/albums/' + IDbase64 +'/tracks' ,
          self: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/albums/' + IDbase64  
        
        },async function(err,obj){
          if (err){
          if (err.name === 'MongoError' && err.code === 11000){
            const alb = await Album.findOne({artist_id: artist_id},{_id:0,id:0,artist_id:0})
            return res.status(409).json(alb)}
          return res.status(400).json('input inválido')
          }
          const picked_obj = (({ name,genre,artist,tracks,self }) => ({ name,genre,artist,tracks,self }))(obj);
          return res.status(201).json(picked_obj)
        }
        
        ) /* create a new model in the database */

      } catch (error) {
        res.status(400).json('error')
        
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
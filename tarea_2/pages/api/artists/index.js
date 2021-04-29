import dbConnect from '../../../util/mongoose'
import Artist from '../../../models/Artist'

import Cors from 'cors'
import initMiddleware from '../../../util/init-middleware'


const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST','PUT','DELETE'],
  })
)


export default async function handler(req, res) {  
  await cors(req, res)
  const { method } = req


  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const artists = await Artist.find({},{_id:0,id:0}) /* find all the data in our database */
        res.status(200).json(artists)
      } catch (error) {
        res.status(400).json(error)
      }
      break
    case 'POST':
      if (req.body.name==undefined){
        return res.status(400).json('input inválido')
      }
      if (req.body.age==undefined){
        return res.status(400).json('input inválido')
      }
      const buff  = Buffer.from(req.body.name, 'utf-8')
      const IDbase64 = buff.toString('base64').substring(0,22);
      try {
       await Artist.create(
          {id : IDbase64,
          name: req.body.name,
          age: req.body.age,
          albums: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + IDbase64 +'/albums'  ,
          tracks: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + IDbase64 +'/tracks' ,
          self: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + IDbase64  
        
        },async function(err,obj){
          if (err){
          if (err.name === 'MongoError' && err.code === 11000){
            const art = await Artist.findOne({id:IDbase64},{_id:0,id:0})
            return res.status(409).json(art)}
          return res.status(400).json('input inválido')
          }
          const picked_obj = (({ name,age,albums,tracks,self }) => ({ name,age,albums,tracks,self }))(obj);
          return res.status(201).json(picked_obj)
        }
        
        ) /* create a new model in the database */
        // return res.status(201).json(artist.slice(1,artist.length-1))
      } catch (error) {
        return res.status(400).json(error)
        
        
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
 
  }
}
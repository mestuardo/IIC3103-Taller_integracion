import dbConnect from '../../../util/mongoose'
import Artist from '../../../models/Artist'


export default async function handler(req, res) {  
  const { method } = req


  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const artists = await Artist.find({},{_id:0}) /* find all the data in our database */
        res.status(200).json(artists)
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      const buff  = Buffer.from(req.body.name, 'utf-8')
      const IDbase64 = buff.toString('base64');
      try {
        const artist = await Artist.create(
          {id : IDbase64,
          name: req.body.name,
          age: req.body.age,
          albums: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + IDbase64 +'/albums'  ,
          tracks: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + IDbase64 +'/tracks' ,
          self: (req.connection && req.connection.encrypted ? 'https' : 'http')+ '://'+ req.headers.host +'/api/artists/' + IDbase64  
        
        }
        
        ) /* create a new model in the database */
        res.status(201).json(artist.slice(1,artist.length-1))
      } catch (error) {
        const artist = await Artist.find({id:IDbase64},{_id:0})
        res.status(400).json(artist)
      }
      break
    default:
      res.status(400).json('METHOD NOT ALLOWED')
      break
  }
}
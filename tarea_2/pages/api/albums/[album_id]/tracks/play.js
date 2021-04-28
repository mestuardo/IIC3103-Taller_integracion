import dbConnect from '../../../../../util/mongoose'

import Track from '../../../../../models/Track'


export default async function userHandler(req, res) {
  const {
    query: {album_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'PUT':
      try{      

        await Track.updateMany({album_id: album_id},{$inc: { times_played: 1 }})



      res.status(200).json('canciones del álbum reproducidas')
    } catch(err){
      res.status(404).json('álbum no encontrado')
    }
      break

    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

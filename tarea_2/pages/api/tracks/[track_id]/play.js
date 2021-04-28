import dbConnect from '../../../../util/mongoose'

import Track from '../../../../models/Track'


export default async function userHandler(req, res) {
  const {
    query: {track_id},
    method,
  } = req
  
  await dbConnect()

  switch (method) {
    case 'PUT':
      try{      

        await Track.updateOne({id: track_id},{$inc: { times_played: 1 }})



      res.status(200).json('canción reproducida')
    } catch(err){
      res.status(404).json('canción no encontrada')
    }
      break

    default:
      res.setHeader('Allow', ['PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

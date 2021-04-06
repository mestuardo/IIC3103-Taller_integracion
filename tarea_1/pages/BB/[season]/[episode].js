import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'
import axios from 'axios'; 

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';





  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}



function caratulas(temporada){
  if (temporada==1){
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-1.jpg"
  }
  else if (temporada==2) {
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-2.jpg"
  }
  else if (temporada==3) {
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-3.jpg"
  }
  else if (temporada==4) {
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-4.jpg"
  }
  else if (temporada==5) {
    return "https://www.coverwhiz.com/uploads/tv/Breaking-Bad-Season-5.jpg"
  }
  else{
    return ''
  }
}


const Post = ({episodio,error}) => {
//   const router = useRouter()
//   const { episode_id } = router.query


const router = useRouter()

if (router.isFallback) {
  return <div>Loading...</div>
}

  return (<div className={styles.container}>
<Head>
  <title>Episodio N° {episodio.episode} - Temporada {episodio.temporada}</title>
  <link rel="icon" href="/favicon.ico" />
</Head>

<main className={styles.main}>

      <Link href={`/BB`}>
      <p className={styles.description}>
   <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
           
      </p>
      </Link>
  <h3>Episodio N° {episodio.episode}</h3>



  <div className={styles.gridDetalles}>
  

  <Card className={styles.imgDetalles}>
      <CardActionArea>
      <div className={styles.imgDetalles} style={{backgroundImage:"url("+caratulas(episodio.season)+ ")",backgroundSize:'cover'}}>
        {episodio.episode}
        </div>

      </CardActionArea>
    </Card>


    <Card style={{width:'300px',margin:'10px'}} >
  
    <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {episodio.title}
          </Typography>
          <Typography variant="body1"  component="p">Salida al aire</Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">{formatDate(episodio.air_date)}</Typography>
          <Typography variant="body2"component="p">
            Temporada N°
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
           {episodio.season}
          </Typography>
          <Typography variant="h6" component="h2">
            Personajes
          </Typography>
          {episodio.characters.map((personaje) => (
          <Typography key={personaje} variant="body2" color="textSecondary" component="p">
           <Link href={"/personajes/"+personaje} >{personaje} </Link>
          </Typography>
          ))}
        </CardContent>
   
    </Card>



  </div>


  </main>
  </div>


  )}

export default Post





export async function getStaticProps({ params }) {
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad')
  const data = await res.json()
  let temp = data.filter(x => x.season.toString() == params.season);    
  let episodios = temp.filter(x => x.episode.toString() == params.episode);    

  return {
    props: {
        episodio: episodios[0]
    },
    revalidate: 3600,
  };
}



export async function getStaticPaths() {
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad')
  const data = await res.json()

  // var temp_1 = data.filter( element => element.season =="1")
  // const data_json = JSON.parse(JSON.stringify(data))

  // Get the paths we want to pre-render based on posts
  const paths = data.map(episode => ({
      params: {
        season: episode.season.toString(),
        episode: episode.episode.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return {paths, fallback: true}
}

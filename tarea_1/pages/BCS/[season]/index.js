import React from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import axios from 'axios'; 
import Head from 'next/head'

import styles from '../../../styles/Home.module.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pag404 from '../../../components/404.js'

function caratulas(temporada){
  if (temporada==1){
    return "https://upload.wikimedia.org/wikipedia/en/f/f2/Better_Call_Saul_Season_1.png"
  }
  else if (temporada==2) {
    return "https://upload.wikimedia.org/wikipedia/en/1/19/Better_Call_Saul_Season_2.jpg"
  }
  else if (temporada==3) {
    return "https://upload.wikimedia.org/wikipedia/en/a/a0/Better_Call_Saul_Season_3.jpg"
  }
  else if (temporada==4) {
    return "https://upload.wikimedia.org/wikipedia/en/c/cc/Better_Call_Saul_Season_4.jpg"
  }
}




const useStyles = makeStyles({
  root: {
    maxWidth: '230px',
    margin: '10px',
    textAlign:'center',
    height:'380px',
    opacity: '0.8',
    transition: '0.3s',
    "&:hover":{
      opacity: '1',
    },
  },
  media: {
    maxWidth: '230px',
    textAlign:'center',
    height:'380px',
    opacity: '0.8',
    transition: '0.3s',
    "&:hover":{
      opacity: '1',
    },
},

});


const backDropStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
  },
}));

// posts will be populated at build time by getStaticProps()
export default function Temporadas( {temporada} ) {
  const classes = useStyles();
  const router = useRouter()
  const backdropclasses = backDropStyles()

  if (router.isFallback) {
    return (         <div className={styles.container}>
      <Head>
        <title>Cargando...</title>
   
      </Head>
  
      <main className={styles.main}>
    <Backdrop className={backdropclasses.backdrop} open={true}>
    <CircularProgress color="primary" />
  </Backdrop>
  </main>
  </div>)
  }
  
  if(!temporada) {
    return (<>
      <Head>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <Pag404/>
    </>)
  }


  
  return (

    <div className={styles.container}>
    <Head>
      <title>{temporada[0].series} - Temporada {temporada[0].season}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>


      <Link href={`/BCS`}>
      <p className={styles.description}>
   <img style={{width:'150px'}}
          src="https://www.dafont.com/forum/attach/orig/4/8/483649.png"/>
           
      </p>
      </Link>
     
      <h3>Temporada {temporada[0].season}</h3>
  
  
      <div className={styles.listaItems}>
    

    {temporada.map((temp) => (

        
              
   <li key={temp.episode_id} >
    <Link href={`${encodeURIComponent(temp.season)}/${encodeURIComponent(temp.episode)}`}>
   <Card className={classes.root} >
      <CardActionArea className={classes.media}>
        <div className={styles.imgCard} style={{backgroundImage:"url("+caratulas(temp.season) +")",backgroundSize:'cover'}}>
        {temp.episode}
        </div>
        <CardContent>
        <Typography style={{height:'60px'}} gutterBottom variant="h6" component="h2">
          {temp.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Click para ver más detalles!
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>
    </Link>

    </li>

    

          ))}



    </div>

   
      </main>
      </div>
  )
}


export async function getStaticProps({ params }) {
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
  const data = await res.json()
  let temp = data.filter(x => x.season.toString() == params.season);    

  return {
    props: {
        temporada: temp.length==0 ? null : temp
    },
    revalidate: 3600
  };
}



export async function getStaticPaths() {
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
  const data = await res.json()

  // var temp_1 = data.filter( element => element.season =="1")


  // Get the paths we want to pre-render based on posts
  const paths = data.map(episode => ({
      params: {
        season: episode.season.toString() },
  }));

  // We'll pre-render only these paths at build time.
  return {paths, fallback: true}
}

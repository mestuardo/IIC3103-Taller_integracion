import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Head from 'next/head'

import styles from '../../styles/Home.module.css'
import ButtonBase from '@material-ui/core/ButtonBase';



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
    return 'https://i.blogs.es/78d11f/rick-morty/1366_2000.jpg'
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




// posts will be populated at build time by getStaticProps()
export default function Temporadas( {cant_temporadas,error} ) {
  const classes = useStyles();

  
  return (

    <div className={styles.container}>
    <Head>
      <title>Temporadas Breaking Bad</title>

    </Head>

    <main className={styles.main}>

      <Link href={`/BB`}>
      <p className={styles.description}>
   <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
           
      </p>
      </Link>

      <h3>Temporadas</h3>
  
  
      
  
  
      <div className={styles.listaItems}>
    

    {cant_temporadas.map((temp) => (

        
              
   <li key={temp} >
    <Link href={`BB/${encodeURIComponent(temp)}`}>
   <Card className={classes.root} >
      <CardActionArea className={classes.media}>
        <div className={styles.imgCard} style={{backgroundImage:"url("+caratulas(temp) +")",backgroundSize:'cover'}}>
        {'T'+temp}
        </div>
        <CardContent>
        <Typography style={{height:'60px'}} gutterBottom variant="h6" component="h2">
          {'Temporada '+temp}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Click para ver más detalles
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




export async function getStaticProps() {
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad')
  const data = await res.json()
  // Sacamos las temporadas  
  var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

  var temporadas = groupBy(data,'season')
  var cant_temporadas= Object.keys(temporadas)

  return {
    props: {
      cant_temporadas: JSON.parse(JSON.stringify(cant_temporadas))
    },
    revalidate: 3600,
  };
}
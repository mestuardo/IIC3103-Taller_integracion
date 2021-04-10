import styles from '../../styles/Home.module.css'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import axios from 'axios'; 
import Head from 'next/head'


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
  }else{
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
      <title>Temporadas Better Call Saul</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>


      <p className={styles.description}>
   <img style={{width:'150px'}}
          src="https://www.dafont.com/forum/attach/orig/4/8/483649.png"/>
           
      </p>

      <h3>Temporadas</h3>
  
  
      <div className={styles.listaItems}>
    

    {cant_temporadas.map((temp) => (

        
              
   <li key={temp} >
    <Link href={`BCS/${encodeURIComponent(temp)}`}>
   <Card className={classes.root} key={temp} >
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
  const res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul')
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
    revalidate:3600,
  };
}
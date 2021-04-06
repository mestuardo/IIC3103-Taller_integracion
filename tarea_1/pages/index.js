
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import fetch from 'node-fetch'


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';



export default function Home() {

  return (


      <div className={styles.listaPortada}>

    
              
   <li >
   <p className={styles.description}>
          <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
      </p>

    <Link href={`BB/`}>
   <Card className={styles.tarjetaPortada} >
      <CardActionArea className={styles.imgCardPortada}>
        <div className={styles.imgCardPortada} style={{backgroundImage:"url(https://gcdn.emol.cl/mitos-y-enigmas/files/2019/09/breaking-bad.jpg)",backgroundSize:'cover'}}>
        {'Temporadas'}
        </div>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Click para ver más detalles
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>
    </Link>

    </li>
    <li >
    <p className={styles.description}>
          <img style={{width:'150px'}}
          src="https://www.dafont.com/forum/attach/orig/4/8/483649.png"/>
      </p>

    <Link href={`BCS/`}>
   <Card className={styles.tarjetaPortada} >
      <CardActionArea className={styles.imgCardPortada}>
        <div className={styles.imgCardPortada} style={{backgroundImage:"url(https://img.cinemablend.com/filter:scale/quill/4/c/5/9/8/c/4c598cd1e251c4600b7240ada3a534b41703d5c6.jpg)",backgroundSize:'cover'}}>
        {'Temporadas'}
        </div>
      </CardActionArea>

    </Card>
    </Link>

    </li>





    



    </div>
  

   

  )
}

// export async function getServerSideProps() {
//   const res_00 = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset=0')
   

//   var data = await res_00.json()

//   var i

//   for (i = 10; i < 100; i=i+10) {
//     var res = await fetch('https://tarea-1-breaking-bad.herokuapp.com/api/characters?offset='+i)
//     var data_1 = await res.json()
//     if (data_1.length==0) { break; 
//     }else{
//       data = data.concat(data_1);
//     }
 
//   }
  
  
//   return {
//     props: {
//         personajes: data
//     }
//   };
// }

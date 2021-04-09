import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Head from 'next/head'


const link_fotos =[
    "https://static0.srcdn.com/wordpress/wp-content/uploads/2019/09/Matt-Jones-As-Badger-In-Breaking-Bad.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
    "https://static1.srcdn.com/wordpress/wp-content/uploads/2019/08/kuby-huell-breaking-bad.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
    "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/03/Walter-White-in-Breaking-Bad.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
    "https://static3.srcdn.com/wordpress/wp-content/uploads/2020/11/Breaking-Bad-Skyler-Hank.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
    "https://static2.srcdn.com/wordpress/wp-content/uploads/2021/03/Ted-in-Breaking-Bad.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
    "https://static2.srcdn.com/wordpress/wp-content/uploads/2017/01/Aaron-Paul-as-Jesse-Pinkman-in-Breaking-Bad.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
    "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/08/Skyler-sings-Happy-Birthday-to-Ted-in-Breaking-Bad.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
    "https://static0.srcdn.com/wordpress/wp-content/uploads/2021/03/Saul-and-Jesse-in-Breaking-Bad.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",+
    "https://static2.srcdn.com/wordpress/wp-content/uploads/2021/03/Juan-Bolsa-in-Breaking-Bad.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
    "https://static3.srcdn.com/wordpress/wp-content/uploads/2021/01/Jesse-and-Walt-in-Breaking-Bad.jpg?q=50&fit=crop&w=740&h=369&dpr=1.5",
"https://static2.srcdn.com/wordpress/wp-content/uploads/2021/03/Bob-Odenkirk-as-Gene-in-Better-Call-Saul.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5",
"https://static0.srcdn.com/wordpress/wp-content/uploads/2019/07/Saul-Goodman-featured.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5",
"https://static0.srcdn.com/wordpress/wp-content/uploads/2017/03/Saul-Goodman-working-at-Cinnabon.png?q=50&fit=crop&w=740&h=370&dpr=1.5",
"https://static1.srcdn.com/wordpress/wp-content/uploads/2019/07/AMC-BCS-204-SP-ChuckJimmyArgue-Cropped.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
"https://static3.srcdn.com/wordpress/wp-content/uploads/2019/07/Mike-Ehrmantraut-8-Cropped.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
"https://static2.srcdn.com/wordpress/wp-content/uploads/2017/05/Jimmy-McGill-In-Better-Call-Saul-1.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
"https://static1.srcdn.com/wordpress/wp-content/uploads/2019/07/better-call-saul-episode-201-jimmy-odenkirk-interview-1200x707-Cropped.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
"https://static2.srcdn.com/wordpress/wp-content/uploads/2019/07/Better-Call-Saul-Hector-Salamanca.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
"https://static0.srcdn.com/wordpress/wp-content/uploads/2017/06/Bob-Odenkirk-Better-Call-Saul.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
"https://static3.srcdn.com/wordpress/wp-content/uploads/2019/07/tv-better-call-saul-rhea-seehorn-bob-odenkirk-credit-nicole--Cropped.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5",
"https://static3.srcdn.com/wordpress/wp-content/uploads/2017/06/Bob-Odenkrik-as-Jimmy-in-Better-Call-Saul-Season-3-Episode-10.jpg?q=50&fit=crop&w=740&h=370&dpr=1.5"
]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

export default function FourOhFour() {
  return <div className={styles.container} style={{display:'flex',flexDirection:'column'}}>
  <Head>
    <title>Página no encontrada</title>
  </Head>

  <div style={{display:'grid',gridTemplateColumns: '1fr 1fr',margin:'30px'}}>

      <Link href={`/BB`}>

   <img style={{height:'72px'}}
          src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"/>
           
      
      </Link>

      <Link href={`/BCS`}>
   
   <img style={{height:'72px'}}
          src="https://www.dafont.com/forum/attach/orig/4/8/483649.png"/>
        
      </Link>
 
      </div>

      <Link href="/" >
    <div className={styles.imgCardPortada} style={{height:'300px',borderRadius:'30px',backgroundImage:"url(" + link_fotos[getRndInteger(0,link_fotos.length)] + ")",backgroundSize:'cover'}}>
           Error 404
          <div style={{height:'0',fontSize:'1rem'}}>No encontrado</div>


    </div>
    </Link>
    <Link href="/" >
      <a style={{fontSize:'small'}}>
        Volver a la página de inicio
      </a>
    </Link>
  
    



 
 
  </div>
}
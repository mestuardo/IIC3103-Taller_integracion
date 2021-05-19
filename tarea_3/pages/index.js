import React from 'react';
import Container from '@material-ui/core/Container';
import { Grid, GridList, Button, Typography, TextField } from '@material-ui/core';
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { makeStyles } from '@material-ui/core/styles';
import FlightCard from '../src/flightCard'
import ChatCard from '../src/Chat'


const SOCKET_SERVER_URL = 'wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl'


const Map = dynamic(
  () => import('../src/map'),
  { ssr: false }
)


const useStyles = makeStyles((theme) => ({
root:{
  color:'white',
  textAlign:'center'
},
XgridList: {
  flexWrap: 'nowrap',
  maxWidth: 1100,
  
  // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
  transform: 'translateZ(0)',

  // Aquí se estiliza la scrollbar
  "&::-webkit-scrollbar": {
    
    height: 10,

        },
  "&::-webkit-scrollbar-track": {
    borderRadius: '8px',
    boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: '8px',
    backgroundColor: "darkgrey",

  },



},


}));

            

// Creates a WebSocket connection
    const socket = socketIOClient(SOCKET_SERVER_URL,{
      path: "/flights"
    },
    { transports: ["websocket"] })

    function createData(date, name, message) {
      return { date, name, message };
    }

export default function Index() {
  const classes = useStyles();
  const [positions, setPositions] = useState({});
  const [flights, setFlights] = useState([]);
  const [chat, setChat] = useState([]);
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  useEffect(() => {
    


    socket.on("POSITION", data => {
      setPositions(prevState => ({
        ...prevState,
        [data.code]: data.position
    }));
    });

    socket.emit('FLIGHTS');

    socket.on('FLIGHTS', function(data){
      setFlights(data);  
    });


    socket.on("CHAT", data => {
      setChat(prevState => [...prevState, createData(new Date(data.date).toLocaleString('es-CL'),data.name,data.message)]);
    });
  },[]);

  const handleGetInfo = ()=> socket.emit('FLIGHTS');
  

  return (
    <Container maxWidth='lg' className={classes.root}>
          <Typography style={{backgroundColor: '#e9723d', borderRadius:'8px'}} variant="h4" component="h1" gutterBottom>
          Tarea 3 Taller de Integración
        </Typography>
      <Grid
        container
        direction="row"
  
      >


        <Grid
        item
        xs={7}

      >
        <Map positions={positions} flights={flights}/>

        </Grid>




        <Grid
        item
        xs={4}
        
      >
      <ChatCard socket={socket} chat={chat}/>


        </Grid>
       
     
      </Grid>
    
      
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{backgroundColor:"#0b7fab",marginTop:'20px', borderRadius:'8px'}}
      > 
      <Button style={{marginTop:'5px'}}  type="button" variant='contained' color='primary' onClick={handleGetInfo}>GET INFO</Button>
      
      <GridList cols={3} cellHeight={'auto'} className={classes.XgridList}>
        {flights.map((flight,idx)=> 
         <FlightCard key={flight.code} flight={flight}/>
        
        )}


      </GridList>
      
      
      </Grid>
   
      </Container>
  );

  }


import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Typography, TextField } from '@material-ui/core';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    chatCard:{
        textAlign:'center',
        justifyContent: 'center',
        height: '400px',
        width:'500px',
        backgroundColor:'#0b7fab',
        color: 'white'
      },
      table: {
        minWidth: 200,
        height: '300px',
        backgroundColor:'#0b7fab',
        "&::-webkit-scrollbar": {
            borderRadius: '8px',
            width: 10,
        
                },
          "&::-webkit-scrollbar-track": {
            borderRadius: '8px',
            boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
            backgroundColor:'#0b7fab',
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: '8px',
            backgroundColor: theme.palette.primary.main,
        
          },
      },
      texfield:{
    
          color:'white'
      },


}));


  

export default function Chat({socket,chat}){
    const classes = useStyles();
    const [usrName, setUsrName] = React.useState('Anon Pilot')
    const [msg, setMsg] = React.useState('')

    const handleSend = () => {
        if (msg){
        socket.emit("CHAT", {name:usrName, message: msg})
        setMsg('')
        }
    }
    return (
        <Card className={classes.chatCard}>
        <Typography variant="h6" component="h2" gutterBottom>
          Chat
        </Typography>
        <TableContainer component={Paper} className={classes.table}>
      <Table stickyHeader size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
          <TableCell style={{backgroundColor:'#0b7fab', color:'white'}}>Fecha</TableCell>
            <TableCell style={{backgroundColor:'#0b7fab', color:'white'}}>Usuario</TableCell>
            <TableCell align="right" style={{backgroundColor:'#0b7fab', color:'white'}}>Mensaje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chat.map((row,i) => (
            <TableRow style={{backgroundColor:'#f4d75e'}} key={i}>
                <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.message}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TextField
            margin="dense"
            style={{maxWidth:'100px'}}
            value={usrName}
            onChange= {(e,value)=>setUsrName(e.target.value)}
            InputProps={{
                className: classes.texfield
              }}
          ></TextField>:
          <TextField
            margin="dense"
            value={msg}
            onChange= {(e,value)=>setMsg(e.target.value)}
            InputProps={{
                className: classes.texfield
              }}
          ></TextField>
          <Button type="button" variant='contained' color='primary' style={{marginLeft:'20px'}} onClick={handleSend}>Send</Button>
        </Card>

    )
}
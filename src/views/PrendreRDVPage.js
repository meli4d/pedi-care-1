import React, { useState } from 'react';
import { Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import Button from 'react-bootstrap/Button';
import { Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import axios from 'axios';



function PrendreRDVPage() {
  const today = new Date();
  const sToDay = today.getFullYear() + "-" +  parseInt(today.getMonth()+1) + "-" + today.getDate() ;
  const token = localStorage.getItem('token');
  const location = useLocation();
  const [date, setDate] = useState(sToDay);
  const [time, setTime] = useState();
  const [message, setMessage] = useState();
  const medecin = location.state.medecin;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const prendreRDV = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    try {
      let response = await axios.post('http://localhost:3001/api/rdv/add', 
        {  
          idmedecin: medecin._id, 
          idpatient: user._id,
          nommedecin: medecin.nom,
          prenommedecin: medecin.prenom,
          emailmedecin: medecin.email,
          telephonepro: medecin.telephonepro,
          adresse: medecin.adresse + ', ' + medecin.ville,
          nompatient: user.nom,
          prenompatient: user.prenom,
          telephonepatient:user.telephone,
          specialite: medecin.specialite,
          heure: time,
          date: date
        }
      );
      if (response.status === 200) {
        handleClickOpen()
        setMessage(response.data.message)
      }
    } catch (error) {
      handleClickOpen()
      setMessage("Error service")
    }
  }



  return (
    <div style={{ marginTop: 50, marginLeft: 50 }}>
      <h3 style={{ color: "#1C76D2" }}>Prendre un RDV chez le Dr {medecin.prenom} {medecin.nom}</h3>
      <div style={{ fontSize: 15, color: "#80b3ff" }}>{medecin.specialite}</div>
      <Card style={{ width: "50%", marginTop: 30 }}>
        <CardContent>
          <h5>Etablissement</h5>
          <p>{medecin.adresse}, {medecin.ville}</p>
          <h6>Contacts</h6>
          <div>{medecin.telephonepro}</div>
          <div>{medecin.email}</div>
        </CardContent>
      </Card>

      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <Grid container style={{ marginTop: 50 }}>
          <Grid item xs={3}>
            <DigitalClock
              onChange={(value) => { setTime(value.$H + ":" + value.$m); }}
            />
          </Grid>
          <Grid item xs={8}>
            <DateCalendar
              style={{ marginLeft: 30 }}
              onChange={(value) => {
                const date = value.$y + "-" + (value.$M + 1) + "-" + value.$D;
                setDate(date);
              }}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

      <Button variant="primary" style={{ marginLeft: 10 }} onClick={prendreRDV}>
        Prendre un RDV
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default PrendreRDVPage;
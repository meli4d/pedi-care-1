import { Button, CardActions, CardContent, Grid, List, ListItem, Paper } from "@mui/material";
import { Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function HomePage() {

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const nom = user.nom;
  const prenom = user.prenom;
  const email = user.email;
  const telephone = user.telephone;
  const iduser = user._id;
  const [listrdvs, setRDVs] = useState([]);


  const fetchData = async (id) => {
    try {
      setRDVs([]);
      const response = await axios.get('http://localhost:3001/api/rdv/getbyid/patient/' + id);
      setRDVs(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    fetchData(iduser);

  }, [iduser]);

  async function supprimerRDV(idrdv) {

    try {
      let response = await axios.delete('http://localhost:3001/api/rdv/deletebyid/' + idrdv);
      if (response.status === 200) {
        fetchData(iduser)
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }


  return (
    <div style={{ marginTop: 100, marginLeft: 50, marginRight: 50 }}>
      <Grid container>
        <Grid item xs={4}>
          <h5>Informations personnelles</h5>
          <Card>
            <CardContent>
              <h5>{prenom} {nom}</h5>
              <h6>Contacts</h6>
              <div>{email}</div>
              <div>{telephone}</div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} style={{ marginLeft: 30 }} >
        <h5>Mes rendez vous</h5>
          <Paper style={{ maxHeight: 550, overflow: 'auto' }}>
            <List>
              {listrdvs.length > 0 && listrdvs.map(
                (rdv) =>
                  <ListItem alignItems="flex-start">
                    <Card variant="outlined" style={{ width: 500 }}>
                      <CardContent>
                        <h5>Dr {rdv.prenommedecin} {rdv.nommedecin}</h5>
                        <h5>Etablissement</h5>
                        <div>{rdv.adresse}, {rdv.ville}</div>
                        <div>{rdv.specialite}</div>
                        <h6 style={{ marginTop: 20 }}>Contacts</h6>
                        <div>{rdv.telephonepro}</div>
                        <div>{rdv.emailmedecin}</div>
                        <h6 style={{ marginTop: 20 }}>Date</h6>
                        <div>Le {rdv.date} à {rdv.heure}</div>
                      </CardContent>
                      <CardActions>
                        <Button variant="outlined" onClick={() => supprimerRDV(rdv._id)} color="error">
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </ListItem>
              )}
            </List>
          </Paper>
          <div style={{marginTop:20}}><Link to="/rdvs"><Button variant="contained">Nouveau RDV</Button></Link></div>
        </Grid>
      </Grid>

    </div>
  );
}

export default HomePage;
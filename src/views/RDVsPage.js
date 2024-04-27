import { Navigate } from "react-router-dom";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";


function RDVsPage() {

    const token = localStorage.getItem('token');
    const VILLES = process.env.REACT_APP_VILLES.split(",");
    const SPECIALITES = process.env.REACT_APP_SPECIALITES.split(",");
    const [listrdvs, setRDVs] = useState([]);
    const [ville, setVille] = useState();
    const [specialite, setSpecialite] = useState();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const getRDVs = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.get('http://localhost:3001/api/rdv/etablissements/' + specialite + '/' + ville);
            if (response.status === 200) {
                setRDVs(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ marginTop: 100, marginLeft: 50, marginRight: 50 }}>
            <Grid container style={{ marginTop: 50 }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={SPECIALITES}
                    sx={{ width: 300 }}
                    onChange={(event, value) => setSpecialite(value)}
                    renderInput={(params) => <TextField {...params} label="Spécialité" />}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={VILLES}
                    sx={{ width: 300 }}
                    onChange={(event, value) => setVille(value)}
                    renderInput={(params) => <TextField {...params} label="Ville" />}
                />

                <Button variant="primary" style={{ marginLeft: 10 }} onClick={getRDVs}>
                    Rechercher
                </Button>
            </Grid>
            <List  >
                {listrdvs.length > 0 && listrdvs.map(
                    (item) =>
                        <ListItem alignItems="flex-start">
                            <Card variant="outlined" style={{ width: 500 }}>
                                <CardContent>
                                    <h5>Dr {item.prenom} {item.nom}</h5>
                                    <div>{item.specialite}</div>
                                    <p style={{ marginTop: 20 }}>{item.adresse}, {item.ville}</p>
                                </CardContent>
                                <CardActions>
                                    <Link to="/prendrerdv" state={{ medecin: item}}>
                                        <Button size="small">Prendre rendez-vous</Button>
                                    </Link>
                                </CardActions>
                            </Card>

                        </ListItem>
                )}
            </List>

        </div >
    );
}

export default RDVsPage;
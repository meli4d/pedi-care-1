import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from "react-router-dom";
import logo1 from '../assets/images/logo1.png'
import logo2 from '../assets/images/logo2.png'
import logo3 from '../assets/images/logo3.png'
import logo4 from '../assets/images/logo4.png'


function MainPage() {


    const VILLES = process.env.REACT_APP_VILLES.split(",");
    const SPECIALITES = process.env.REACT_APP_SPECIALITES.split(",");

    return (
        <div style={{ marginTop: 100, marginLeft: 50, marginRight: 50 }}>
            <h3 style={{ color: "#80b3ff" }}>Pédia care : Soutenir les parents ,
            chérir les enfants, votre guide confiant vers une enfance en santé ! </h3>
            <Form style={{
                display: 'flex',
                width: 700
            }} >

                <Form.Group >
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={SPECIALITES}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Spécialité" />}
                    />
                </Form.Group>

                <Form.Group style={{ marginLeft: 2 }}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={VILLES}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Ville" />}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginLeft: 10 }}>
                    Rechercher
                </Button>
            </Form>

            <Grid container columnSpacing={15} style={{ marginTop: 50 }}>
                <Grid item xs={3} style={{ width: 245 }}>
                    <Card variant="outlined" >
                        <CardMedia
                            sx={{ height: 200 }}
                            image={logo4}
                            title="green iguana"
                        />
                     <Typography variant="body2" color="text.secondary">
                            Une question vous tracasse concernant votre enfant ? 
                            Posez vos questions dans notre forum dédié 
                            et bénéficiez de réponses expertes pour assurer le bien-être de votre enfant.
                            Nos experts sont à votre écoute, 24h/24, 7j/7.
                            Plongez dans notre forum interactif et bénéficiez de conseils personnalisés !
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Je pose une question</Button>
                        </CardActions>
                    </Card>
                                
                </Grid>
                <Grid item xs={3} style={{ width: 245 }}>
                    <Card variant="outlined" >
                        <CardContent>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={logo2}
                                title="green iguana"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                Boutique en ligne
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Besoin urgent d'articles essentiels pour vous et votre enfant
                            sans quitter votre domicile ? 
                            Notre sélection complète répond à tous vos besoins primordiaux, 
                            livrée rapidement à votre porte 24h/24, 7j/7.
                            Simplifiez votre vie de parent grâce à nos services !
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Aller à la boutique</Button>
                        </CardActions>
                    </Card>
                </Grid>
                                
                <Grid item xs={3} style={{ width: 245 }}>
                    <Card variant="outlined" >
                        <CardContent>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={logo3}
                                title="green iguana"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                Rendez vous
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Obtenez rapidement les conseils et prescriptions nécessaires pour votre enfant, 
                            sans avoir à vous déplacer en cas d'urgence.
                            Prenez rendez-vous en ligne avec nos specialiste en un seul clic 24h/24, 7j/7 sans délai et accédez à notre lien visioconférence !
                            
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to="/rdvs">
                                <Button size="small">Prendre un rendez vous</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3} style={{ width: 245 }}>
                    <Card variant="outlined" >
                        <CardContent>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={logo1}
                                title="green iguana"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                Nutritions
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Nourrissez sainement vos petits avec nos conseils et recettes savoureuses,
                            pour des habitudes alimentaires qui favorisent leur bien-être et leur développement.
                            Découvrez notre menu nutritionnel conçu pour tous les âges de vos enfants ! 
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Découvrir notre menu nutritionnel</Button>
                        </CardActions>
                    </Card>
                </Grid>
                           
            </Grid>

        </div>

    );
}

export default MainPage;

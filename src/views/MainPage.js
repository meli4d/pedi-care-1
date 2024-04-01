import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function MainPage() {
    return (
        <div style={{ marginTop: 150, marginLeft: 50, marginRight: 50 }}>
            <h3 style={{ color: "#80b3ff" }}>Trouvez un rendez-vous</h3>
            <Form style={{
                display: 'flex',
                width: 700
            }} >

                <Form.Group >
                    <Form.Control type="text"
                        placeholder="Nom, spécialité" />
                </Form.Group>

                <Form.Group style={{ marginLeft: 2 }}>
                    <Form.Control type="text"
                        placeholder="Ville" />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginLeft: 10 }}>
                    Rechercher
                </Button>
            </Form>

            <Grid container columnSpacing={15} style={{ marginTop: 50 }}>
                <Grid item xs={3} style={{width:245}}>
                    <Card variant="outlined" >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Blogs
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Que vous soyez à la maison, dans les transports ou au bureau,
                                les bactéries pathogènes sont partout. Utiliser un produit 
                                désinfectant est une manière pratique et...
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Lire plus</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3} style={{width:245}}>
                    <Card variant="outlined" >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Boutique en ligne
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Que vous soyez à la maison, dans les transports ou au bureau,
                                les bactéries pathogènes sont partout. Utiliser un produit 
                                désinfectant est une manière pratique et...
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Aller à la boutique</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3} style={{width:245}}>
                    <Card variant="outlined" >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Rendez vous
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Que vous soyez à la maison, dans les transports ou au bureau,
                                les bactéries pathogènes sont partout. Utiliser un produit 
                                désinfectant est une manière pratique et...
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Prendre un rendez vous</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3} style={{width:245}}>
                    <Card variant="outlined" >
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Nutritions
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Que vous soyez à la maison, dans les transports ou au bureau,
                                les bactéries pathogènes sont partout. Utiliser un produit 
                                désinfectant est une manière pratique et...
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Lire plus</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        </div>

    );
}

export default MainPage;
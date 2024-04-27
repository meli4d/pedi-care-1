import { Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, Paper, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";


function HomeMedecinPage() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [listrdvs, setRDVs] = useState([]);
    const [listblogs, setBlogs] = useState([]);
    const [contenu, setContenu] = useState("");
    const [titre, setTitre] = useState("");
    const [open, setOpen] = useState(false);
    const iduser = user._id;
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const getRDVs = async (id) => {
        try {
            setRDVs([]);
            const response = await axios.get('http://localhost:3001/api/rdv/getbyid/medecin/' + id);
            setRDVs(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getBlogs = async (id) => {
        try {
            setBlogs([]);
            const response = await axios.get('http://localhost:3001/api/blogs/get/' + id);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteBlog = async (idblog) => {
        try {
            setBlogs([]);
            const response = await axios.delete('http://localhost:3001/api/blogs/delete/' + idblog);
            if (response.status === 200) {
                getBlogs(iduser);
            }
        } catch (error) {
            getBlogs(iduser);
            console.error('Error fetching data:', error);
        }
    };

    async function ajouterBlog() {

        if(titre.trim() === ""){
            alert("Le titre est vide");
            return;
        }

        if(contenu.trim() === ""){
            alert("Le contenu est vide");
            return;
        }
 
        try {
            let response = await axios.post('http://localhost:3001/api/blogs/add',
                {
                    titre: titre,
                    content: contenu,
                    idmedecin: user._id,
                    nommedecin: user.nom,
                    prenommedecin: user.prenom
                }
            );

            if (response.status === 200) {
                setOpen(false);
                getBlogs(iduser);
            }
        } catch (error) {
            console.log(error);
        }
 

    }

    async function supprimerRDV(idrdv) {
        try {
            let response = await axios.delete('http://localhost:3001/api/rdv/deletebyid/' + idrdv);
            if (response.status === 200) {
                getRDVs(iduser)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRDVs(iduser);
        getBlogs(iduser);

    }, [iduser]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <Grid container>
                <Grid xs={4}>
                    <Paper style={{ height: 600, maxHeight: 600, overflow: 'auto' }}>
                        <List>
                            {listrdvs.length > 0 && listrdvs.map(
                                (rdv) =>
                                    <ListItem alignItems="flex-start">
                                        <Card variant="outlined" style={{ width: 500 }}>
                                            <CardContent>
                                                <h5>{rdv.prenompatient} {rdv.nompatient}</h5>
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
                </Grid>
                <Grid xs={4}>
                    <Paper style={{ height: 600, maxHeight: 600, overflow: 'auto' }}>
                    <List>
                            {listblogs.length > 0 && listblogs.map(
                                (blog) =>
                                    <ListItem alignItems="flex-start">
                                        <Card variant="outlined" style={{ width: 500 }}>
                                            <CardContent>
                                                <h5>{blog.titre}</h5>
                                                <p>{blog.content}</p>
                                            </CardContent>
                                            <CardActions>
                                                <Button variant="outlined" color="error" onClick={() => deleteBlog(blog._id)}>
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </ListItem>
                            )}
                        </List>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Ajouter un Blog
                        </Button>
                    </Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper style={{ height: 600, maxHeight: 600, overflow: 'auto' }}>

                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ajouter un Blog</DialogTitle>
                <DialogContent>
                    <from>
                        <TextField
                            label="Titre"
                            required
                            margin="dense"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setTitre(e.target.value)}
                        />
                        <textarea
                            rows={4}
                            placeholder="Contenu"
                            onChange={(e) => setContenu(e.target.value)}
                            required
                        />
                        <div style={{ marginTop: 15 }}> <Button variant="contained" onClick={ajouterBlog}>Ajouter</Button></div>

                    </from>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default HomeMedecinPage;
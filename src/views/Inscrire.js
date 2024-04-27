import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';


function InscrirePage() {

  const location = useLocation();
  const [nom, setName] = useState();
  const [prenom, setPrenom] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [telephone, setTelephone] = useState();
  const [civilite, setCivilite] = useState();
  const [message, setMessage] = useState();
  const [specialite, setSpecialite] = useState();
  const [ville, setVille] = useState();
  const [telephonepro, setTelephonePro] = useState();
  const [adresse, setAdresse] = useState();
  const [numeroSiret, setNumeroSiret] = useState();
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const SPECIALITES = process.env.REACT_APP_SPECIALITES.split(",");
  const VILLES = process.env.REACT_APP_VILLES.split(",");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let type = location.state.type || 'patient';

  const addUser = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post('http://localhost:3001/api/auth/signup', { type, civilite, nom, prenom, email, password, telephone, adresse, telephonepro, numeroSiret, ville, specialite });
      console.log(response);
      if (response.status === 200) {
        navigation('/');
      } else if (response.status === 201) {
        handleClickOpen()
        setMessage(response.data.message)
      } else {

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form style={{
        display: 'block',
        width: 500,
        margin: "auto",
        marginTop: 30
      }} onSubmit={addUser}>
        <h3 style={{ textAlign: 'center', color: '#1c76d2' }}>Inscription à PediCare</h3>
        <Divider style={{ marginTop: 30 }}>
          <h4 style={{ color: '#80b3ff' }}>Informations personnelles</h4>
        </Divider>
        <Form.Group >
          <Autocomplete
          onChange={(event, value) => setCivilite(value)}
            disablePortal
            options={"Madame (Mme),Mademoiselle (Mlle),Monsieur (M.)".split(',')}
            renderInput={(params) => <TextField {...params} label="Civilité" />}
          />
        </Form.Group>
        <Form.Group style={{ marginTop: 10 }}>
          <Form.Control type="text"
            placeholder="Nom" onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group style={{ marginTop: 10 }}>
          <Form.Control type="text"
            placeholder="Prénom" onChange={(e) => setPrenom(e.target.value)} />
        </Form.Group>
        <Form.Group style={{ marginTop: 10 }}>
          <Form.Control type="text"
            placeholder="Téléphone personnel" onChange={(e) => setTelephone(e.target.value)} />
        </Form.Group>
        <div>
        {type==='medecin' ?(
          <div>
          <Divider style={{ marginTop: 30 }}>
            <h4 style={{ color: '#80b3ff' }}>Informations professionnelles</h4>
          </Divider>
          <Form.Group >
            <Autocomplete
              disablePortal
              options={SPECIALITES}
              onChange={(event, value) => setSpecialite(value)}
              renderInput={(params) => <TextField {...params} label="Spécialité" />}
            />
          </Form.Group>

          <Form.Group style={{ marginTop: 10 }}>
            <Form.Control type="text"
              placeholder="Adresse" onChange={(e) => setAdresse(e.target.value)} />
          </Form.Group>

          <Form.Group style={{ marginTop: 10 }}>
            <Autocomplete
              disablePortal
              onChange={(event, value) => setVille(value)}
              options={VILLES}
              renderInput={(params) => <TextField {...params} label="Ville" />}
            />
          </Form.Group>

          <Form.Group style={{ marginTop: 10 }}>
            <Form.Control type="text"
              placeholder="Téléphone de votre cabinet" onChange={(e) => setTelephonePro(e.target.value)} />
          </Form.Group>

          <Form.Group style={{ marginTop: 10 }}>
            <Form.Control type="text"
              placeholder="Numéro SIRET" onChange={(e) => setNumeroSiret(e.target.value)} />
          </Form.Group>
          </div>
        ) : (
          <div></div>
        )}
        </div>

        <Divider style={{ marginTop: 30 }}>
          <h4 style={{ color: '#80b3ff' }}>Informations de connexion</h4>
        </Divider>
        <Form.Group style={{ marginTop: 10 }}>
          <Form.Control type="email"
            placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group style={{ marginTop: 10 }}>
          <Form.Control type="text"
            placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: 30, marginBottom:30 }}>
          Inscrire
        </Button>
      </Form>

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

export default InscrirePage;
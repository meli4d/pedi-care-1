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

function InscrirePage() {

  const [nom, setName] = useState();
  const [prenom, setPrenom] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [telephone, setTelephone] = useState();
  const [message, setMessage] = useState();
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addUser = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post('http://localhost:3001/api/auth/signup', { nom, prenom, email, password, telephone });
      console.log(response);
      if (response.status === 200) {
        navigation('/');
      }else if(response.status === 201){
        handleClickOpen()
        setMessage(response.data.message)
      }else{

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
        marginTop: 100
      }} onSubmit={addUser}>
        <h3 style={{ textAlign: 'center' }}>Inscription à PediCare</h3>
        <Form.Group style={{ marginTop: 30 }}>
          <Form.Control type="text"
            placeholder="Nom" onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group style={{ marginTop: 15 }}>
          <Form.Control type="text"
            placeholder="Prénom" onChange={(e) => setPrenom(e.target.value)} />
        </Form.Group>
        <Form.Group style={{ marginTop: 15 }}>
          <Form.Control type="text"
            placeholder="Téléphone" onChange={(e) => setTelephone(e.target.value)} />
        </Form.Group>
        <Form.Group style={{ marginTop: 15 }}>
          <Form.Control type="email"
            placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group style={{ marginTop: 15 }}>
          <Form.Control type="text"
            placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: 30 }}>
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
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../assets/images/logo-pedicare.png'
import '../App.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function LoginPage() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getUser = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post('http://localhost:3001/api/auth/login', {  email, password});
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem("token", response.data.token);
        navigation('/home');
      }
    } catch (error) {
      localStorage.removeItem("token");
      handleClickOpen()
      setMessage(error.response.data.message)
    }
  };

  return (
    <div>
      <img src={logo} alt="logo" className='APP-logo' width="250" height="250"/>
      <Form style={{ display: 'block',  
                  width: 500,  
                   margin: "auto"}} onSubmit={getUser}>
        <Form.Group>
          <Form.Control type="email"
            placeholder="Email / Téléphone" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group style={{marginTop:30}}>
          <Form.Control type="password"
            placeholder="Mot de passe"  onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop:30}}>
          Se connecter
        </Button>
        <div style={{marginTop:30}}>Nouveau sur Pedi Care ? <Link to="/inscrire">S'inscrire</Link></div>
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

export default LoginPage;
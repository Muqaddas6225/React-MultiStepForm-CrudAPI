import React from 'react'
import {Typography, Box, Grid, TextField, Button,InputLabel} from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditComponant = () => {

  
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [student ,setStudent] = useState({
        Fname :'',
        Lname :'',
        contact :'', 
        email :'',
        address :'',
        designation:''
}
);
const [formErrors, setFormErrors] = useState({});
// const [isSubmit, setIsSubmit] = useState(false);
 
    useEffect(()=>{
      async function getStudent(){
          try{
              const student = await axios.get(`http://localhost:3001/students/${id}`)
              // console.log(student.data)
              setStudent(student.data)
          }catch(error){
              console.log('somthing wrong')
          }
      }    

      getStudent(id);
    }, [])

    
    function onTextFieldChange(e){
      setStudent({
          ...student,
          [e.target.name] : e.target.value
      })
      // console.log(student);
  }

    async function onFormSubmit(e){
      e.preventDefault()
      validate(student)
     
      // if (Object.keys(formErrors).length === 0 && isSubmit) {
      //   console.log(student);
      //   try{
      //     await axios.put(`http://localhost:3001/students/${id}`, student)
      //     navigate('/')
      //   }catch(error){
      //     console.log('somthing wrong')
      // }
      // }
    
  }

    
  function handleClick(){
    navigate('/');
}

const validate = async (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const re = /^[0-9\b]+$/;
  const regName = /^[A-Za-z]+[a-zA-Z]$/;

   //validate first name
  if (!values.Fname) {
    errors.Fname = "First name is required!";
  }else if (!regName.test(values.Fname)) {
      errors.Fname = "Input must be in characters!";
    }

     //validate last name
  if (!values.Lname) {
    errors.Lname = "Last name is required!";
  }else if (!regName.test(values.Lname)) {
      errors.Lname = "Input must be in characters!";
    }

     //validate contact
  if (!values.contact) {
    errors.contact = "Contact is required!";
    }else if (values.contact.length < 11) {
      errors.contact = "contact must be of 11 characters";
    } else if (values.contact.length > 11) {
      errors.contact = "contact cannot exceed more than 11 characters";
    }else if (!re.test(values.contact)) {
      errors.contact = "Input must be in number!";
    }

     //validate email
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }

  //validate address
  if (!values.address) {
    errors.address = "Address is required";
  } 
  
  //validate designation
  if (!values.designation) {
    errors.designation = "Designation is required";
  } 
  
  if (Object.keys(errors).length === 0  ) {
    try{
      await axios.put(`http://localhost:3001/students/${id}`, student)
      navigate('/')
    }catch(error){
      console.log('somthing wrong')
    }
  }
else {
    setFormErrors(errors)
}

 
};



  return (
    <>
    <Box textAlign="center" p={2}  mb={2}>
     <Typography variant="h2" backgroundColor='primary.main'>Form</Typography>
    </Box>
  
    <Grid container justify="center" spacing={4}>
     <Grid item md={6} xs={12}>
      <Box textAlign="center" p={4} mb={2}>
       <Typography variant="h3" backgroundColor="secondary.main">Edit Employee</Typography>
      </Box>
      <form>
       <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6}>
          
         <TextField  autoComplete="id" name="id" variant="standard" required fullWidth id="id"   autoFocus value={id} disabled />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <Box>
            <InputLabel>First Name</InputLabel>
            <TextField autoComplete="Fname"  name="Fname" variant="standard" required fullWidth id="Fname"   onChange={e=>onTextFieldChange(e)} value={student.Fname}/>
            <Typography color='red' variant='p'>{formErrors.Fname}</Typography>
                       
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box> 
            <InputLabel>Last Name</InputLabel>
            <TextField autoComplete="Lname" name="Lname" variant="standard" required fullWidth id="Lname"   onChange={e=>onTextFieldChange(e)} value={student.Lname}/>
            <Typography variant='p'color='red'>{formErrors.Lname}</Typography>
          </Box>
         </Grid>

        <Grid item xs={12} sm={6}>
            <Box> 
              <InputLabel>Contact</InputLabel>
              <TextField autoComplete="contact" name="contact" variant="standard" required fullWidth id="contact"   onChange={e=>onTextFieldChange(e)} value={student.contact}/> 
              <Typography color='red' variant='p'>{formErrors.contact}</Typography>     
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box> 
              <InputLabel>Email</InputLabel>
              <TextField autoComplete="email" name="email" variant="standard" required fullWidth id="email"  onChange={e=>onTextFieldChange(e)} value={student.email} />
              <Typography color='red' variant='p'>{formErrors.email}</Typography>
           </Box> 
        </Grid>

        <Grid item xs={12}>
          <Box> 
              <InputLabel>Address</InputLabel>
              <TextField autoComplete="address" name="address" variant="standard" required fullWidth id="adress"   onChange={e=>onTextFieldChange(e)} value={student.address} />
              <Typography color='red' variant='p'>{formErrors.address}</Typography>
          </Box>  
        </Grid>
        <Grid item xs={12}>
            <Box> 
                <InputLabel>Designation</InputLabel>
                <TextField autoComplete="designation" name="designation" variant="standard" required fullWidth id="Designation"  onChange={e=>onTextFieldChange(e)} value={student.designation} />
                <Typography color='red' variant='p'>{formErrors.designation}</Typography>
             </Box>
        </Grid>
       </Grid>
       
       <Box m={3}>
        <Button type="button" variant="contained" color="primary" fullWidth onClick={e=> onFormSubmit(e)} > Update </Button>
       </Box>
      </form>
      <Box m={3} textAlign="center">
       <Button variant="contained" color="primary"  onClick={handleClick}>Back to Home</Button>
      </Box>
     </Grid>
    </Grid>
   </>
  )
}

export default EditComponant
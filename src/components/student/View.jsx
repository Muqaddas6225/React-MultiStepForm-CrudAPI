import React from 'react'
import { Typography, Box,TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button} from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
 
    const {id} = useParams();
    const navigate = useNavigate();

    // console.log(id)

    const [student, setStudent] = useState([]);

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
   
    function handleClick(){
        navigate('/');
    }


  return (
    <>
    <Box textAlign="center" p={2} backgroundColor="primary">
     <Typography variant="h4">Student Detail</Typography>
    </Box>
    <TableContainer component={Paper}>
     <Table>
      <TableHead>
       <TableRow style={{ backgroundColor: "#616161" }}>
        <TableCell align="center" >ID</TableCell>
        <TableCell align="center" >First Name</TableCell>
        <TableCell align="center" >Last Name</TableCell>
        <TableCell align="center" >Conatct</TableCell>
        <TableCell align="center" >Email</TableCell>
        <TableCell align="center" >Address</TableCell>
        <TableCell align="center" >Designation</TableCell>
       </TableRow>
      </TableHead>
      <TableBody>
       <TableRow>
        <TableCell align="center">{student.id}</TableCell>
        <TableCell align="center">{student.Fname}</TableCell>
        <TableCell align="center">{student.Lname}</TableCell>
        <TableCell align="center">{student.contact}</TableCell>
        <TableCell align="center">{student.email}</TableCell>
        <TableCell align="center">{student.address}</TableCell>
        <TableCell align="center">{student.designation}</TableCell>
       </TableRow>
      </TableBody>
     </Table>
    </TableContainer>
    <Box m={3} textAlign="center">
     <Button variant="contained" color="primary" onClick={handleClick} >Back to Home</Button>
    </Box>
   </>
  )
}

export default View
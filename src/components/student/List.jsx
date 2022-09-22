import React, {useState, useEffect} from 'react'
import { Typography, Box,TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip} from '@mui/material';
import {Visibility, Edit, Delete} from "@mui/icons-material"
import { Link } from "react-router-dom";
import axios from "axios";


const List = () => {

    const [students, setStudents] = useState([]);

    useEffect(()=>{
        
        async function getAllStudent(){
            try{
                const students = await axios.get("http://localhost:3001/students")
            //     console.log(students.data)
                setStudents(students.data)
            }catch(error){
                console.log('somthing wrong')
            }
        }

        getAllStudent();
    }, [])
   
    const handleDelete = async id =>{
        await axios.delete(`http://localhost:3001/students/${id}`)
        var newEmployee = students.filter((item) =>{
            return item.id !== id;
        })
        setStudents(newEmployee);
    }


  return (
    <> 
   <Box textAlign="center" p={2} sx={{backgroundColor:'secondary.main'}}>
    <Typography variant="h4">Employee List</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" sx={{backgroundColor:'primary.main'}}>No</TableCell>
       <TableCell align="center" sx={{backgroundColor:'primary.main'}}>First Name</TableCell>
       <TableCell align="center" sx={{backgroundColor:'primary.main'}}>Last Name</TableCell>
       <TableCell align="center" sx={{backgroundColor:'primary.main'}}>Contact</TableCell>
       <TableCell align="center" sx={{backgroundColor:'primary.main'}}>Email</TableCell>
       <TableCell align="center" sx={{backgroundColor:'primary.main'}}>Address</TableCell>
       <TableCell align="center" sx={{backgroundColor:'primary.main'}}>Designation</TableCell>
       <TableCell align="center" sx={{backgroundColor:'primary.main'}}>Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
       {
        students.map((student, i) => {
            return(
                <TableRow key={i}>
                    <TableCell align="center">{i+1}</TableCell>
                    <TableCell align="center">{student.Fname}</TableCell>
                    <TableCell align="center">{student.Lname}</TableCell>
                    <TableCell align="center">{student.contact}</TableCell>
                    <TableCell align="center">{student.email}</TableCell>
                    <TableCell align="center">{student.address}</TableCell>
                    <TableCell align="center">{student.designation}</TableCell>

                    <TableCell align="center">
                    <Tooltip title="View">
                        <IconButton><Link to ={`view/${student.id}`}><Visibility color="primary" /></Link></IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton><Link to ={`edit/${student.id}`}><Edit color="secondary" /> </Link></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={()=> handleDelete(student.id)}><Delete color="warning" /></IconButton>
                    </Tooltip>
                    </TableCell>
                    </TableRow>
            )
        })
       }
     </TableBody>
    </Table>
   </TableContainer></>
   
  )
}

export default List
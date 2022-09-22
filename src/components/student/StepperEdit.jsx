import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {StepLabel, Step, Stepper, Typography, Box, Grid,TextField, Button } from '@mui/material';
import axios from 'axios'
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";

const StepperEdit = () => {
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

  const method = useForm({
    defaultValues:{
        Fname : `${student.Fname}`,
        Lname : `${student.Lname}`,
        contact : `${student.contact}`,
        email : `${student.email}`,
        address : `${student.address}`,
        designation : `${student.designation}`,

    }
  });

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
}
    
function getSteps() {
    return [
      "Employee Name",
      "Contact Information",
      "Residance Information",
      "Validate Information"
    ];
  }
  const BasicForm = () => {
    const {control, formState: { errors }} = useFormContext();
    console.log(errors);
    return (
      <>
        <Controller
          control={control}
          name="Fname"
        //   rules={{ required: "This field is required.", pattern: /^[A-Za-z]+$/i  }}
          render={({ field }) => (
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              placeholder="Enter Your First Name"
              fullWidth
              margin="normal"
              {...field}
              onChange={e=>onTextFieldChange(e)}
              error={Boolean(errors?.Fname)}
              helperText={errors.Fname?.message}
            />
          )}
        />
  
        <Controller
          control={control}
          name="Lname"
          rules={{ required: "This field is required.", pattern: /^[A-Za-z]+$/i  }}
          render={({ field }) => (
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              placeholder="Enter Your Last Name"
              fullWidth
              onChange={e=>onTextFieldChange(e)}
              margin="normal"
              {...field}
              error={Boolean(errors?.Lname)}
              helperText={errors.Lname?.message}
            />
          )}
        />
      </>
    );
  };
  const ContactForm = () => {
    const {control, formState: { errors }} = useFormContext();
    
    return (
      <>
          <Controller
          control={control}
          name="email"
          rules={{ required: "This field is required.", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i  }}
          render={({ field }) => (
            <TextField
              id="Email"
              label="Email"
              variant="outlined"
              placeholder="Enter Your email"
              fullWidth
              margin="normal"
              onChange={e=>onTextFieldChange(e)}
              {...field}
              error={Boolean(errors?.email)}
              helperText={errors.email?.message}
            />
            )}
        />
        <Controller
          control={control}
          name="contact"
           rules={{ required: "This field is required.", pattern:  /^[0-9\b]+$/  }}
          render={({ field }) => (
            <TextField
             
              id="phone-number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your Phone Number"
              fullWidth 
              onChange={e=>onTextFieldChange(e)}
              margin="normal"
              {...field}
              error={Boolean(errors?.contact)}
              helperText={errors.contact?.message}
            />
          )}
        />
       
      </>
    );
  };
  const PersonalForm = () => {
    const {control, formState: { errors }} = useFormContext();
    
    return (
      <>
        <Controller
          control={control}
          name="address"
          rules={{ required: "This field is required." }}
          render={({ field }) => (
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              placeholder="Enter Your Address "
              fullWidth
              onChange={e=>onTextFieldChange(e)}
              margin="normal"
              {...field}
              error={Boolean(errors?.address)}
              helperText={errors.address?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="designation"
          rules={{ required: "This field is required." }}
          render={({ field }) => (
            <TextField
              id="designation"
              label="Designation"
              variant="outlined"
              placeholder="Enter Your Designation"
              fullWidth
              onChange={e=>onTextFieldChange(e)}
              margin="normal"
              {...field}
              error={Boolean(errors?.designation)}
              helperText={errors.designation?.message}
            />
          )}
        />
      </>
    );
  };

  const ValidationForm = (props) => {
    return (
      <Box fullWidth>
          <Box  flex sx={{flexDirection:'column', justifyContent:'center', alignItems :'center', gap :'20px'}}>
            <Box mb={2} flex sx={{flexDirection:'row'}}>
              <Typography variant="h4" color="primary.main">First Name : </Typography>
              <Typography variant='h4' color="secondary.main" p={1} boxShadow={1} sx={{borderBottom:'1px solid #3f50b5'}}>{props.data.Fname}</Typography>
            </Box>
            <Box mb={2} flex sx={{flexDirection:'row'}}>
              <Typography variant="h4" color="primary.main">Last Name : </Typography>
              <Typography variant='h4' color="secondary.main" p={1} boxShadow={1} sx={{borderBottom:'1px solid #3f50b5'}}>{props.data.Lname}</Typography>
            </Box>
            <Box mb={2} flex sx={{flexDirection:'row'}}>
              <Typography variant="h4" color="primary.main">Contact : </Typography>
              <Typography variant='h4' color="secondary.main" p={1} boxShadow={1} sx={{borderBottom:'1px solid #3f50b5'}}>{props.data.contact}</Typography>
            </Box>
            <Box mb={2} flex sx={{flexDirection:'row', flexWrap :'wrap'}}>
              <Typography variant="h4" color="primary.main">Email : </Typography>
              <Typography noWrap  variant="h4" color="secondary.main" p={1} boxShadow={1} sx={{borderBottom:'1px solid #3f50b5'}}>{props.data.email}</Typography>
            </Box>
            <Box mb={2} flex sx={{flexDirection:'row'}}>
               <Typography variant="h4" color="primary.main">Address: </Typography>  
              <Typography variant='h4' color="secondary.main" p={1} boxShadow={1} sx={{borderBottom:'1px solid #3f50b5'}}>{props.data.address}</Typography>
            </Box>
             
            <Box mb={2} flex sx={{flexDirection:'row'}}>
            <Typography variant="h4" color="primary.main">Designation : </Typography>
              <Typography variant='h4' color="secondary.main" p={1} boxShadow={1} sx={{borderBottom:'1px solid #3f50b5'}}>{props.data.designation}</Typography>
            </Box>
             
          </Box> 
      </Box>
    );
  };

const [activeStep, setActiveStep] = useState(0);

const steps = getSteps();

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <ValidationForm data={student} />;

    default:
      return "Your data is here";
  }
}

const isStepOptional = (step) => {
  return step === 3 
};

const isStepFalied = () => {
  return Boolean(Object.keys(method.formState.errors).length);
};


const handleNext = async (data) => {
  console.log(data);
  setStudent(data)
  if (activeStep === steps.length-1) {
      setActiveStep(activeStep + 1);
      try{
              await axios.put(`http://localhost:3001/students/${id}`, student)
              navigate('/')
            }catch(error){
              console.log('somthing wrong')
            }
  } else {
    setActiveStep(activeStep + 1);
  }
};
console.log(student , 'methodmethod');


const handleBack = () => {
  setActiveStep(activeStep - 1);
};

  function handleClick(){
    navigate('/');
}

// const validate = async (values) => {
//   const errors = {};
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//   const re = /^[0-9\b]+$/;
//   const regName = /^[A-Za-z]+[a-zA-Z]$/;

//    //validate first name
//   if (!values.Fname) {
//     errors.Fname = "First name is required!";
//   }else if (!regName.test(values.Fname)) {
//       errors.Fname = "Input must be in characters!";
//     }

//      //validate last name
//   if (!values.Lname) {
//     errors.Lname = "Last name is required!";
//   }else if (!regName.test(values.Lname)) {
//       errors.Lname = "Input must be in characters!";
//     }

//      //validate contact
//   if (!values.contact) {
//     errors.contact = "Contact is required!";
//     }else if (values.contact.length < 11) {
//       errors.contact = "contact must be of 11 characters";
//     } else if (values.contact.length > 11) {
//       errors.contact = "contact cannot exceed more than 11 characters";
//     }else if (!re.test(values.contact)) {
//       errors.contact = "Input must be in number!";
//     }

//      //validate email
//   if (!values.email) {
//     errors.email = "Email is required!";
//   } else if (!regex.test(values.email)) {
//     errors.email = "This is not a valid email format!";
//   }

//   //validate address
//   if (!values.address) {
//     errors.address = "Address is required";
//   } 
  
//   //validate designation
//   if (!values.designation) {
//     errors.designation = "Designation is required";
//   } 
  
//   if (Object.keys(errors).length === 0  ) {
//     try{
//       await axios.put(`http://localhost:3001/students/${id}`, student)
//       navigate('/')
//     }catch(error){
//       console.log('somthing wrong')
//     }
//   }
// else {
//     setFormErrors(errors)
// }

 
// };



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
      {/* <form>
       <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          
         <TextField  autoComplete="id" name="id" variant="standard" required fullWidth id="id"   autoFocus value={id} disabled />
        </Grid>
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
      </form> */}
      <Box>
                    <Stepper flex sx={{flexWrap :'wrap'}} alternativeLabel activeStep={activeStep}>
                        {steps.map((step, index) => {
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                            <Typography
                                variant="caption"
                                align="center"
                                style={{ display: "block" }}
                            >
                                optional
                            </Typography>
                            );
                        }
                        if (isStepFalied() && activeStep === index) {
                            labelProps.error = true;
                        }
                        return (
                            <Step key={index}>
                            <StepLabel {...labelProps}>{step}</StepLabel>
                            </Step>
                        );
                        })}
                    </Stepper>
                    <FormProvider {...method}>
                        <form onSubmit={method.handleSubmit(handleNext)}>
                            {getStepContent(activeStep)}
                            
                            <Button
                               
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                back
                            </Button>
                            <Button
                                sx={{marginLeft:"30px"}}
                                variant="contained"
                                color="primary"
                                type ="submit"
                            >
                              {activeStep === steps.length-1 ? "Update" : "Next"}
                            </Button>
                            </form>
                    </FormProvider>
                </Box>

      <Box m={3} textAlign="center">
       <Button variant="contained" color="primary"  onClick={handleClick}>Back to Home</Button>
      </Box>
     </Grid>
    </Grid>
   </>
  )
}

export default StepperEdit
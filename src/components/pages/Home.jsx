import React, {useState} from 'react'
import {StepLabel, Step, Stepper, Typography, Box, Grid, TextField, Button } from '@mui/material';
import axios from 'axios'
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import List from '../student/List';

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
          rules={{ required: "This field is required.", pattern: /^[A-Za-z]+$/i  }}
          render={({ field }) => (
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              placeholder="Enter Your First Name"
              fullWidth
              margin="normal"
              {...field}
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
              margin="normal"
            //   onChange={e => onTextFieldChange(e)}
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
            //   onChange={e => onTextFieldChange(e)}
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
            //   onChange={e => onTextFieldChange(e)}
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
    // const [showData, setShowData] = useState(false);

    return (
      <Box fullWidth>
       {/* {
        showData ? ( */}
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
              {/* <TextField
                sx={{boxShadow:'2', color :'secondary.main'}}
                id="outlined-read-only-input"
                variant='filled'
                defaultValue={props.data.email}
                InputProps={{
                  readOnly: true,
                }}
              /> */}
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
        {/* ): null 
      }
      <Button sx={{margin:'20px', marginLeft:{md:'100px'}}} variant="contained" onClick={() => setShowData(true)}>Review Information</Button>
         */}
      </Box>
    );
  };

const Home = () => {
    const method = useForm({
        defaultValues: {
            Fname :'',
            Lname :'',
            contact :'', 
            email :'',
            address :'',
            designation:''
        },
      });

    // state handle the data get from api
    // const [student ,setStudent] = useState({
    //     Fname :'',
    //     Lname :'',
    //     contact :'', 
    //     email :'',
    //     address :'',
    //     designation:''

    // }
    // );

    // state for handling form errors
    // const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState(false);

    // state for navigating to the home page
      
      const [status, setStatus] = useState();
      const [activeStep, setActiveStep] = useState(0);
      const [data, setdata] = useState(null)
      
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
            return <ValidationForm data={data} />;

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
      // const isStepSkipped = (step) => {
      //   return skippedSteps.includes(step);
      // };
    
      const handleNext = async (data) => {
        console.log(data);
        setdata(data)
        if (activeStep === steps.length-1) {
            setActiveStep(activeStep + 1);
            try{
                await axios.post(`http://localhost:3001/students`, data)
                setStatus(true); 
            }catch(error){
                console.log('somthing wrong')
                 }
        } else {
          setActiveStep(activeStep + 1);
        }
      };
      console.log(data , 'methodmethod');

      if(status){
        return <Home/>
    }
    
      const handleBack = () => {
        setActiveStep(activeStep - 1);
      };
  

  return (
    <Box>
         <Box sx={{textAlign:"center", backgroundColor:"primary.main"}}  p={2} mb={2}>
            <Typography variant="h3">Form</Typography>
        </Box>
        <Grid container justify="center" spacing={4}>
            <Grid item  xs={12}>
                <List /> 
            </Grid>

            {/* Add employees data */}
            {/* <Grid item md={6} xs={12}>
            <Box sx={{textAlign:"center"}} p={2}  mb={2}>
                <Typography variant="h4">Add Employee</Typography>
            </Box>
            <form action='submit' >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <InputLabel>First Name</InputLabel>
                            <TextField sx={{textAlign:"center"}} autoComplete="Fname" 
                                name="Fname"
                                type='text'
                                variant="standard"
                                required={true}
                                fullWidth id="Fname"
                                onChange={e => onTextFieldChange(e)}
                            />
                            <Typography color='red' variant='p'>{formErrors?.Fname}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box> 
                            <InputLabel>Last Name</InputLabel>
                            <TextField sx={{textAlign:"center"}} autoComplete="Lname"
                               name="Lname"
                               type='text'
                               variant="standard" 
                               required={true}
                               fullWidth 
                               id="Lname" 
                               onChange={e => onTextFieldChange(e)}
                            //    inputRef={register("Last name",{
                            //     required: "Last Name is required.",
                            //     })}
                               />
                                <Typography variant='p'color='red'>{formErrors?.Lname}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box> 
                             <InputLabel>Contact</InputLabel>
                            <TextField sx={{textAlign:"center"}} autoComplete="contact"
                                name="contact"
                                variant="standard"
                                required={true}
                                fullWidth
                                id="contact"
                                onChange={e => onTextFieldChange(e)}/>
                                 <Typography color='red' variant='p'>{formErrors?.contact}</Typography>
                        </Box>
                    </Grid>
                   
                    <Grid item xs={12}>
                        <Box> 
                            <InputLabel>Email</InputLabel>
                            <TextField sx={{textAlign:"center"}}
                               autoComplete="email" name="email"
                               variant="standard" required fullWidth
                               id="email"
                               type='email'
                               onChange={e => onTextFieldChange(e)} />
                                <Typography color='red' variant='p'>{formErrors?.email}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box> 
                            <InputLabel>Address</InputLabel>
                            <TextField sx={{textAlign:"center"}} 
                             autoComplete="address" name="address" 
                             variant="standard" required
                             type='text'
                             fullWidth id="address"  
                             onChange={e => onTextFieldChange(e)}/>
                              <Typography color='red' variant='p'>{formErrors?.address}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box> 
                            <InputLabel>Designation</InputLabel>
                            <TextField sx={{textAlign:"center"}} 
                             autoComplete="designation" 
                             type='text'
                             name="designation" 
                             variant="standard" required fullWidth 
                             id="desigation" 
                             onChange={e => onTextFieldChange(e)}/>
                              <Typography color='red' variant='p'>{formErrors?.designation}</Typography>
                        </Box>
                    </Grid>

                </Grid>
                <Box m={3}>
                    <Button type="submit" onClick={(e)=>onFormSubmit(e)}  variant="contained" color="primary" fullWidth>Add</Button>
                </Box>
            </form>
            </Grid> */}
            <Grid item md={6} xs={12}>
                <Box sx={{textAlign:"center"}} p={2}  mb={2}>
                    <Typography variant="h4">Add Employee</Typography>
                </Box>
                {/* <Formik
                    initialValues={{
                        name:'',
                        email:''
                    }}
                    onSubmit= {values=>{
                        alert(JSON.stringify(values,null,2))
                    }}
                    validationSchema ={validationSchema}
                >
                    {(formik) => <form onSubmit = {formik.handleSubmit}>
                        <TextField
                          variant='standard' fullWidth id="name" 
                          name='name' label='Name' value={formik.values.name}
                          onChange= {formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name }
                        />
                        <TextField
                          variant='standard' fullWidth id="emal" 
                          name='email' label='Email' value={formik.values.email}
                          onChange= {formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email }
                        />
                        <Button sx={{marginTop:  "20px"}} type="submit" color="primary" variant="contained" fullWidth>
                            submit
                        </Button>
                    </form>}
                </Formik> */}
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
                    {/* {activeStep === steps.length ? (
                      <Button fullWidth sx={{backgroundColor:"lightblue", color:"secondary.main"}} onClick={()=>{
                         setActiveStep(0);
                        
                      }}>Add</Button>

                    ) : ( 
                        <> */}
                       
                        <form onSubmit={method.handleSubmit(handleNext)}>
                            {getStepContent(activeStep)}
                            
                            <Button
                               
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                back
                            </Button>
                            {/* {isStepOptional(activeStep) && (
                                <Button
                                 sx={{marginLeft:"20px"}}
                                variant="contained"
                                color="primary"
                               onClick={handleSkip}
                                >
                                Review
                                </Button>
                            )} */}
                            <Button
                                sx={{marginLeft:"30px"}}
                                variant="contained"
                                color="primary"
                                type ="submit"
                            >
                              {activeStep === steps.length-1 ? "Submit" : "Next"}
                            </Button>
                            </form>
{/*                        
                        </>
                    )} */}
                    </FormProvider>
                </Box>
            </Grid>
        </Grid> 
    </Box>
  )
}

export default Home
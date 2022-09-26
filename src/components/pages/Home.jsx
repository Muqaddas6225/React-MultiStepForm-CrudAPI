import React, { useState } from "react";
import {
  StepLabel,
  Step,
  Stepper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import List from "../student/List";
import * as yup from "yup";

const schema = yup.object().shape({
  PImg: yup
    .mixed()
    .required("you need to provide a file")
    .test("fileDimentions", "Incorect file dimention", (value) => {
      let img = new Image();
      // img.src = window.URL.createObjectURL(file)
      // img.src = file
      const selectedImg = value;
      img.src = window.URL.createObjectURL(selectedImg);
      console.log(img);
      img.onload = () => {
        if (img.width === 1024 && img.height === 1024) {
          alert("Correct size 1024*500");
          console.log("correct size");
          return selectedImg;
        } else if (img.width === 500 && img.height === 1000) {
          alert("Correct size");
          console.log("correct size");
          return selectedImg;
        } else {
          console.log("incorrect img");
          alert(`Sorry, this image doesn't look like the size we wanted. It's 
          ${img.width} x ${img.height} but we require 1024 x 1024 size image.`);
          return null;
        }
      };
    }),
});

const Home = () => {
  const method = useForm(
    {
      validationSchema:schema
    },{
    defaultValues: {
      Fname: "",
      Lname: "",
      PImg: "",
      CImg: "",
      contact: "",
      email: "",
      address: "",
      designation: "",
    },
  });

  // state for navigating to the home page

  const [status, setStatus] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setdata] = useState(null);
  const [fieldValue, setFieldValue] = useState()

  function getSteps() {
    return [
      "Employee details",
      "Contact Information",
      "Residance Information",
      "Validate Information",
    ];
  }

  const ValidatePimg = (e) => {
    let img = new Image();
    // img.src = window.URL.createObjectURL(file)
    // img.src = file
    const selectedImg = e.target.files[0];
    img.src = window.URL.createObjectURL(selectedImg);
    console.log(img);
    img.onload = () => {
      if (img.width === 1024 && img.height === 1024) {
        alert("correct size 1024*1024");
        console.log("correct size 1024*1024");
        setFieldValue(selectedImg)
        // return selectedImg;
      } else {
        console.log("incorrect img");
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
            ${img.width} x ${img.height} but we require 1024 x 1024 size image.`);
        setFieldValue(null)
        // return null;
      }
    };
  };
  const ValidateCimg = (e) => {
    let img = new Image();
    // img.src = window.URL.createObjectURL(file)
    // img.src = file
    const selectedImg = e.target.files[0];
    img.src = window.URL.createObjectURL(selectedImg);
    console.log(img);
    img.onload = () => {
     if (img.width === 500 && img.height === 1000) {
        alert("correct size 500*1000");
        console.log("correct size 500*1000");
        setFieldValue(selectedImg)
        return selectedImg;
      } else {
        console.log("incorrect img");
        alert(`Sorry, this image doesn't look like the size we wanted. It's 
            ${img.width} x ${img.height} but we require 500 x 1000 size image.`);
        setFieldValue(null)
        return null;
      }
    };
  };

  const BasicForm = () => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    console.log(errors);
    return (
      <>
        <Controller
          control={control}
          name="Fname"
          rules={{
            required: "This field is required.",
            pattern: /^[A-Za-z]+$/i,
          }}
          render={({ field }) => (
            <TextField
              // height="46px"
              // sx={{height:"46px"}}
              id="first-name"
              label="First Name"
              size="large"
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
          rules={{
            required: "This field is required.",
            pattern: /^[A-Za-z]+$/i,
          }}
          render={({ field }) => (
            <TextField
              sx={{ height: "46px" }}
              id="last-name"
              label="Last Name"
              variant="outlined"
              placeholder="Enter Your Last Name"
              fullWidth
              margin="normal"
              {...field}
              error={Boolean(errors?.Lname)}
              helperText={errors.Lname?.message}
            />
          )}
        />
        <InputLabel>Profile Picture</InputLabel>
        <Controller
          control={control}
          name="PImg"
          // rules={{ required: "This field is required."}}
          render={({ field }) => {
            // console.log(field)
            return (
              <TextField
                variant="standard"
                border="none"
                type="file"
                id="PImg"
                {...field}
                // {...field.onChange((e)=>validateimg(e))}
              //  / {...field.onChange(fieldValue)}
                onChange={(e)=>ValidatePimg(e)}
                // onChange={onChange(Validateimg)}
                // error={Boolean(errors?.PImg)}
                // helperText={errors.PImg?.message}
              />
            );
          }}
        />
        <InputLabel>Cover Picture</InputLabel>
        <Controller
          control={control}
          name="CImg"
          // rules={{ required: "This field is required."}}
          // onChange={(params) => Validateimg(params)}
          render={( {field: { onChange, onBlur, value, name, ref }}) => (
            <TextField
              variant="standard"
              border="none"
              type="file"
              name="CImg"
              id="CImg"
              // {...field}
              onChange={(e)=>ValidateCimg(e)}
              value={fieldValue}
              // onChange={onChange((e)=>ValidateCimg(e))}
              // error={Boolean(errors?.PImg)}
              // helperText={errors.PImg?.message}
            />
          )}
        />

        {/* <input type='file' onChange={(e)=>validateimg(e)}/> */}
      </>
    );
  };
  const ContactForm = () => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "This field is required.",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
          }}
          render={({ field }) => (
            <TextField
              sx={{ height: "46px" }}
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
          rules={{ required: "This field is required.", pattern: /^[0-9\b]+$/ }}
          render={({ field }) => (
            <TextField
              sx={{ height: "46px" }}
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
    const {
      control,
      formState: { errors },
    } = useFormContext();

    return (
      <>
        <Controller
          control={control}
          name="address"
          rules={{ required: "This field is required." }}
          render={({ field }) => (
            <TextField
              sx={{ height: "46px" }}
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
              sx={{ height: "46px" }}
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
        <Box
          flex
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Box mb={2} flex sx={{ flexDirection: "row" }}>
            <Typography variant="h4" color="primary.main">
              First Name :{" "}
            </Typography>
            <Typography
              variant="h4"
              color="secondary.main"
              p={1}
              boxShadow={1}
              sx={{ borderBottom: "1px solid #3f50b5" }}
            >
              {props.data.Fname}
            </Typography>
          </Box>
          <Box mb={2} flex sx={{ flexDirection: "row" }}>
            <Typography variant="h4" color="primary.main">
              Last Name :{" "}
            </Typography>
            <Typography
              variant="h4"
              color="secondary.main"
              p={1}
              boxShadow={1}
              sx={{ borderBottom: "1px solid #3f50b5" }}
            >
              {props.data.Lname}
            </Typography>
          </Box>
          <Box mb={2} flex sx={{ flexDirection: "row" }}>
            <Typography variant="h4" color="primary.main">
              Profile Pic :{" "}
            </Typography>
            <Typography
              variant="h4"
              color="secondary.main"
              p={1}
              boxShadow={1}
              sx={{ borderBottom: "1px solid #3f50b5" }}
            >
              {props.data.PImg}
            </Typography>
          </Box>
          <Box mb={2} flex sx={{ flexDirection: "row" }}>
            <Typography variant="h4" color="primary.main">
              Cover photo :{" "}
            </Typography>
            <Typography
              variant="h4"
              color="secondary.main"
              p={1}
              boxShadow={1}
              sx={{ borderBottom: "1px solid #3f50b5" }}
            >
              {props.data.CImg}
            </Typography>
          </Box>
          <Box mb={2} flex sx={{ flexDirection: "row" }}>
            <Typography variant="h4" color="primary.main">
              Contact :{" "}
            </Typography>
            <Typography
              variant="h4"
              color="secondary.main"
              p={1}
              boxShadow={1}
              sx={{ borderBottom: "1px solid #3f50b5" }}
            >
              {props.data.contact}
            </Typography>
          </Box>
          <Box mb={2} flex sx={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Typography variant="h4" color="primary.main">
              Email :{" "}
            </Typography>
            <Typography
              noWrap
              variant="h4"
              color="secondary.main"
              p={1}
              boxShadow={1}
              sx={{ borderBottom: "1px solid #3f50b5" }}
            >
              {props.data.email}
            </Typography>
          </Box>
          <Box mb={2} flex sx={{ flexDirection: "row" }}>
            <Typography variant="h4" color="primary.main">
              Address:{" "}
            </Typography>
            <Typography
              variant="h4"
              color="secondary.main"
              p={1}
              boxShadow={1}
              sx={{ borderBottom: "1px solid #3f50b5" }}
            >
              {props.data.address}
            </Typography>
          </Box>

          <Box mb={2} flex sx={{ flexDirection: "row" }}>
            <Typography variant="h4" color="primary.main">
              Designation :{" "}
            </Typography>
            <Typography
              variant="h4"
              color="secondary.main"
              p={1}
              boxShadow={1}
              sx={{ borderBottom: "1px solid #3f50b5" }}
            >
              {props.data.designation}
            </Typography>
          </Box>
        </Box>
        {/* ): null 
        }
        <Button sx={{margin:'20px', marginLeft:{md:'100px'}}} variant="contained" onClick={() => setShowData(true)}>Review Information</Button>
          */}
      </Box>
    );
  };

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
    return step === 3;
  };

  const isStepFalied = () => {
    return Boolean(Object.keys(method.formState.errors).length);
  };

  const handleNext = async (data) => {
    data.preventDefault()
    console.log(data);
    setdata(data);
    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep + 1);
      try {
        await axios.post(`http://localhost:3001/students`, data);
        setStatus(true);
      } catch (error) {
        console.log("somthing wrong");
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  console.log(data, "methodmethod");

  if (status) {
    return <Home />;
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box>
      <Box
        sx={{ textAlign: "center", backgroundColor: "primary.main" }}
        p={2}
        mb={2}
      >
        <Typography variant="h3">Form</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box
            sx={{ textAlign: "center", backgroundColor: "secondary.main" }}
            p={2}
            mb={2}
          >
            <Typography variant="h4">Add New Employees</Typography>
          </Box>
          <Box>
            <Stepper
              flex
              sx={{ flexWrap: "wrap" }}
              alternativeLabel
              activeStep={activeStep}
            >
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

                <Button disabled={activeStep === 0} onClick={handleBack}>
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
                  sx={{ marginLeft: "30px" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </form>
              {/*                        
                        </>
                    )} */}
            </FormProvider>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <List />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Typography, InputLabel, Button} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom';
const labelStyles = {mb: 1,mt: 3,fontSize:'24px', fontWeight: 'bold'};  
const BlogDetail = () => {
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({
    
  });
  const handleChange = (e) =>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };
  const fetchDetails = async() => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err)=> console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect (() => {
    fetchDetails().then((data)=> {
      setBlog((data.blog))
      setInputs({title:data.blog.title,description: data.blog.description, })
    });
   },[id]);
   const sendRequest = async () => {
    const res = axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title: inputs.title,
      description: inputs.description,
      
    }).catch((err)=> console.log(err));
    const data = await res.data;
    return data; 
   }
   console.log(blog);
   const handleSubmit = (e) =>{
   e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=> console.log(data)).then(()=> navigate("/myBlogs/"));
  };
  return (
    <div>
      {inputs &&
      <form onSubmit={handleSubmit}>
    <Box 
    border={3} 
    borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 37%, rgba(0,58,161,1) 73%, rgba(69,187,252,1) 100%);" 
    borderRadius={10} 
    fontWeight={'bold'}
    marginTop={3}

    boxShadow="10px 10px 20px #ccc" 
    padding={3} 
    margin="auto" 
    display='flex' 
    flexDirection={'column'} 
    width={"30%"}>
      <Typography 
       fontWeight={"bold"} 
       padding={3} margin='auto'  
       color="black" 
       variant='h4' 
       textAlign={'center'}>
         Post your Blog
         </Typography>
      <InputLabel sx={labelStyles}>Title</InputLabel>
      <TextField 
      name="title" 
      onChange={handleChange} 
      value={inputs.title} 
      margin='auto' 
      variant='outlined'/>
      <InputLabel 
      sx={labelStyles}>
        Description</InputLabel>
      <TextField 
      name="description" 
      onChange={handleChange} 
      value={inputs.description} 
      margin='auto' 
      variant='outlined'/>
     
      <Button sx={{marginTop:2, borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>

    </Box>
  </form> }
   </div>
  )
};

export default BlogDetail;
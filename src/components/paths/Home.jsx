import React from 'react';
import Section from '../Section';
import Layout from '../Layout';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate=useNavigate();
    const redirectToLogin=()=>{
        navigate('/login');
    }
    return (
        <Layout>
            <Button onClick={redirectToLogin}>Login</Button>
        <Section></Section>
        </Layout>
    )
}

export default Home

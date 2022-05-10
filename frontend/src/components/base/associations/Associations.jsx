import React, {useState} from 'react';

import Typewriter from 'typewriter-effect';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Association from './Association';
import {get_associations} from '../../../actions/Association';




export default function Associations(){

    const [associations, setAssociations] = useState([]);

    window.addEventListener('load',() =>{
        const data = get_associations();
        data.then((res)=>{
            setAssociations(res['associations'].slice(0, 5));
        });
        
    });
    return(
        <Container maxWidth="lg">
            
            <Typography variant="h3" gutterBottom component="div" textAlign='center'>
                <Typewriter onInit={((typewriter)=>{
                    typewriter.pauseFor(2000)
                    .typeString("THERE ARE PEOPLES")
                    .pauseFor(3000)
                    .deleteAll()
                    .typeString("THAT NEED'S OUR HELP!")
                    .pauseFor(3000)
                    .deleteAll()
                    .typeString("ASSOCIATIONS")
                    .start();
                })} />
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 3, md: 2 }}>
                {
                    associations.map((obj,index)=>{
                        if(obj !== undefined){
                            return(
                                <Grid key={index} item lg={3} xs={12} sm={6} md={4}>
                                    <Association association={obj}/>
                                </Grid>
                            )
                        }
                    })
                }
            </Grid>
        </Container>
    )
}
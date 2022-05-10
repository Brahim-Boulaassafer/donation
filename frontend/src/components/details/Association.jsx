import React, {useState, useEffect} from 'react';
import {useParams, generatePath} from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WebIcon from '@mui/icons-material/Web';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaxIcon from '@mui/icons-material/Fax';
import PhoneIcon from '@mui/icons-material/Phone';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Link from '@mui/material/Link';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { blue } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';

import Typewriter from 'typewriter-effect';

import './css/association.css';
import {get_association} from '../../actions/Association';
import anonymos from '../../img/anonymos.png';
import Payment from '../payments/Payment';
import routes from '../../routes';

const Association = () =>{
    const baseUrl='http://127.0.0.1:8000'

    const [state, setState] = useState({
        association:[],
        activities:[],
        users:[],
        open:false
    }); 

    const {slug } = useParams();

    useEffect(() => {
        const data = get_association(slug);
        data.then((res)=>{
            setState({
                association:res['association'],
                activities:res['activities'].slice(0, 5),
                users:res['users'].slice(0, 5),
            });
        });

    }, []);

    



const Users = () => {
    return(
            state.users.map((user,index) =>{
                let picture = "";
                if(user.picture === null)
                {
                    picture = anonymos;
                }else{
                    picture = baseUrl + user.picture;
                }
                return(
                    <Card key={index} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            {user.is_staff?(<p className="admin">Admin</p>):<span></span>}
                            <CardMedia
                            component="img"
                            width="150px"
                            height="300px"
                            image={picture}
                            alt={user.user_name}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {user.last_name} {user.first_name} 
                            </Typography>
                            <Typography variant="p" color="text.secondary">
                                {user.email}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
        
                )
            
            })
    );

}




const Activities = () => {
    return (
        state.activities.map((activity,index)=>{
            return(
                <Card key={index} sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt={activity.slug}
                        width="150px"
                        height="300px"
                        image="/static/images/cards/contemplative-reptile.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {activity.name}
                        </Typography>
                        {/* <Typography variant="body2" color="text.secondary">
                        {activity.about}
                        </Typography> */}
                    </CardContent>
                    <CardActions>
                        <Link href={generatePath(routes.activity, { slug: activity.slug })} size="small">See More</Link>
                    </CardActions>
                </Card>
            )

        })
    );
}

const Sponsores = () => {

    return(
        state.association.sponsores?
        state.association.sponsores.map((sponsore, index)=>{
            return(
                <span key={index} style={{backgroundImage: `url(${baseUrl+sponsore.logo})`,backgroundPosition:'start',backgroundSize:'contain', width:"100%", height:"300px",backgroundRepeat: "no-repeat",filter: "grayscale(100%)"}}></span>
            )
        }):
        <CircularProgress color="secondary" />
    )
}

const Donation = () =>{

    return(
        <Collapse in={state.open}>
    
            <Alert
            sx={{ 
            width: '100vw',
            height:'100vh',
            position:'fixed',
            top:'0px', 
            bgcolor:blue[100],
            zIndex: 'tooltip',

            }}
            icon={false}
            variant="outlined"
            severity="info"
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                id="icon"
                onClick={() => {
                    setState({
                        ...state,
                        open:false
                    });
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            >
                <Payment slug={state.association.slug} />
            </Alert>
            
        </Collapse>
    )
}

    return(
        <>
            <div className='container'>
                <div style={{backgroundImage: `url(${baseUrl+state.association.background_image})`,backgroundPosition:'center',backgroundSize:'contain', width:"100%", height:"300px",backgroundRepeat: "no-repeat"}}></div>
                <img className='logo' src={baseUrl+`${state.association.logo}`} alt="logo" />
                <h2 className='title'>{state.association.name}</h2>
                <div className="contact">
                    <div className="social-media">
                        <ul>
                            <li>
                                <Tooltip title="Facebook" placement="top">
                                    <a href={state.association.facebook}><FacebookIcon /></a>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Instagram" placement="top">
                                    <a href={state.association.instagram}><InstagramIcon /></a>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Twitter" placement="top">
                                    <a href={state.association.twitter}><TwitterIcon /></a>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Association Site" placement="top">
                                    <a href={state.association.url}><WebIcon /></a>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                    <div className="association-contact">
                        <ul>
                            <li>
                                <Tooltip title={state.association.email} placement="top">
                                    <MailOutlineIcon/> 
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title={state.association.fax} placement="top">
                                    <FaxIcon/> 
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title={state.association.phone_number} placement="top">
                                    <PhoneIcon/> 
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="about-association">
                    <Typography variant="h3" gutterBottom component="div" textAlign='center'>
                        <Typewriter onInit={((typewriter)=>{
                            typewriter.pauseFor(2000)
                            .typeString("ABOUT ASSOCIATION")                        
                            .start();
                        })} />
                    </Typography>
                    <p className="about">{state.association.about}</p>
                    <div className="grid">
                        <Users />
                    </div>
                </div>
                <div id="activities">
                    <Typography variant="h3" gutterBottom component="div" textAlign='center'>
                        <Typewriter onInit={((typewriter)=>{
                            typewriter.pauseFor(3000)
                            .typeString("ASSOCIATION ACTIVITIES")
                            .start();
                        })} />
                    </Typography>
                    <div className="grid">
                        <Activities />
                    </div>
                </div>
                <div id="sponsores">
                    <Typography variant="h3" gutterBottom component="div" textAlign='center'>
                        <Typewriter onInit={((typewriter)=>{
                            typewriter.pauseFor(3000)
                            .typeString("ASSOCIATION SPONSORES")
                            .start();
                        })} />
                    </Typography>
                    <div className="slide-show grid">
                        <Sponsores />
                    </div>
                </div>
            </div>
            <Tooltip title="Donate" placement="top">
                <IconButton
                onClick={() => {
                    setState({
                        ...state,
                        open:true
                    });
                }} 
                sx={{
                    bottom: '50px',
                    right:"20px",
                    zIndex: 'tooltip',
                    position:"fixed",
                    bgcolor: blue[100],
                    color:blue[500]}}>
                    <VolunteerActivismIcon fontSize='large' />
                </IconButton>
            </Tooltip>
            <Donation/>
        </>
    )
}

export default Association;
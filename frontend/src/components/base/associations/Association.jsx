import * as React from 'react';

import {generatePath} from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { purple } from '@mui/material/colors';
import Link from '@mui/material/Link';


import routes from '../../../routes';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(1deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Association({association}) {

  const baseUrl= 'http://127.0.0.1:8000';
  return (
      <>
      <Card  sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: purple[600] }} aria-label="recipe">
              {association.name.slice(0,1).toUpperCase()}
            </Avatar>
          }
          title={association.name.toUpperCase()}
          subheader={association.association_code}
        />
        <Link href={generatePath(routes.association, { slug: association.slug })}>
          <CardMedia
            component="img"
            height="194"
            image={baseUrl+`${association.logo}`}
            alt={association.name}
          />
        </Link>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {association.fax}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
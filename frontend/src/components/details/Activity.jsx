import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import swal from 'sweetalert';

// import axiosInstance from '../../axios';
import {get_activity, beVolunteer} from '../../actions/Activity';
import './css/activity.css';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Activity = () =>{

    const {slug} = useParams()
    const [state, setState] = useState({
      activity:[],
      date:""
    });

    useEffect(() => {
      const data = get_activity(slug);
      data.then((res)=>{

          var mydate = new Date(res['activity'].start_on);
          setState({
            date:mydate.toLocaleString(),
            activity:res['activity'],
          });

      })
      .catch(()=>{
        console.clear();
      })

    }, []);

    // handles

    const handleSubmit = async (event) =>{

        event.preventDefault();


        const data = beVolunteer(slug);
        data.then(res =>{
            swal({
                title: "Thanks!",
                text: `${res['detail']}!`,
                icon: "success",
                button: "close!",
            });

            window.location.href = '/';
        })
        .catch(() => {
            swal({
                title: "UnAuthenticated!",
                text: `please authenticate to be a volunteer.`,
                icon: "warning",
                button: "close!",
            });
            console.clear();
        })

}
        
    // elements

    const Valonteer = () => {

        return(
            <form onSubmit={handleSubmit}>
                <Button className='btn' xs={{margin:"10px"}} type="submit" variant="contained">Be Volunteer</Button>
            </form>
        )
    }



    return(
        <div className='activity'>
            <h1 className='title'>{state.activity.name}</h1>
            <p className="about">{state.activity.about}</p>

            {/* // Data */}

                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Association</StyledTableCell>
            <StyledTableCell align="right">Activity</StyledTableCell>
            <StyledTableCell align="right">Volunteers needed</StyledTableCell>
            <StyledTableCell align="right">start on</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {state.activity.association ?state.activity.association.name : <CircularProgress color="secondary" />}
              </StyledTableCell>
              <StyledTableCell align="right">{state.activity.name}</StyledTableCell>
              <StyledTableCell align="right">{state.activity.is_need_volunteers?state.activity.volunteers_number_needed:'None'}</StyledTableCell>
              <StyledTableCell align="right">{state.date? state.date : <CircularProgress color="secondary" />}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>


            {/* Data */}


            {state.activity.is_need_volunteers&&state.activity.volunteers_number_needed > 0? <Valonteer slug={slug} /> : <></>}
        </div>
    )
}
export default Activity;
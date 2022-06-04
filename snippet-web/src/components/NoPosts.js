import React from 'react';
import { Grid } from '@mui/material';
import noData from '../assets/img/no_data.svg';

export const NoPosts = () => {
    return (
        <Grid container>
            <Grid item xs={12} sx={{
                marginTop: '80px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <object type='image/svg+xml' data={noData} style={{width: '300px'}}></object>
            </Grid>
        </Grid >
    )
}

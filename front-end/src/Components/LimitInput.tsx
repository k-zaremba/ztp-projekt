import {Grid, TextField} from "@mui/material";
import React from "react";

interface LimitInputProps {
    limit: number,
    setLimit: (newValue: number) => void
}

export const LimitInput = ({limit, setLimit}: LimitInputProps) => {
    return (
        <Grid item xs={12} md={4}>
            <TextField label="Limit wyświetlanych rekordów"
                       InputProps={{inputProps: {min: 1}}}
                       variant="outlined" value={limit} type={"number"}
                       onChange={(newValue) => {
                           setLimit(+newValue.target.value)
                       }}/>
        </Grid>)

}
import {Box, Container, TextField} from "@mui/material";

interface LimitInputProps {
    limit: number,
    setLimit: (newValue: number) => void
}

export const LimitInput = ({limit, setLimit}: LimitInputProps) => {
    return (
        <TextField label="Limit wyświetlanych rekordów"
                   InputProps={{inputProps: {min: 1}}}
                   variant="outlined" value={limit} type={"number"}
                   sx={{
                       '& .MuiInputBase-root': {
                           backgroundColor: '#f5f5f5',
                       },
                       '& .MuiOutlinedInput-notchedOutline': {
                           borderColor: '#a2aebb',
                       },
                       '& .MuiOutlinedInput-input': {
                           padding: '12px',
                       },
                       '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                           borderColor: '#23b5d3',
                       },
                       '& .Mui-focused .MuiOutlinedInput-input': {
                           color: '#23b5d3',
                       },
                       maxWidth: '35vw',
                       marginBottom: '16px',
                   }}
                   onChange={(newValue) => {
                       setLimit(+newValue.target.value)
                   }}/>)
}
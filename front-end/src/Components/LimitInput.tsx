import {TextField} from "@mui/material";

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
                           backgroundColor: '#ffffff',
                       },
                       '& .MuiOutlinedInput-notchedOutline': {
                           borderColor: '#a2aebb',
                       },
                       '& .MuiOutlinedInput-input': {
                           padding: '12px',
                       },
                       '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                           borderColor: '#071013',
                       },
                       '& .Mui-focused .MuiOutlinedInput-input': {
                           color: '#071013',
                       },
                       '& .MuiInputLabel-root.Mui-focused': {
                           color: '#071013',
                       },
                   }}
                   onChange={(newValue) => {
                       setLimit(+newValue.target.value)
                   }}/>)
}
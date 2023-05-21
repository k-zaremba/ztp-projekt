import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {Box} from "@mui/material";
import {Dayjs} from "dayjs";
import React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

interface DateRangeSelectProps {
    fromDate: Dayjs | null,
    setFromDate: (new_date: Dayjs | null) => void,
    toDate: Dayjs | null,
    setToDate: (new_date: Dayjs | null) => void,
}

export const DateRangeSelect = ({fromDate, setFromDate, toDate, setToDate}: DateRangeSelectProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
        }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    ampm={false}
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
                    label="Data początkowa"
                    value={fromDate}
                    onChange={(newValue) => {
                        if (fromDate != null) {
                            setFromDate(newValue)
                        }
                    }}
                />
                <DateTimePicker
                    ampm={false}
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
                    label="Data końcowa"
                    value={toDate}
                    onChange={(newValue) => {
                        setToDate(newValue)
                    }}
                />
            </LocalizationProvider></Box>
    );
}
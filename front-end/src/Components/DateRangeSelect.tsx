import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {Box, Grid} from "@mui/material";
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} md={4}>
                <DateTimePicker
                    ampm={false}
                    label="Data początkowa"
                    value={fromDate}
                    onChange={(newValue) => {
                        if (fromDate != null) {
                            setFromDate(newValue)
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <DateTimePicker
                    ampm={false}
                    label="Data końcowa"
                    value={toDate}
                    onChange={(newValue) => {
                        setToDate(newValue)
                    }}
                />
            </Grid>
        </LocalizationProvider>
    );
}
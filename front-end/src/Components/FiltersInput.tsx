import {DateRangeSelect} from "./DateRangeSelect";
import {LimitInput} from "./LimitInput";
import React from "react";
import {Dayjs} from "dayjs";
import {Container, Typography, Card} from "@mui/material";

export interface FiltersInputProps {

    limit: number,
    setLimit: (newValue: number) => void,
    fromDate: Dayjs | null,
    setFromDate: (new_date: Dayjs | null) => void,
    toDate: Dayjs | null,
    setToDate: (new_date: Dayjs | null) => void,
}

export const FiltersInput = ({limit, setLimit, toDate, setToDate, fromDate, setFromDate}: FiltersInputProps) => {
    return <Container sx={{
        padding: '2vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Card sx={{
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            border: '1px solid #071013',
        }}>
            <Typography variant="h2" sx={{marginBottom: '16px', color: '#071013'}}>Filtruj dane:</Typography>

            <DateRangeSelect setToDate={(new_value) => {
                setToDate(new_value)
            }}
                             toDate={toDate}
                             fromDate={fromDate}
                             setFromDate={(new_value) => {
                                 setFromDate(new_value)
                             }}/>
            <LimitInput limit={limit} setLimit={(newValue: number) => {
                setLimit(newValue)
            }}/>
        </Card>
    </Container>
}
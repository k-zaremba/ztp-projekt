import React, {useEffect, useState} from 'react';
import './App.css';
import {Container, Typography, Box} from "@mui/material";
import {Metrics, Record} from "./Components/Metrics";
import {LoadingCircle} from "./Components/LoadingCircle";
import {FiltersInput} from "./Components/FiltersInput";
import dayjs, {Dayjs} from "dayjs";
import Last5Classifications from "./Components/Last5Classifications";

require('dayjs/locale/pl')

const API_URL = 'http://127.0.0.1:8000/evals/'

dayjs.locale('pl')
const App = () => {
    const [data, setData] = useState<Array<Record> | null>(null);
    const [fetched_data, setFetchedData] = useState<Array<Record> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fromDate, setFromDate] = useState<Dayjs | null>(dayjs("2023-06-01"))
    const [toDate, setToDate] = useState<Dayjs | null>(dayjs("2023-06-31"))
    const [limit, setlimit] = useState<number>(1)

    const fetch_data = () => {
        fetch(API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData: Array<Record>) => {
                setFetchedData(actualData)
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                filterData();
                setLoading(false);
            });
    }

    const filterData = () => {
        if (fetched_data == null) {
            return -1;
        }

        let _data = fetched_data.slice().reverse();
        _data = _data.filter((record) => {
            return (dayjs.unix(record.timestamp).isAfter(fromDate))
        })
        _data = _data.filter((record) => {
            return (dayjs.unix(record.timestamp).isBefore(toDate))
        })
        _data = _data.slice(0, limit)
        setData(_data)
    }


    useEffect(() => {
        fetch_data()
    }, [fromDate, toDate, limit]);

    useEffect(() => {
        fetch_data()
    }, []);


    // @ts-ignore
    return (
        <Box
            sx={{
                background: "linear-gradient(135deg, #23b5d3, #a2aebb)",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                minHeight: "100vh",
                fontFamily: "Roboto, sans-serif",
                fontSize: "18px",
                letterSpacing: "0.5px",
                lineHeight: "1.5",
                padding: "24px",
            }}
        >
            <Container maxWidth="md">

                <FiltersInput setFromDate={(new_date) => {
                    setFromDate(new_date)
                }} setToDate={(new_date) => {
                    setToDate(new_date)
                }} setLimit={(new_date) => {
                    setlimit(new_date)
                }}
                              limit={limit}
                              fromDate={fromDate}
                              toDate={toDate}/>

                <Last5Classifications/>


                {loading && <LoadingCircle/>}
                {error && <Typography variant="h2">Wystąpił błąd!</Typography>}
                {data && <Metrics data={data as Array<Record>}/>}

            </Container>
        </Box>)
}

export default App
import {Card, CardContent, Container, Typography} from "@mui/material";

export interface Record {
    _id: String,
    loss: number,
    accuracy: number,
    auc: number,
    mae: number,
    rmse: number,
    timestamp: number
}

interface MetricsProps {
    data: Array<Record>
}

export const Metrics = ({data}: MetricsProps) => {
    let content = data.map((metric) =>
        <Container sx={{
            padding: '2vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Card
                sx={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    border: '1px solid #071013',
                }}>
                <CardContent>
                    <Typography variant="h2" component="div">
                        {new Date(metric.timestamp * 1000).toLocaleString("pl-PL")}
                    </Typography>

                    <Typography variant="body1" component="div">
                        ID: {metric._id}
                    </Typography>

                    <Typography variant="body1" component="div">
                        Loss: {metric.loss}
                    </Typography>

                    <Typography variant="body1" component="div">
                        Accuracy: {metric.accuracy}
                    </Typography>

                    <Typography variant="body1" component="div">
                        AUC: {metric.auc}
                    </Typography>

                    <Typography variant="body1" component="div">
                        MAE: {metric.mae}
                    </Typography>

                    <Typography variant="body1" component="div">
                        RMSE: {metric.rmse}
                    </Typography>

                </CardContent>
            </Card></Container>)
    ;

    return (<>
        {content}
    </>)
}

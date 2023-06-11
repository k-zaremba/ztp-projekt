import {Card, CardContent, Typography} from "@mui/material";

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
        <Card
            sx={{
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                border: '1px solid #071013',
                marginTop: "16px"
            }}>
            <CardContent>
                <Typography variant="h3" component="div">
                    {new Date(metric.timestamp * 1000).toLocaleString("pl-PL")}
                </Typography>

                <Typography variant="h6" component="div">
                    ID: {metric._id}
                </Typography>

                <Typography variant="h6" component="div">
                    Loss: {metric.loss}
                </Typography>

                <Typography variant="h6" component="div">
                    Accuracy: {metric.accuracy}
                </Typography>

                <Typography variant="h6" component="div">
                    AUC: {metric.auc}
                </Typography>

                <Typography variant="h6" component="div">
                    MAE: {metric.mae}
                </Typography>

                <Typography variant="h6" component="div">
                    RMSE: {metric.rmse}
                </Typography>

            </CardContent>
        </Card>)
    ;

    return (<>
        {content}
    </>)
}

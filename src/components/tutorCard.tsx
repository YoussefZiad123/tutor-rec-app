import { Box, Card, CardContent, Typography } from "@mui/material";

export default function TutorCard(tutor: any) {

    return <Card sx={{ width: "50%" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {tutor.tutor.name}
                    {console.log(tutor.tutor.name)}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {tutor.tutor.justification}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    {tutor.tutor.score + " / 10"}
                </Typography>
            </CardContent>
        </Box>
    </Card>

}
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Hotels = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    if (location.state?.hotels) {
      setHotels(location.state.hotels);
    } else {
      fetchAllHotels();
    }
  }, [location.state]);

  const fetchAllHotels = async () => {
    try {
      const response = await axios.get("http://localhost:5001/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={hotel.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    hotel.image || "https://dummyimage.com/140x140/000/fff"
                  }
                  alt={hotel.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
                    {hotel.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 1 }}
                  >
                    {hotel.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            No hotels found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Hotels;

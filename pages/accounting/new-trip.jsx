import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Typography, Button, Alert } from "@mui/material";
import { useState } from "react";
import SearchLocationInput from "../../components/search-location";
import BasicDatePicker from "../../components/date/date-picker";
import format from "date-fns/format";
import { useRouter } from "next/router";
import AuthError from "../../components/auth-error";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        loggedIn:
          req.session.user && req.session.user.token && req.session.user.email
            ? true
            : false,
      },
    };
  },
  sessionOptions
);

const NewTrip = ({ loggedIn }) => {
  const [locations, setLocations] = useState([]);
  const [date, setDate] = useState(null);
  const [error, setError] = useState();
  const router = useRouter();

  const submitTrip = (event) => {
    event.preventDefault();
    if (!date) setError("The date field is required.");
    else if (locations.length < 2)
      setError("At least two locations are required.");
    else {
      let tripDate = new Date(date).setHours(12);
      tripDate = new Date(tripDate).setMinutes(0, 0);
      tripDate = format(tripDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      fetch("/api/accounting/new-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: tripDate,
          placeIds: locations.map((location) => location.place_id),
          placeNames: locations.map((location) => location.name),
        }),
      })
        .then((res) => {
          if (res.ok) {
            router.push("/accounting");
          } else {
            return res.text();
          }
        })
        .then((error) => {
          setError(error);
        });
    }
  };

  if (!loggedIn) {
    return <AuthError />;
  }

  return (
    <Grid container alignItems="center" direction="column">
      <Grid item>
        <Typography mt={4} mb={2} variant="h3">
          Log Trip
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          Add mileage from a business trip to your expenses data by entering the
          date and stops along the trip, one location at a time.
        </Typography>
      </Grid>
      <Grid item mt={4}>
        <BasicDatePicker date={date} setDate={setDate} setError={setError} />
      </Grid>
      <Grid item mt={4}>
        <SearchLocationInput setLocations={setLocations} />
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Location Name</TableCell>
              <TableCell>Location Address</TableCell>
              <TableCell>Place ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations &&
              locations.map((location, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <a target="_blank" rel="noreferrer" href={location.url}>
                      {location.name}
                    </a>
                  </TableCell>
                  <TableCell>{location.formatted_address}</TableCell>
                  <TableCell>{location.place_id}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item sx={{ position: "absolute", bottom: "3%" }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={submitTrip}>
          Log Trip
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewTrip;

import React from "react";
import { useCreateRentalMutation, useGetCarQuery } from "../generated/graphql";
import { Button, Stack, Alert, Loading } from "@kiwicom/orbit-components";
import Car from "../components/Car";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval } from "date-fns";
import RentalModal from "../components/RentalModal";

interface ICarDetailSceneProps {
  id: number;
}

const CarDetailScene: React.VFC<ICarDetailSceneProps> = ({ id }) => {
  const [isRentalModalVisible, setIsRentalModalVisible] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(null);

  const handleDatePickerChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { loading, data, error } = useGetCarQuery({
    variables: {
      id,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Alert type="critical">{error.toString()}</Alert>;
  }

  return (
    <Stack direction="row" grow={true} shrink={true} justify="between">
      <Stack>
        <Car
          id={data.car.id}
          model={data.car.model}
          image={data.car.imageURL}
          brand={data.car.brand}
          labels={[
            data.car.fuel,
            data.car.type,
            data.car.year,
            data.car.registrationPlate,
          ]}
        />
      </Stack>
      <Stack direction="column">
        <Datepicker
          inline
          selectsRange
          startDate={startDate}
          endDate={endDate}
          excludeDates={data.car.reservations.reduce((acc, reservation) => {
            return acc.concat(
              eachDayOfInterval({
                start: new Date(reservation.from),
                end: new Date(reservation.to),
              })
            );
          }, [])}
          onChange={handleDatePickerChange}
        />
        {startDate && endDate && (
          <Button onClick={() => setIsRentalModalVisible(true)}>REQUEST</Button>
        )}

        {isRentalModalVisible && (
          <RentalModal
            id={id}
            startDate={startDate}
            endDate={endDate}
            onClose={() => setIsRentalModalVisible(false)}
          />
        )}
      </Stack>
      <Stack>
        <div>Test</div>
      </Stack>
    </Stack>
  );
};

export default CarDetailScene;

import React from "react";
import { useGetCarsQuery } from "../generated/graphql";
import { Stack, Alert, Loading } from "@kiwicom/orbit-components";
import Car from "../components/Car";

const CarsScene = () => {
  const { loading, data, error } = useGetCarsQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Alert type="critical">{error.toString()}</Alert>;
  }

  return (
    <Stack direction="row">
      {data.cars.map((car) => (
        <Car
          key={car.id}
          id={car.subjectTypeId}
          model={car.model}
          image={car.imageURL}
          brand={car.brand}
          showDetailButton
        />
      ))}
    </Stack>
  );
};

export default CarsScene;

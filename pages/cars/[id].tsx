import React from "react";
import { NextPage } from "next";
import CarDetailScene from "../../src/scenes/CarDetail";

interface ICarDetailPageProps {
  id: number;
}

const CarDetailPage: NextPage<ICarDetailPageProps> = ({ id }) => (
  <CarDetailScene id={id} />
);

CarDetailPage.getInitialProps = ({ query }) => {
  return {
    id: parseInt(typeof query.id === "object" ? query.id[0] : query.id, 10),
  };
};

export default CarDetailPage;

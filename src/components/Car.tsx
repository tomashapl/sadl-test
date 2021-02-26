import React from "react";

import { Tag, Heading, Stack } from "@kiwicom/orbit-components";
import InternalButton from "./Buttons/InternalButton";

interface ICarProps {
  id: number;
  model: string;
  image: string;
  brand: string;
  showDetailButton?: boolean;
  labels?: string[];
}

const Car: React.VFC<ICarProps> = ({
  image,
  brand,
  model,
  id,
  showDetailButton,
  labels,
}) => (
  <Stack direction="column" inline>
    <img src={image} />
    <Heading type="title2">{brand}</Heading>
    <Heading type="display">{model}</Heading>
    {showDetailButton && (
      <InternalButton href="/cars/:model" as={`/cars/${id}`}>
        Detail
      </InternalButton>
    )}
    {labels && labels.map((label, key) => <Tag key={key}>{label}</Tag>)}
  </Stack>
);

export default Car;

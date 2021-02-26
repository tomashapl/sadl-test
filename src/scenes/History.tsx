import React from "react";
import {
  Alert,
  Loading,
  NotificationBadge,
  Stack,
  Text,
  Heading,
} from "@kiwicom/orbit-components";
import { RentalStatus, useRentalsQuery } from "../generated/graphql";

import {
  Clock,
  ThumbUp,
  ThumbDown,
  Child,
  Calendar,
} from "@kiwicom/orbit-components/icons";
import { format } from "date-fns";

const getStatus = (
  status: RentalStatus
): { icon: React.ReactNode; label: string } => {
  switch (status) {
    case RentalStatus.Approved:
      return {
        icon: <NotificationBadge icon={<ThumbUp />} type="success" />,
        label: "Approved",
      };

    case RentalStatus.Pending:
    case RentalStatus.Waiting:
      return {
        icon: <NotificationBadge icon={<Clock />} type="warning" />,
        label: "Pending",
      };

    case RentalStatus.Rejected:
      return {
        icon: <NotificationBadge icon={<ThumbDown />} type="critical" />,
        label: "Rejected",
      };

    case RentalStatus.Finished:
      return {
        icon: <NotificationBadge icon={<Child />} type="warningInverted" />,
        label: "Finished",
      };
  }
};

const HistoryScene = () => {
  const { loading, data, error } = useRentalsQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Alert type="critical">{error.toString()}</Alert>;
  }

  return (
    <Stack direction="column" align="center">
      {data.rentals.map((rental) => {
        const { icon, label } = getStatus(rental.status);

        return (
          <Stack direction="row" align="center" spacing="XXLarge" inline>
            <img src={rental.car.imageURL} width="200px" />
            <Stack direction="column" inline spacing="XXXSmall">
              <Heading type="title3">{rental.car.brand}</Heading>
              <Heading type="title1">{rental.car.model}</Heading>
            </Stack>
            <Stack direction="row" inline>
              <Calendar />
              <Stack direction="column" spacing="XXXSmall">
                <Text>{format(new Date(rental.from), "d. MMM yyyy")}</Text>
                <Text>{format(new Date(rental.to), "d. MMM yyyy")}</Text>
              </Stack>
            </Stack>
            <Stack direction="row" spacing="XSmall">
              {icon}
              <Stack direction="column" spacing="XXXSmall">
                <Text>Status:</Text>
                <Text weight="bold">{label}</Text>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default HistoryScene;

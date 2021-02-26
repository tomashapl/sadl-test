import React from "react";
import { useCreateRentalMutation } from "../generated/graphql";
import {
  Loading,
  Stack,
  Alert,
  Heading,
  Portal,
  Modal,
  ModalSection,
} from "@kiwicom/orbit-components";
import { useRouter } from "next/router";

interface IRentalModalProps {
  id: number;
  startDate: Date;
  endDate: Date;
  onClose: () => void;
}

const RentalModal: React.VFC<IRentalModalProps> = ({
  id,
  startDate,
  endDate,
  onClose,
}) => {
  const [createRental, { loading, error }] = useCreateRentalMutation();

  const { push } = useRouter();

  const handleRentCar = React.useCallback(async () => {
    try {
      await createRental({
        variables: {
          values: {
            subjectID: id,
            rentalFrom: new Date(startDate),
            rentalTo: new Date(endDate),
          },
        },
      });

      await push("/history", "/history");
    } catch (err) {}
  }, [createRental, startDate, endDate, id]);

  React.useEffect(() => {
    handleRentCar();
  }, [handleRentCar]);

  return (
    <Portal>
      <Modal size="small" onClose={error && onClose}>
        <ModalSection>
          {loading ? (
            <Stack>
              <Loading />
              <Heading>REQUESTING</Heading>
            </Stack>
          ) : (
            error && <Alert type="critical">{error.toString()}</Alert>
          )}
        </ModalSection>
      </Modal>
    </Portal>
  );
};

export default RentalModal;

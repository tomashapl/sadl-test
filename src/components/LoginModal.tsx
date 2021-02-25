import React, { useContext } from "react";
import { FastField, Formik, Form } from "formik";
import {
  Alert,
  Button,
  Stack,
  Modal,
  ModalHeader,
  ModalSection,
  ModalFooter,
  Portal,
} from "@kiwicom/orbit-components";
import InputField from "./Form/InputField";
import { useLoginMutation } from "../generated/graphql";
import { FORMIK_STATE, GRAPHQL_ERRORS } from "../enums";
import storeAuthorization from "../helpers/storeAuthorization";
import { SadlContext } from "../../pages/_app";
import { omitByDeep } from "../helpers/omitByDeep";

interface ILoginModalProps {
  onClose: () => void;
}

const LoginModal: React.VFC<ILoginModalProps> = ({ onClose }) => {
  const { setProfile } = useContext(SadlContext);
  const [login] = useLoginMutation();

  const handleLogin = React.useCallback(
    async (values, { setStatus, setErrors }) => {
      try {
        const { data } = await login({
          variables: {
            values,
          },
        });

        setStatus({
          status: FORMIK_STATE.OK,
        });

        storeAuthorization(data.login.accessToken, data.login.refreshToken);
        setProfile(omitByDeep(data.login.profile, ["__typename"]));
      } catch (err) {
        if (err.graphQLErrors[0]) {
          const error = err.graphQLErrors[0];

          switch (error.extensions.code) {
            case GRAPHQL_ERRORS.BAD_USER_INPUT:
              setErrors(error.extensions.invalidArgs);
          }
        }

        setStatus({
          status: FORMIK_STATE.ERROR,
          message: err.toString(),
        });
      }
    },
    [login]
  );

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleLogin}
    >
      {({ isSubmitting, status }) => (
        <Portal>
          <Form>
            <Modal size="small" onClose={onClose}>
              <ModalHeader title="Get Started" />
              <ModalSection>
                <Stack>
                  {status?.status === FORMIK_STATE.ERROR && (
                    <Alert type="critical">{status.message}</Alert>
                  )}
                  <Stack>
                    <FastField
                      name="email"
                      component={InputField}
                      label="Email"
                      type="text"
                    />
                    <FastField
                      name="password"
                      component={InputField}
                      label="Password"
                      type="password"
                    />
                  </Stack>
                </Stack>
              </ModalSection>
              <ModalFooter>
                <Button type="primary" loading={isSubmitting} submit>
                  Log in
                </Button>
              </ModalFooter>
            </Modal>
          </Form>
        </Portal>
      )}
    </Formik>
  );
};

export default LoginModal;

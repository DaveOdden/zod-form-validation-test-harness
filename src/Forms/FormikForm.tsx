import {
  Center,
  Paper,
  Stack,
  Button,
  PasswordInput,
  Title,
} from "@mantine/core"
import { Formik, Form } from "formik"
import { useDisclosure } from "@mantine/hooks"
import { customZodSchema } from "zod-password-validation-schema"
import { toFormikValidate } from "zod-formik-adapter"
import { notifications } from "@mantine/notifications"

export const FormikForm: React.FC<{}> = () => {
  const [visible, { toggle }] = useDisclosure(false)

  const submitForm = (values: IPasswordFormFields): void => {
    console.log("Formik Form - Submit")
    console.log(values)
    notifications.show({
      title: "Formik Form",
      message: "Form has passed validation and is submitted",
      color: "green",
    })
  }

  return (
    <Center>
      <Paper w={350} withBorder shadow="md" p={30} mt={30} radius="md">
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validateOnChange={true}
          validate={toFormikValidate(customZodSchema)}
          onSubmit={submitForm}
          validateOnMount={true}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
              }}
            >
              <Stack>
                <Title order={2}>Formik Form</Title>

                <PasswordInput
                  label="Password"
                  visible={visible}
                  onVisibilityChange={toggle}
                  visibilityToggleButtonProps={{
                    "aria-label": "Toggle password visibility",
                  }}
                  error={
                    errors.password && touched.password ? errors.password : null
                  }
                  onChange={handleChange("password")}
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  aria-invalid={
                    errors.password && touched.password ? true : false
                  }
                />
                <PasswordInput
                  label="Confirm password"
                  visible={visible}
                  onVisibilityChange={toggle}
                  visibilityToggleButtonProps={{
                    "aria-label": "Toggle password visibility",
                  }}
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : null
                  }
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  aria-invalid={
                    errors.confirmPassword && touched.confirmPassword
                      ? true
                      : false
                  }
                />
                <Button type="submit" mt="md">
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Center>
  )
}

interface IPasswordFormFields {
  password: string
  confirmPassword: string
}

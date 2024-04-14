import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { loginUser } from "../../store/Auth/action";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Tienes que poner un email"),
  password: Yup.string().required("Tienes que poner una contraseña"),
});
function SigninForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
      console.log("form value ", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container className="signFormContainer">
        <section>
          <TextField
            className="signAuthInput"
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </section>
        <section>
          <TextField
            className="signAuthInput"
            label="Contraseña"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </section>
        <section className="loginAuthModal">
          <Button type="submit">INICIAR SESIÓN</Button>
        </section>
      </Grid>
    </form>
  );
}

export default SigninForm;

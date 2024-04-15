import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignForm.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/Auth/action";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Tienes que poner un email"),
  password: Yup.string().required("Tienes que poner una contraseña"),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

function SignupForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.dateOfBirth;
      const dateOfBirth = `${day}-${month}-${year}`;
      values.dateOfBirth = dateOfBirth;
      dispatch(registerUser(values));
      console.log("form value ", values);
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container className="signFormContainer">
        <section>
          <TextField
            className="signAuthInput"
            label="Nombre completo"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </section>
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
        <div className="birthDate">
          <section>
            <InputLabel>Día</InputLabel>
            <Select
              className="signAuthSelect"
              name="day"
              onChange={handleDateChange("day")}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth.day}
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </section>
          <section>
            <InputLabel>Mes</InputLabel>
            <Select
              className="signAuthSelect"
              name="month"
              onChange={handleDateChange("month")}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth.month}
            >
              {months.map((month) => (
                <MenuItem key={month.label} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </section>
          <section>
            <InputLabel>Año</InputLabel>
            <Select
              className="signAuthSelect"
              name="year"
              onChange={handleDateChange("year")}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth.year}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </section>
        </div>

        <section className="registerAuthModal">
          <Button type="submit">CREAR CUENTA</Button>
        </section>
      </Grid>
    </form>
  );
}

export default SignupForm;

import { Box, Button, Grid, IconButton } from "@mui/material";
import { Input } from "../../../core";
import { EducationDetailsForm } from "../../../../constant/type";
import { useFormik } from "formik";
import { educationDetailsSchema } from "../../../../constant/schema";
import { Dispatch, FC, useEffect, useRef } from "react";
import { Check, Close, Delete } from "@mui/icons-material";
import { IEducationDetails } from "../../../../types/userType";
import { generateUniqueRandomNumber } from "../../../../utils/func";

interface IAddEducationProps {
  data?: IEducationDetails;
  setEducationData: Dispatch<React.SetStateAction<IEducationDetails[]>>;
  handleToggleForm: () => void;
}

export const AddEducation: FC<IAddEducationProps> = ({
  data,
  setEducationData,
  handleToggleForm,
}) => {
  const formik = useFormik<EducationDetailsForm>({
    initialValues: {
      educationName: "",
      universityName: "",
      result: "",
      yearOfPassing: "",
    },
    validationSchema: educationDetailsSchema,
    onSubmit: (value: EducationDetailsForm) => handleSubmit(value),
  });

  const formikRef = useRef(formik);

  useEffect(() => {
    if (data) {
      formikRef.current.setValues(data);
    }
  }, [data]);

  const handleEdit = (data: EducationDetailsForm, id: number) => {
    setEducationData((prev) => {
      return prev.map((x) => {
        if (x.id === id) {
          return {
            ...data,
            id,
          };
        }
        return x;
      });
    });

    handleToggleForm();
  };

  const handleSubmit = (value: EducationDetailsForm) => {
    if (data) {
      handleEdit(value, data.id);
    } else {
      const id = generateUniqueRandomNumber();
      setEducationData((prev) =>
        prev.length ? [...prev, { ...value, id }] : [{ ...value, id }]
      );
    }

    formik.resetForm();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container columnSpacing={4} alignItems="center" paddingBlock={2}>
        <Grid item xs={2.5}>
          <Input
            formik={formik}
            name="educationName"
            id="educationName"
            label="Education Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2.5}>
          <Input
            formik={formik}
            name="universityName"
            id="universityName"
            label="University Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2.5}>
          <Input
            formik={formik}
            name="result"
            id="result"
            label="Result Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2.5}>
          <Input
            formik={formik}
            name="yearOfPassing"
            id="yearOfPassing"
            label="Year of passing"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
            <IconButton type="submit">
              <Check color="success" />
            </IconButton>
            <IconButton type="button" onClick={() => formik.resetForm()}>
              <Close color="warning" />
            </IconButton>
            <IconButton type="button" onClick={handleToggleForm}>
              <Delete color="error" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

import { useFormik } from "formik";
import { ExperienceDetailsForm } from "../../../../constant/type";
import { experienceDetailsSchema } from "../../../../constant/schema";
import { Check, Close, Delete } from "@mui/icons-material";
import { Input } from "../../../core";
import { Box, Grid, IconButton } from "@mui/material";
import { IExperienceDetails } from "../../../../types/userType";
import { Dispatch, FC, useEffect, useRef } from "react";
import { generateUniqueRandomNumber } from "../../../../utils/func";

interface IAddExperienceProps {
  data?: IExperienceDetails;
  setExperienceData: Dispatch<React.SetStateAction<IExperienceDetails[]>>;
  handleToggleForm: () => void;
}

export const AddExperience: FC<IAddExperienceProps> = ({
  data,
  handleToggleForm,
  setExperienceData,
}) => {
  const formik = useFormik<ExperienceDetailsForm>({
    initialValues: {
      companyName: "",
      position: "",
      totalYear: 0,
      lastCTC: "",
    },
    validationSchema: experienceDetailsSchema,
    onSubmit: (value: ExperienceDetailsForm) => handleSubmit(value),
  });

  const formikRef = useRef(formik);

  useEffect(() => {
    if (data) {
      formikRef.current.setValues(data);
    }
  }, [data]);

  const handleEdit = (data: ExperienceDetailsForm, id: number) => {
    setExperienceData((prev) => {
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

  const handleSubmit = (value: ExperienceDetailsForm) => {
    if (data) {
      handleEdit(value, data.id);
    } else {
      const id = generateUniqueRandomNumber();
      setExperienceData((prev) =>
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
            name="companyName"
            id="companyName"
            label="Company Name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2.5}>
          <Input
            formik={formik}
            name="position"
            id="position"
            label="Position"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2.5}>
          <Input
            formik={formik}
            name="totalYear"
            id="totalYear"
            label="Total Year"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2.5}>
          <Input
            formik={formik}
            name="lastCTC"
            id="lastCTC"
            label="Last CTC"
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

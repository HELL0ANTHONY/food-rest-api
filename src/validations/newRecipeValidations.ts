import * as yup from "yup";

const newRecipeSchema = yup.object({
  name: yup.string().required("Recipe 'name' is required"),
  summary: yup.string().required("Recipe 'summary' is required"),
  punctuation: yup.number().integer().positive(),
  healthScore: yup.number().integer().positive(),
  steps: yup.array().of(yup.string()),
  distTypes: yup.array().of(yup.string()),
  types: yup.array().of(yup.object({ name: yup.string() }))
});

export default newRecipeSchema;

import { FORM_TYPES, FormType } from '../enums/form.enums';

/**
 * Function to get a form type from search parameters
 */
export const getFormType = (type: string | undefined): FormType => {
  if (!type) return FORM_TYPES.PASS;

  const formType = Object.values(FORM_TYPES).find(
    (form) => form.toLowerCase() === type.toLowerCase(),
  );

  return formType || FORM_TYPES.PASS;
};

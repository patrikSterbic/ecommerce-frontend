const RESET = 'redux-form/RESET';

/**
 * Action reset form in Redux-form
 * @param {String} formName - Name / Key to specific form
 */
export function resetForm(formName) {
  return {
    type: RESET,
    meta: { form: formName }
  }; 
}
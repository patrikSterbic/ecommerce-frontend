import { defineMessages } from 'react-intl';

export default defineMessages({
  cancel: {
    id: 'global.cancel',
    defaultMessage: 'Cancel',
  },
  send: {
    id: 'global.send',
    defaultMessage: 'Send',
  },
  back: {
    id: 'global.back',
    defaultMessage: 'Back',
  },
  backHome: {
    id: 'global.backHome',
    defaultMessage: 'Back home',
  },
  yes: {
    id: 'global.yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'global.no',
    defaultMessage: 'No',
  },
  new: {
    id: 'global.new',
    defaultMessage: 'New',
  },
  /**
   * Validation
   */
  valRequired: {
    id: 'val.required',
    defaultMessage: 'This field is required',
  },
  valMustContainDigit: {
    id: 'val.mustContainDigit',
    defaultMessage: 'This field must containt at least one number',
  },
  valMinLength: {
    id: 'val.minLength',
    defaultMessage: 'Length must be at least {minLength} characters',
  },
  valExactLength: {
    id: 'val.valExactLength',
    defaultMessage: 'Length must be exactly {exactLength} characters',
  },
  valMaxLength: {
    id: 'val.maxLength',
    defaultMessage: 'Length can\'t be more than {exactLength} characters',
  },
  valMustBeInteger: {
    id: 'val.mustBeInteger',
    defaultMessage: 'Field must be whole number',
  },
  valMustBeOneOf: {
    id: 'val.mustBeOneOf',
    defaultMessage: 'Must be one of these values: {enumeration}',
  },
  valFormatEmail: {
    id: 'val.formatEmail',
    defaultMessage: 'This is not a valid e-mail address',
  },
  valDoNotMatch: {
    id: 'val.doNotMatch',
    defaultMessage: 'Must be same as {otherField}',
  },
  valPasswordDoNotMatch: {
    id: 'val.passwordDoNotMatch',
    defaultMessage: 'Password does not match',
  },
  valEmailDoNotMatch: {
    id: 'val.emailDoNotMatch',
    defaultMessage: 'Email does not match',
  },
  valAsyncError: {
    id: 'val.asyncError',
    defaultMessage: 'Server error: \'{error}\'',
  },
  valPhone: {
    id: 'val.phone',
    defaultMessage: 'Wrong phone format. valid form: +420 xxx xxx xxx',
  },
  valFormatPhone: {
    id: 'val.formatPhone',
    defaultMessage: 'This is not valid phone number',
  },
  valDateBigger: {
    id: 'val.dateBigger',
    defaultMessage: 'Date must be sooner {date}', // Dont know how to translate it :D
  },
  valBirthDate: {
    id: 'val.birthDate',
    defaultMessage: 'Birth date is not valid',
  },
  valDateRequired: {
    id: 'date.required',
    defaultMessage: 'Date must be filled',
  },
  valPrefix: {
    id: 'val.prefix',
    defaultMessage: 'Wrong format of prefix',
  },
  valAccountNumber: {
    id: 'val.accountNumber',
    defaultMessage: 'Is is not a valid account number',
  },
  valBankCode: {
    id: 'val.bankCode',
    defaultMessage: 'This is not a valid bank code',
  },
  valAccountNumberRequired: {
    id: 'val.accountNumberRequired',
    defaultMessage: 'Account number is required',
  },
  valBankCodeRequired: {
    id: 'val.bankCodeRequired',
    defaultMessage: 'Please fill up bank code too',
  },

  /* GENERAL */
  textBackToSummary: {
    id: 'text.backToSummary',
    defaultMessage: 'Back to summary'
  },
  textYearly: {
    id: 'text.yearly',
    defaultMessage: 'Yearly'
  },
  textSemiAnnualy: {
    id: 'text.semiAnnualy',
    defaultMessage: 'Semi-annualy'
  },
  textQuarterly: {
    id: 'text.quarterly',
    defaultMessage: 'Quarterly'
  },
  textMonthly: {
    id: 'text.monthly',
    defaultMessage: 'Monthly'
  },
  textNotSelected: {
    id: 'text.notSelected',
    defaultMessage: 'Not selected'
  },
  textOther: {
    id: 'text.other',
    defaultMessage: 'Other changes'
  },
  textChoose: {
    id: 'text.choose',
    defaultMessage: 'Choose...'
  },
  textQuitWithoutSaving: {
    id: 'text.quitWithoutSaving',
    defaultMessage: 'Cancel without saving'
  },
  textPrint: {
    id: 'text.print',
    defaultMessage: 'Print'
  },

  find: {
    id: 'search.buttom.find',
    defaultMessage: 'Search'
  },
  check: {
    id: 'search.buttom.check',
    defaultMessage: 'Checl'
  },

  currencyCz: {
    id: 'currency.cz',
    defaultMessage: 'Czk'
  },
  currencyEur: {
    id: 'currency.eur',
    defaultMessage: 'EUR'
  },


  unlisted: {
    id: 'text.unlisted',
    defaultMessage: 'Unlisted'
  },
  nonnegotiated: {
    id: 'text.nonnegotiated',
    defaultMessage: 'Non-negotiated'
  },

  placeholderSearch: {
    id: 'search.placeholder',
    defaultMessage: 'Enter text'
  },
  dateVerify: {
    id: 'text.dateVerify',
    defaultMessage: 'Confirm change od date'
  },
});

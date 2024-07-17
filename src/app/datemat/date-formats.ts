import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

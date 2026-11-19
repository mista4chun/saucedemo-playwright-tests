export const invalidCheckoutInfo = [
  { id: 'TC_SwagLabs_028', title: 'first name empty',  first: '',     last: 'Doe', postal: '2345', error: 'Error: First Name is required' },
  { id: 'TC_SwagLabs_029', title: 'last name empty',   first: 'John', last: '',    postal: '2345', error: 'Error: Last Name is required' },
  { id: 'TC_SwagLabs_030', title: 'postal code empty', first: 'John', last: 'Doe', postal: '',     error: 'Error: Postal Code is required' },
  { id: 'TC_SwagLabs_031', title: 'all fields empty',  first: '',     last: '',    postal: '',     error: 'Error: First Name is required' },
];
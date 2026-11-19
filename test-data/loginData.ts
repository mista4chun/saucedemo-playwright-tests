
export interface InvalidLogin {
  id: string;
  title: string;
  username: string;
  password: string;
  error: string;
}
export const invalidLogins: InvalidLogin[] = [
  { id: 'TC_SwagLabs_002', title: 'valid username, wrong password',
    username: 'standard_user', password: 'xxxx',
    error: 'Epic sadface: Username and password do not match any user in this service' },
  { id: 'TC_SwagLabs_003', title: 'wrong username, valid password',
    username: 'xxxx', password: 'secret_sauce',
    error: 'Epic sadface: Username and password do not match any user in this service' },
  { id: 'TC_SwagLabs_004', title: 'wrong username and password',
    username: 'xxxx', password: 'xxxx',
    error: 'Epic sadface: Username and password do not match any user in this service' },
  { id: 'TC_SwagLabs_005', title: 'empty username',
    username: '', password: 'secret_sauce',
    error: 'Epic sadface: Username is required' },
  { id: 'TC_SwagLabs_006', title: 'empty password',
    username: 'standard_user', password: '',
    error: 'Epic sadface: Password is required' },
  { id: 'TC_SwagLabs_007', title: 'both fields empty',
    username: '', password: '',
    error: 'Epic sadface: Username is required' },
  { id: 'TC_SwagLabs_008', title: 'locked-out user',
    username: 'locked_out_user', password: 'secret_sauce',
    error: 'Epic sadface: Sorry, this user has been locked out.' },
];


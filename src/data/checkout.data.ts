/** Fictitious UI data. The standard_user account and its password are public on the SauceDemo login page. */
export const standardUser = { username: 'standard_user', password: 'secret_sauce' };

/** problem_user shares the public demo password of the other SauceDemo accounts. */
export const problemUser = { username: 'problem_user', password: standardUser.password };

export const buyer = { firstName: 'Ada', lastName: 'Lovelace', postalCode: '10001' };

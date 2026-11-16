# Manual Bug Report — SauceDemo (`problem_user`)

## Title
Checkout cannot be completed: the last name is typed into the first name field

## Description
When logged in as `problem_user`, the "Your Information" step of the checkout does not handle the Last Name field correctly. Whatever I type there shows up in the First Name field and replaces what I had entered. The Last Name stays empty, so the page says it is missing and will not let me continue. As a result, no purchase can be completed.

## Steps to Reproduce
1. Go to https://www.saucedemo.com/.
2. Log in with `problem_user` and the public demo password (`secret_sauce`).
3. Add any two products to the cart.
4. Open the cart and click **Checkout**.
5. Type `Ada` in **First Name**.
6. Type `Lovelace` in **Last Name**.
7. Type `10001` in **Zip/Postal Code**.
8. Click **Continue**.

## Expected Result
All three fields keep what I typed (Ada, Lovelace, 10001) and the page moves on to the order overview, where I can finish the purchase.

## Actual Result
The First Name field shows "Lovelace" and the Last Name field is empty. Clicking Continue shows "Last Name is required" and the page does not move on. The purchase cannot be finished.

Screenshot of the error: [captura-error.png](./captura-error.png)

## Severity
High. Buying is the main purpose of a store and there is no way around this problem.

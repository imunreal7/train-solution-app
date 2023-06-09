# train-solution-app

Problem Description:
1. There are 80 seats in a coach of a train with only 7 seats in a row and last row of only 3 seats. For
simplicity, there is only one coach in this train.
2. One person can reserve up to 7 seats at a time.
3. If person is reserving seats, the priority will be to book them in one row.
4. If seats are not available in one row then the booking should be done in such a way that the nearby
seats are booked.
5. User can book as many tickets as s/he wants until the coach is full. 6. You don’t have to create login
functionality for this application.

How it should function?
1. Input required will only be the required number of seats. Example: 2 or 4 or 6 or 1 etc.
2. Output should be seats numbers that have been booked for the user along with the display of all the
seats and their availability status through color or number or anything else that you may feel fit.
What all you need to submit?


This code is solution as NodeJs functions as per the conditions and functionality mentioned above.

To run the code:
1. Clone the repository.
2. Run the command "npm start"

Now you can use an HTTP client like Postman or cURL to interact with the API.
Send a POST request to "http://localhost:3000/reserve" with the desired number of seats in the request body,
and you will receive the booked seat numbers in the response.
To check the availability of all seats, send a GET request to "http://localhost:3000/seats".

When you visit http://localhost:3000 in your web browser, you will see a simple interface with a form to reserve seats and a grid representing the seat availability. You can enter the number of seats you want to reserve and click the "Reserve" button. The grid will update to reflect the updated seat availability, and you will receive an alert message indicating the reserved seat numbers.

You can visit https://train-solution-app.onrender.com to test it on live environment.

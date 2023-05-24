const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Initialize seat availability
const totalSeats = 80;
const seatsPerRow = 7;
const rows = Math.floor(totalSeats / seatsPerRow);
const seats = Array(rows)
  .fill()
  .map(() => Array(seatsPerRow).fill(true));

// Configure Express to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Reserve seats endpoint
app.post('/reserve', (req, res) => {
  const numSeats = parseInt(req.body.seats);

  if (isNaN(numSeats) || numSeats <= 0) {
    return res.status(400).json({ message: 'Invalid number of seats' });
  }

  const seatNumbers = [];

  for (let row = 0; row < rows; row++) {
    let consecutiveSeats = 0;
    for (let seat = 0; seat < seatsPerRow; seat++) {
      if (seats[row][seat]) {
        consecutiveSeats++;
        if (consecutiveSeats === numSeats) {
          for (let i = seat - numSeats + 1; i <= seat; i++) {
            seats[row][i] = false;
            seatNumbers.push(`Row ${row + 1}, Seat ${i + 1}`);
          }
          return res.json({ seats: seatNumbers });
        }
      } else {
        consecutiveSeats = 0;
      }
    }
  }

  return res.status(404).json({ message: 'Seats not available' });
});

// Get all seats availability endpoint
app.get('/seats', (req, res) => {
  const seatStatus = seats.map((row, rowIndex) => {
    return row.map((seat, seatIndex) => {
      return {
        seatNumber: `Row ${rowIndex + 1}, Seat ${seatIndex + 1}`,
        available: seat,
      };
    });
  });

  res.json({ seats: seatStatus });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

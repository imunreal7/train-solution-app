document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservation-form');
  const seatGrid = document.getElementById('seat-grid');

  // Fetch all seat data from the server
  const fetchSeats = () => {
    fetch('/seats')
      .then((response) => response.json())
      .then((data) => {
        renderSeats(data.seats);
      })
      .catch((error) => console.error('Error:', error));
  };

  // Render the seat grid based on seat availability data
  const renderSeats = (seats) => {
    seatGrid.innerHTML = '';
    seats.forEach((row) => {
      row.forEach((seat) => {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat');
        if (seat.available) {
          seatElement.classList.add('available');
          seatElement.textContent = seat.seatNumber;
        } else {
          seatElement.classList.add('unavailable');
          seatElement.textContent = 'X';
        }
        seatGrid.appendChild(seatElement);
      });
    });
  };

  // Handle seat reservation form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const numSeats = parseInt(document.getElementById('num-seats').value);
    if (numSeats > 7 || numSeats < 1) {
      alert('Not a valid seat number');
    }
    reserveSeats(numSeats);
  });

  // Reserve seats via server request
  const reserveSeats = (numSeats) => {
    fetch('/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seats: numSeats }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchSeats();
        alert(`Seats reserved: ${data.seats.join(', ')}`);
      })
      .catch((error) => console.error('Error:', error));
  };

  // Initial seat grid rendering
  fetchSeats();
});

document.addEventListener('DOMContentLoaded', () => {
    const partyList = document.getElementById('partyList');
    const partyForm = document.getElementById('partyForm');
  
    const parties = [];
  
    // Function to display parties
    function displayParties() {
      partyList.innerHTML = '';
      parties.forEach((party, index) => {
        const partyItem = document.createElement('li');
        partyItem.innerHTML = `
          <strong>${party.name}</strong>
          <br>Date: ${party.date}, Time: ${party.time}
          <br>Location: ${party.location}
          <br>Description: ${party.description}
          <br><button data-index="${index}">Delete</button>
        `;
        partyList.appendChild(partyItem);
      });
    }
  
    // Function to add a new party
    function addParty(name, date, time, location, description) {
      const newParty = { name, date, time, location, description };
      parties.push(newParty);
      displayParties();
    }
  
    // Function to delete a party
    function deleteParty(index) {
      parties.splice(index, 1);
      displayParties();
    }
  
    // Event listener for submitting the party form
    partyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('partyName').value;
      const date = document.getElementById('partyDate').value;
      const time = document.getElementById('partyTime').value;
      const location = document.getElementById('partyLocation').value;
      const description = document.getElementById('partyDescription').value;
  
      addParty(name, date, time, location, description);
  
      // Clear form fields
      partyForm.reset();
    });
  
    // Event listener for deleting a party
    partyList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');
        deleteParty(index);
      }
    });
  });
  
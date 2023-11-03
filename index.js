document.addEventListener('DOMContentLoaded', () => {
    const partyList = document.getElementById('partyList');
    const partyForm = document.getElementById('partyForm');
    const errorContainer = document.getElementById('errorContainer');
  
    const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-pt-web-pt-b/events';
    const parties = [];
  
    async function fetchData() {
      try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-pt-web-pt-b/events');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        parties.length = 0; // Clear existing data
        parties.push(...data);
        displayParties();
      } catch (error) {
        showError(error.message);
      }
    }
  
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
  
    async function addParty(name, date, time, location, description) {
      try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-pt-web-pt-b/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, date, time, location, description }),
        });
        if (!response.ok) {
          throw new Error('Failed to add party');
        }
        await fetchData(); // Refresh the list after adding a party
      } catch (error) {
        showError(error.message);
      }
    }
  
    async function deleteParty(index) {
      const partyId = parties[index]._id;
  
      try {
        const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-pt-web-pt-b/events}`, {
                      method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete party');
        }
        await fetchData(); // Refresh the list after deleting a party
      } catch (error) {
        showError(error.message);
      }
    }
  
    function showError(message) {
      errorContainer.innerHTML = `<p class="error">${message}</p>`;
    }
  
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
  
    partyList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const index = e.target.getAttribute('data-index');
        deleteParty(index);
      }
    });
  
    // Initial data load
    fetchData();
  });
  
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [skillListings, setSkillListings] = useState([]);
  const [newListing, setNewListing] = useState({
    user: '',
    skillOffered: '',
    skillWanted: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/skillListings')
      .then((response) => {
        setSkillListings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching skill listings:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/skillListings', newListing)
      .then((response) => {
        setSkillListings([...skillListings, response.data]);
        setNewListing({ user: '', skillOffered: '', skillWanted: '' });
      })
      .catch((error) => {
        console.error('Error creating skill listing:', error);
      });
  };

  return (
    <div>
      <h1>SkillSwap</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          value={newListing.user}
          onChange={handleInputChange}
          placeholder="User"
        />
        <input
          type="text"
          name="skillOffered"
          value={newListing.skillOffered}
          onChange={handleInputChange}
          placeholder="Skill Offered"
        />
        <input
          type="text"
          name="skillWanted"
          value={newListing.skillWanted}
          onChange={handleInputChange}
          placeholder="Skill Wanted"
        />
        <button type="submit">Add Listing</button>
      </form>
      <div>
        <h2>Skill Listings</h2>
        <ul>
          {skillListings.map((listing) => (
            <li key={listing.id}>
              <strong>{listing.user}</strong> can teach <em>{listing.skillOffered}</em> in exchange for <em>{listing.skillWanted}</em>.
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

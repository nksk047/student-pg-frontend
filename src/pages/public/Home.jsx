import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Find the Perfect Student PG or Home</h1>
        <p>Search, filter, and favorite PGs across India. Safe, Verified, and Student-Friendly.</p>
        <a href="/listings" className="cta-button">Browse Listings</a>
      </section>

      <section className="features">
        <div className="feature-card fade-in">
          <h3>Verified Owners</h3>
          <p>Every PG is listed by a verified owner to ensure safety and trust.</p>
        </div>
        <div className="feature-card fade-in delay-1">
          <h3>Smart Filters</h3>
          <p>Filter by city, gender, price, and amenities in seconds.</p>
        </div>
        <div className="feature-card fade-in delay-2">
          <h3>Favorites & Dashboard</h3>
          <p>Save PGs and manage them all in one student dashboard.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

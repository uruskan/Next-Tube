'use client';

import React, { useState } from 'react';
import styles from '../styles/MassAdder.module.css';

const MassAdder = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const wordClusters = text.split('#').map(word => word.trim()).filter(word => word);

      // Function to get random items from array
      const getRandomItems = (arr, num) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      };

      // Generate random data for videos
      const videos = [];
      for (let i = 0; i < 10; i++) { // Adjust the number of videos as needed
        const title = getRandomItems(wordClusters, 5).join(' ');
        const description = getRandomItems(wordClusters, 20).join(' ');
        const category = getRandomItems(wordClusters, 1).join(' ');
        const tags = getRandomItems(wordClusters, 3);
        const comments = Array.from({ length: 5 }, () => ({
          userId: getRandomItems(wordClusters, 1).join(' '),
          text: getRandomItems(wordClusters, 20).join(' '),
        }));

        // Generate random video URL and thumbnail
        const videoUrl = `https://www.youtube.com/watch?v=${Math.random().toString(36).substring(7)}`;
        const thumbnail = `https://via.placeholder.com/150?text=${Math.random().toString(36).substring(7)}`;

        videos.push({ title, description, url: videoUrl, thumbnail, tags, category, comments });
      }

      try {
        // Send the generated videos to the API
        const response = await fetch('/api/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ videos }),
        });

        if (response.ok) {
          setMessage('Videos and comments added successfully.');
        } else {
          setMessage('Failed to add videos and comments.');
        }
      } catch (error) {
        console.error('Error adding videos and comments:', error);
        setMessage('Error adding videos and comments.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles.massAdderContainer}>
      <h1 className={styles.heading}>Mass Adder</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="file" accept=".txt" onChange={handleFileChange} className={styles.fileInput} />
        <button type="submit" className={styles.submitButton}>Add Videos and Comments</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default MassAdder;

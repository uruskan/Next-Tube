'use client';
import React, { useState } from 'react';
import styles from '../styles/AddVideo.module.css';

const AddVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState(''); // Add category state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          url,
          thumbnail,
          tags: tagsArray,
          category, // Include category in request
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add video');
      }
      alert('Video added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add video');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className={styles.textarea}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <input
        className={styles.input}
        type="text"
        placeholder="Video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Thumbnail URL"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        required
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <button className={styles.button} type="submit">Add Video</button>
    </form>
  );
};

export default AddVideo;

'use client';
import React, { useState } from 'react';

const AddVideo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');

  const handleAddVideo = async () => {
    const video = {
      title,
      description,
      url,
      thumbnail,
      tags: tags.split(',').map(tag => tag.trim()),
      category,
      comments: comments.split(',').map(text => ({ text: text.trim() })),
    };

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      });

      if (response.ok) {
        alert('Video added successfully!');
      } else {
        alert('Failed to add video');
      }
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  return (
    <div>
      <h1>Add Video</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
      <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="Thumbnail" />
      <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
      <input value={comments} onChange={e => setComments(e.target.value)} placeholder="Comments (comma separated)" />
      <button onClick={handleAddVideo}>Add Video</button>
    </div>
  );
};

export default AddVideo;

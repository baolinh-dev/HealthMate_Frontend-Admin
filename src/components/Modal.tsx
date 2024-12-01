// components/Modal.tsx

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, status: 'draft' | 'published') => void; // Update type here
  blog: { title: string; content: string; status: 'draft' | 'published' }; // Update type here
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, blog }) => {
  const [title, setTitle] = React.useState(blog.title);
  const [content, setContent] = React.useState(blog.content);
  const [status, setStatus] = React.useState(blog.status);

  const handleSave = () => {
    onSave(title, content, status);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h3>Edit Blog</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle: React.CSSProperties = {
  background: 'white',
  padding: '20px',
  borderRadius: '5px',
  width: '400px',
};

export default Modal;
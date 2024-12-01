import React, { useEffect, useState } from 'react';
import { fetchBlogs, searchBlogs, updateBlog } from '../../apis/blogsApi';
import { Blog } from '../../interfaces/Blog';

const BlogsTable: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [authorId, setAuthorId] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
        setSearchResult(data);
      } catch (err) {
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const handleSearch = async () => {
    try {
      const data = await searchBlogs(query, status, authorId);
      setSearchResult(data);
    } catch (err) {
      setError('Error searching blogs');
    }
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete blog with ID: ${id}`);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log(`Update blog with ID: ${id} to status: ${newStatus}`);
  };

  const handleModalSave = async (title: string, content: string, status: 'draft' | 'published') => {
    if (selectedBlog) {
      try {
        await updateBlog(selectedBlog._id, { title, content, status });
        setSearchResult((prev) =>
          prev.map((blog) =>
            blog._id === selectedBlog._id ? { ...blog, title, content, status } : blog
          )
        );
      } catch (err) {
        setError('Error updating blog');
      }
    }
    handleModalClose(); // Close the modal after saving
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
  };

  const thTdStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: '#f2f2f2',
  };

  const imgStyle: React.CSSProperties = {
    width: '100px',
    height: '100px',
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleStatusChangeInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleAuthorIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorId(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Blogs List</h2>

      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search by title"
      />

      <select value={status} onChange={handleStatusChangeInput}>
        <option value="">All Status</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <input
        type="text"
        value={authorId}
        onChange={handleAuthorIdChange}
        placeholder="Search by author ID"
      />

      <button onClick={handleSearch}>Search</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...thStyle }}>Title</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Content</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Status</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Author</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Image</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((blog) => (
            <tr key={blog._id}>
              <td style={thTdStyle}>{blog.title}</td>
              <td style={thTdStyle}>{blog.content}</td>
              <td style={thTdStyle}>
                <select
                  value={blog.status}
                  onChange={(e) => handleStatusChange(blog._id, e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </td>
              <td style={thTdStyle}>{blog.authorId}</td>
              <td style={thTdStyle}>
                <img src={blog.image} alt={blog.title} style={imgStyle} />
              </td>
              <td style={thTdStyle}>
                <button onClick={() => handleEdit(blog)}>Edit</button>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing blog */}
      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Edit Blog</h3>
            <input
              type="text"
              value={selectedBlog ? selectedBlog.title : ''}
              onChange={(e) => setSelectedBlog((prev) => prev ? { ...prev, title: e.target.value } : prev)}
              placeholder="Title"
            />
            <textarea
              value={selectedBlog ? selectedBlog.content : ''}
              onChange={(e) => setSelectedBlog((prev) => prev ? { ...prev, content: e.target.value } : prev)}
              placeholder="Content"
            />
            <select
              value={selectedBlog ? selectedBlog.status : 'draft'}
              onChange={(e) => setSelectedBlog((prev) => prev ? { ...prev, status: e.target.value as 'draft' | 'published' } : prev)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <button onClick={() => handleModalSave(selectedBlog!.title, selectedBlog!.content, selectedBlog!.status)}>Save</button>
            <button onClick={handleModalClose}>Cancel</button>
          </div>
        </div>
      )}
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

export default BlogsTable;
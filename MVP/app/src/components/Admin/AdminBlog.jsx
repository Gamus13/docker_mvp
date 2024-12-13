
// import React, { useEffect, useState } from 'react';
// import axios from '../../axios';

// const AdminBlog = () => {
//     const [tags, setTags] = useState([]);
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [description, setDescription] = useState('');
//     const [category, setCategory] = useState('');
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [image, setImage] = useState(null);

//     useEffect(() => {
//         axios.get('/tags')
//             .then(response => setTags(response.data))
//             .catch(error => console.error('Error fetching tags:', error));
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('content', content);
//         formData.append('description', description);
//         formData.append('category', category);
//         formData.append('image', image);
//         selectedTags.forEach(tagId => formData.append('tags[]', tagId));

//         axios.post('/posts', formData)
//             .then(response => console.log('Post created:', response.data))
//             .catch(error => console.error('Error creating post:', error));
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="title">Title</label>
//                 <input
//                     type="text"
//                     id="title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
//             </div>

//             <div>
//                 <label htmlFor="content">Content</label>
//                 <textarea
//                     id="content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     required
//                 />
//             </div>

//             <div>
//                 <label htmlFor="description">Description</label>
//                 <textarea
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="category">Category</label>
//                 <input
//                     type="text"
//                     id="category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="image">Image</label>
//                 <input
//                     type="file"
//                     id="image"
//                     onChange={(e) => setImage(e.target.files[0])}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="tags">Tags</label>
//                 <select
//                     id="tags"
//                     multiple
//                     value={selectedTags}
//                     onChange={(e) => setSelectedTags([...e.target.options].filter(option => option.selected).map(option => option.value))}
//                 >
//                     {tags.map(tag => (
//                         <option key={tag.id} value={tag.id}>{tag.name}</option>
//                     ))}
//                 </select>
//             </div>

//             <button type="submit">Create Post</button>
//         </form>
//     );
// };

// export default AdminBlog;


import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const AdminBlog = () => {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        axios.get('/tags')
            .then(response => setTags(response.data))
            .catch(error => console.error('Error fetching tags:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('description', description);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }
        selectedTags.forEach(tagId => formData.append('tags[]', tagId));

        axios.post('/posts', formData)
            .then(response => console.log('Post created:', response.data))
            .catch(error => console.error('Error creating post:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="tags">Tags</label>
                <select
                    id="tags"
                    multiple
                    value={selectedTags}
                    onChange={(e) => setSelectedTags([...e.target.options].filter(option => option.selected).map(option => option.value))}
                >
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit">Create Post</button>
        </form>
    );
};

export default AdminBlog;


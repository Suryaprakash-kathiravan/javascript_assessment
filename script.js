// Array to store blog posts
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// DOM Elements
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts');

// Function to save posts to localStorage
function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to render posts on the main page
function renderPosts() {
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'bg-white p-6 rounded-lg shadow-md';
    postElement.innerHTML = `
      <h2 class="text-xl font-bold">${post.title}</h2>
      <p class="mt-2">${post.content}</p>
      <div class="mt-4 space-x-4">
        <a href="create.html?edit=${index}" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</a>
        <button onclick="deletePost(${index})" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Function to handle form submission (Create/Edit Post)
if (postForm) {
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title && content) {
      const urlParams = new URLSearchParams(window.location.search);
      const editIndex = urlParams.get('edit');

      if (editIndex !== null) {
        // Edit existing post
        posts[editIndex] = { title, content };
      } else {
        // Create new post
        posts.push({ title, content });
      }

      savePosts();
      window.location.href = 'index.html'; // Redirect to the main page
    }
  });
}

// Function to delete a post
function deletePost(index) {
  posts.splice(index, 1);
  savePosts();
  renderPosts();
}

// Load posts on the main page
if (postsContainer) {
  renderPosts();
}

// Pre-fill form for editing
if (postForm) {
  const urlParams = new URLSearchParams(window.location.search);
  const editIndex = urlParams.get('edit');

  if (editIndex !== null) {
    const post = posts[editIndex];
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
  }
}
# Creatorverse

A modern React CRUD app for sharing your favorite content creators. Built for CodePath WEB103 Prework, using React, Supabase, and a beautiful card-based UI.

---

## 🚀 Features

- **View All Creators:** See a list of your favorite content creators, each displayed as a card.
- **View Details:** Click a creator to see their full details, including name, description, image, and a link to their channel.
- **Add Creator:** Add a new creator with name, URL, description, and optional image.
- **Edit Creator:** Update any creator's information with a user-friendly form.
- **Delete Creator:** Remove a creator with a single click (with confirmation).
- **Visit Channel:** Go directly to a creator's channel/page.
- **Responsive Design:** Works great on desktop and mobile.
- **Visual Feedback:** Success/error messages, loading spinners, and clear button states.

---

## 📸 Screenshots

> _Add screenshots or a Loom/GIF walkthrough here!_

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, React Router
- **Backend:** Supabase (Postgres)
- **Styling:** Custom CSS

---

## 📝 Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Mustafaahmed00/creatorverse.git
   cd creatorverse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a project at [supabase.com](https://supabase.com)
   - Create a `creators` table with columns: `name`, `url`, `description`, `imageURL`
   - Copy your Supabase URL and API key into `src/client.js`
  
4. **Start the app:**
   ```bash
   npm run dev
   ```
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

---

## ✅ Required Features

- [x] Use a logical component structure in React to create the frontend of the app
- [x] Display at least five content creators on the homepage of the app
- [x] Each content creator item includes:
  - [x] their name
  - [x] a link to their channel or page
  - [x] a short description of their content
- [x] API calls use the async/await design pattern via Axios or fetch
- [x] Clicking on a content creator item takes the user to their details page, which includes their name, url, and description
- [x] Each content creator has their own unique URL
- [x] The user can edit a content creator to change their name, url, or description
- [x] The user can delete a content creator
- [x] The user can add a new content creator by entering a name, url, and description
- [x] The new content creator then appears in the displayed list

---

## 🌟 Stretch Features

- [x] Use Picocss to style HTML elements (Custom CSS with modern styling)
- [x] Display content creator items in a creative format, like cards instead of a list
- [x] Show an image of each content creator on their content creator card
- [x] Loading states and error handling for better UX
- [x] Platform detection with appropriate icons (YouTube, Instagram, TikTok, Twitch, Twitter/X)
- [x] Responsive design that works on all devices
- [x] Visual feedback for all user actions
- [x] Inline editing capabilities
- [x] Image loading with fallback placeholders

---

## 📄 License

MIT

---

## 👤 Author

- [Mustafa Ahmed](https://github.com/Mustafaahmed00)

---

## 📣 Acknowledgements

- [CodePath WEB103](https://www.codepath.org/)
- [Supabase](https://supabase.com)
- [React](https://react.dev)

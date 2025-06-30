# Creatorverse

A modern React CRUD app for sharing your favorite content creators. Built for CodePath WEB103 Prework, using React, Supabase, and a beautiful card-based UI.

---

## 🚀 Features

- **View All Creators:** See a list of your favorite content creators, each displayed as a card.
- **View Details:** Click a creator to see their full details, including name, description, image, and a link to their channel.
- **Add Creator:** Add a new creator with name, URL, description, and optional image.
- **Edit Creator:** Update any creator’s information with a user-friendly form.
- **Delete Creator:** Remove a creator with a single click (with confirmation).
- **Visit Channel:** Go directly to a creator’s channel/page.
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

## ✅ Completed Features

- [x] View all creators
- [x] View single creator details
- [x] Add a new creator
- [x] Edit a creator
- [x] Delete a creator
- [x] Visit creator’s channel
- [x] Responsive, modern UI
- [x] Visual feedback for all actions

---

## 🌟 Stretch Features

- [x] Card-based layout
- [x] Image support for creators
- [x] Loading spinners and error handling
- [x] Success/error messages for all operations

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

# ✅ Testing Instructions

### 🧪 Prerequisites:

* Node.js installed
* MongoDB URI
* A YouTube OAuth access token (manually generated for testing)

### 🧪 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_youtube_data_api_key
```

---

## ✅ Manual Testing Flow

### 1. Start your server:

```bash
npm install
npm run dev
```

---

### 2. Test OAuth (Simulated for Now)

Use Postman:

```http
POST /api/auth/google/callback
Body: { userId: "some-unique-user-id" }
```

→ You'll receive a user document in response.

---

### 3. Add a Note

```http
POST /api/notes
Headers: { x-user-id: your_user_id }
Body:
{
  "videoId": "your_youtube_video_id",
  "content": "Improve thumbnail"
}
```

---

### 4. Get Notes for a Video

```http
GET /api/notes/{videoId}
Headers: { x-user-id: your_user_id }
```

---

### 5. Delete a Note

```http
DELETE /api/notes/{noteId}
Headers: { x-user-id: your_user_id }
```

---

### 6. Fetch Video Details

```http
GET /api/videos/{videoId}
Headers: { x-user-id: your_user_id }
```

---

### 7. Update Video Title/Description

```http
PUT /api/videos/{videoId}
Headers: { x-user-id: your_user_id }
Body:
{
  "title": "New Title",
  "description": "Updated Description"
}
```

---

### 8. Get All Logs

```http
GET /api/events
Headers: { x-user-id: your_user_id }
```

---

# ✅ README.md (Backend)

```md
# 🎬 YouTube Companion Dashboard – Backend (MERN Stack)

This backend app allows users to interact with their uploaded YouTube videos, add notes, manage metadata, and track event logs.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- YouTube Data API
- Google OAuth2 (manual simulation)

---

## 📁 Folder Structure

```

📦backend
┣ 📂controllers
┣ 📂services
┣ 📂dao
┣ 📂models
┣ 📂routes
┣ 📂middleware
┣ 📄.env
┣ 📄server.js

````

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Endpoint                       | Description                  |
|--------|--------------------------------|------------------------------|
| POST   | `/api/auth/google/callback`    | Simulate Google OAuth login |

---

### 📓 Notes

| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| POST   | `/api/notes`              | Add a note                |
| GET    | `/api/notes/:videoId`     | Get all notes for a video|
| DELETE | `/api/notes/:id`          | Delete a note             |

---

### 📺 Video

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/videos/:id`         | Fetch video details via API     |
| PUT    | `/api/videos/:id`         | Update title and description    |

---

### 🧾 Logs

| Method | Endpoint       | Description                   |
|--------|----------------|-------------------------------|
| GET    | `/api/events`  | View user's activity logs     |

---

## 🗃️ Database Schema

### User

```js
{
  _id: ObjectId,
  googleId: String,
  name: String,
  email: String,
}
````

---

### Note

```js
{
  _id: ObjectId,
  userId: ObjectId,
  videoId: String,
  content: String,
  createdAt: Date
}
```

---

### EventLog

```js
{
  _id: ObjectId,
  userId: ObjectId,
  action: String,
  details: String,
  timestamp: Date
}
```

---

## 🏁 Run the Server

```bash
npm install
npm run dev
```

---

## 🔐 Auth Strategy (Simulated)

Google OAuth is simulated with a single POST endpoint for ease of testing. Actual implementation can integrate `passport.js` or `google-auth-library`.

---

## ✅ To Do (if desired)

* Integrate full Google OAuth flow
* Token-based auth (JWT)
* Add comment + reply YouTube API endpoints

---

## 💡 License

MIT

```

---

✅ This completes the full backend setup, including middleware, testing flow, and a professional-grade `README.md`.

Would you now like to:
- Proceed with the **frontend (React + Vite)** setup?
- Or package and send the full backend as a `.zip` file?
```

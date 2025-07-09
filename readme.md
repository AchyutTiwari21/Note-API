# 📝 Note-API

This is the **backend API** for the Note-Taking App. It supports user authentication (email + OTP & Google OAuth), note creation and deletion, and JWT-based authorization.

---

## 📦 Tech Stack

- **Node.js** with **Express**
- **TypeScript**
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **Nodemailer** / mock OTP service
- **CORS**, **dotenv**, **cookie-parser**
- **Google OAuth**

---

## 🔧 Setup Instructions

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/your-username/note-taking-backend.git
cd Note-API
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Create .env file

Copy \`.env.example\` and configure environment variables:

\`\`\`bash
cp .env.example .env
\`\`\`

#### .env

\`\`\`env
PORT=8000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=expiry_time

MAIL_HOST=your_email@example.com
MAIL_USER=your_email@example.com
MAIL_PASS=your_password
\`\`\`

---

## 🚀 Run the Server

### Development Mode (with hot-reload)

\`\`\`bash
npm run dev
\`\`\`

### Production Mode

\`\`\`bash
npm run build
npm start
\`\`\`

---

## 📌 API Endpoints

### Auth Routes (\`/api/v1/user\`)

| Method | Route                  | Description                     |
|--------|------------------------|---------------------------------|
| POST   | \`/send-otp\`            | Send OTP to email               |
| POST   | \`/signup\`              | Signup using email + OTP        |
| POST   | \`/signin\`               | Login using email + OTP         |
| POST   | \`/signout\`              | Log out                         |

---

### Notes Routes (\`/api/v1/note\`)

| Method | Route                  | Description               |
|--------|------------------------|---------------------------|
| GET    | \`/get-notes\`            | Get all notes of user     |
| POST   | \`/add-note\`              | Create a new note         |
| PUT    | \`/update-note/:id\`          | Update a note             |
| DELETE | \`/delete-note/:id\`          | Delete a note             |

> All note routes are protected and require a valid JWT (via cookies).

---

## 🔐 Auth & Security

- **JWT** used for secure access to protected routes.
- **HttpOnly Cookies** used to store tokens (safer than localStorage).
- **CORS** is configured to allow frontend access from \`http://localhost:5173\`.

---

## 🧪 Testing

Use Postman or your frontend app to hit the endpoints. Ensure the \`credentials: 'include'\` flag is set in frontend requests for cookies.

---

## 📁 Project Structure

\`\`\`
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
└── index.ts
\`\`\`

---

## 🙋‍♂️ Author

Achyut Tiwari  
Feel free to contribute, suggest, or fork!
EOF

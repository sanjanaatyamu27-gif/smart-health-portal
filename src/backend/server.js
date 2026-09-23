// ============================================================
// SMART HEALTH PORTAL - BACKEND SERVER
// ============================================================

// Load .env from backend folder
require("dotenv").config({
  path: __dirname + "/.env"
});


// ============================================================
// IMPORTS
// ============================================================

const express = require("express");
const cors = require("cors");
const webpush = require("web-push");
const cron = require("node-cron");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");


// ============================================================
// EXPRESS APP
// ============================================================

const app = express();


// ============================================================
// HTTP SERVER
// ============================================================

const server = http.createServer(app);


// ============================================================
// PORT
// ============================================================

const PORT = 5000;


// ============================================================
// CORS
// ============================================================

// Allow both common Vite development ports.
// This prevents problems if Vite runs on 5173 or 5174.

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow requests without an origin
      // such as Postman or server-side requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS origin not allowed")
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);


// ============================================================
// JSON MIDDLEWARE
// ============================================================

app.use(express.json());


// ============================================================
// MYSQL CONNECTION POOL
// ============================================================

const db = mysql.createPool({

  host:
    process.env.DB_HOST || "localhost",

  user:
    process.env.DB_USER || "root",

  password:
    process.env.DB_PASSWORD,

  database:
    process.env.DB_NAME ||
    "smart_health_portal",

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0

});


// ============================================================
// SOCKET.IO
// ============================================================

const io = new Server(server, {

  cors: {

    origin: allowedOrigins,

    methods: [
      "GET",
      "POST"
    ]

  }

});


// ============================================================
// WEB PUSH / VAPID
// ============================================================

if (
  !process.env.VAPID_PUBLIC_KEY ||
  !process.env.VAPID_PRIVATE_KEY
) {

  console.error(
    "❌ VAPID keys are missing from .env"
  );

} else {

  webpush.setVapidDetails(

    "mailto:sanjanaatyamu2006@gmail.com",

    process.env.VAPID_PUBLIC_KEY,

    process.env.VAPID_PRIVATE_KEY

  );

}


// ============================================================
// TEST MYSQL CONNECTION
// ============================================================

async function testDatabase() {

  try {

    const connection =
      await db.getConnection();

    console.log(
      "✅ MySQL connected successfully!"
    );

    connection.release();

  } catch (error) {

    console.error(
      "❌ MySQL connection failed:",
      error.message
    );

  }

}

testDatabase();


// ============================================================
// TEST BACKEND
// ============================================================

app.get("/", (req, res) => {

  res.json({

    message:
      "Smart Health Portal Backend is running!"

  });

});


// ============================================================
// REGISTER USER
// ============================================================

app.post(
  "/api/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;


      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all fields."

        });

      }


      const [existingUsers] =
        await db.execute(

          `
          SELECT *
          FROM users
          WHERE email = ?
          `,

          [email]

        );


      if (
        existingUsers.length > 0
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Email already registered."

        });

      }


      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      const [result] =
        await db.execute(

          `
          INSERT INTO users
          (name, email, password)
          VALUES (?, ?, ?)
          `,

          [
            name,
            email,
            hashedPassword
          ]

        );


      res.status(201).json({

        success: true,

        message:
          "Registration successful! Please login.",

        user: {

          id:
            result.insertId,

          name,

          email

        }

      });

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Registration failed."

      });

    }

  }
);


// ============================================================
// LOGIN USER
// ============================================================

app.post(
  "/api/login",
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;


      if (
        !email ||
        !password
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter email and password."

        });

      }


      const [users] =
        await db.execute(

          `
          SELECT *
          FROM users
          WHERE email = ?
          `,

          [email]

        );


      if (
        users.length === 0
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password."

        });

      }


      const user =
        users[0];


      const passwordMatch =
        await bcrypt.compare(

          password,

          user.password

        );


      if (!passwordMatch) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password."

        });

      }


      res.json({

        success: true,

        message:
          "Login successful!",

        user: {

          id:
            user.id,

          name:
            user.name,

          email:
            user.email

        }

      });

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Login failed."

      });

    }

  }
);


// ============================================================
// SUBMIT FEEDBACK
// ============================================================

app.post(
  "/api/feedback",
  async (req, res) => {

    try {

      const {
        name,
        email,
        rating,
        message
      } = req.body;


      if (
        !name ||
        !email ||
        !rating ||
        !message
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please fill all feedback fields."

        });

      }


      await db.execute(

        `
        INSERT INTO feedback
        (name, email, rating, message)
        VALUES (?, ?, ?, ?)
        `,

        [
          name,
          email,
          rating,
          message
        ]

      );


      res.status(201).json({

        success: true,

        message:
          "Feedback submitted successfully!"

      });

    } catch (error) {

      console.error(
        "Feedback error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Could not save feedback."

      });

    }

  }
);


// ============================================================
// GET ALL FEEDBACK
// ============================================================

app.get(
  "/api/feedback",
  async (req, res) => {

    try {

      const [feedback] =
        await db.execute(

          `
          SELECT *
          FROM feedback
          ORDER BY id DESC
          `

        );


      res.json(feedback);

    } catch (error) {

      console.error(
        "Error loading feedback:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Could not load feedback."

      });

    }

  }
);


// ============================================================
// PUSH PUBLIC KEY
// ============================================================

app.get(
  "/api/push/public-key",
  (req, res) => {

    res.json({

      publicKey:
        process.env.VAPID_PUBLIC_KEY

    });

  }
);


// ============================================================
// SAVE PUSH SUBSCRIPTION
// ============================================================

app.post(
  "/api/push/subscribe",
  async (req, res) => {

    try {

      const {
        user_id,
        subscription
      } = req.body;


      if (
        !user_id ||
        !subscription
      ) {

        return res.status(400).json({

          success: false,

          message:
            "User ID and subscription are required."

        });

      }


      const {
        endpoint,
        keys
      } = subscription;


      if (
        !endpoint ||
        !keys ||
        !keys.p256dh ||
        !keys.auth
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid push subscription."

        });

      }


      // Check whether this endpoint already exists.
      const [existing] =
        await db.execute(

          `
          SELECT id
          FROM push_subscriptions
          WHERE endpoint = ?
          `,

          [endpoint]

        );


      if (
        existing.length === 0
      ) {

        await db.execute(

          `
          INSERT INTO push_subscriptions
          (
            user_id,
            endpoint,
            p256dh,
            auth
          )
          VALUES (?, ?, ?, ?)
          `,

          [
            user_id,
            endpoint,
            keys.p256dh,
            keys.auth
          ]

        );

      }


      res.json({

        success: true,

        message:
          "Push notification enabled."

      });

    } catch (error) {

      console.error(
        "Subscription save error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Could not save push subscription."

      });

    }

  }
);


// ============================================================
// ADD PILL REMINDER
// ============================================================

app.post(
  "/api/pill-reminders",
  async (req, res) => {

    try {

      const {
        user_id,
        medicine_name,
        dosage,
        reminder_time,
        start_date,
        end_date
      } = req.body;


      if (
        !user_id ||
        !medicine_name ||
        !reminder_time
      ) {

        return res.status(400).json({

          success: false,

          message:
            "User ID, medicine name and reminder time are required."

        });

      }


      const [result] =
        await db.execute(

          `
          INSERT INTO pill_reminders
          (
            user_id,
            medicine_name,
            dosage,
            reminder_time,
            start_date,
            end_date,
            status
          )
          VALUES (?, ?, ?, ?, ?, ?, 'active')
          `,

          [
            user_id,
            medicine_name,
            dosage || null,
            reminder_time,
            start_date || null,
            end_date || null
          ]

        );


      io.emit(
        "pillReminderAdded",
        {

          user_id,

          medicine_name,

          reminder_time,

          reminder_id:
            result.insertId

        }
      );


      res.status(201).json({

        success: true,

        message:
          "Pill reminder added successfully.",

        reminder_id:
          result.insertId

      });

    } catch (error) {

      console.error(
        "Add pill reminder error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Could not save pill reminder."

      });

    }

  }
);


// ============================================================
// GET USER PILL REMINDERS
// ============================================================

app.get(
  "/api/pill-reminders/:user_id",
  async (req, res) => {

    try {

      const {
        user_id
      } = req.params;


      const [reminders] =
        await db.execute(

          `
          SELECT *
          FROM pill_reminders
          WHERE user_id = ?
          ORDER BY reminder_time ASC
          `,

          [user_id]

        );


      res.json({

        success: true,

        reminders

      });

    } catch (error) {

      console.error(
        "Get pill reminders error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Could not load pill reminders."

      });

    }

  }
);


// ============================================================
// DELETE PILL REMINDER
// ============================================================

app.delete(
  "/api/pill-reminders/:id",
  async (req, res) => {

    try {

      const {
        id
      } = req.params;


      await db.execute(

        `
        DELETE FROM pill_reminders
        WHERE id = ?
        `,

        [id]

      );


      io.emit(
        "pillReminderDeleted",
        {
          id
        }
      );


      res.json({

        success: true,

        message:
          "Pill reminder deleted successfully."

      });

    } catch (error) {

      console.error(
        "Delete pill reminder error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Could not delete pill reminder."

      });

    }

  }
);


// ============================================================
// CHECK PILL REMINDERS EVERY MINUTE
// ============================================================

cron.schedule(
  "* * * * *",
  async () => {

    try {

      


      const [reminders] =
        await db.execute(

          `
          SELECT *
          FROM pill_reminders
          WHERE status = 'active'

          AND TIME_FORMAT(
            reminder_time,
            '%H:%i'
          )
          =
          TIME_FORMAT(
            NOW(),
            '%H:%i'
          )

          AND (
            start_date IS NULL
            OR CURDATE() >= start_date
          )

          AND (
            end_date IS NULL
            OR CURDATE() <= end_date
          )
          `

        );


      if (
        reminders.length === 0
      ) {

        return;

      }


      console.log(
        "Pill reminders found:",
        reminders.length
      );


      for (
        const reminder
        of reminders
      ) {


        const [
          subscriptions
        ] =
          await db.execute(

            `
            SELECT *
            FROM push_subscriptions
            WHERE user_id = ?
            `,

            [reminder.user_id]

          );


        for (
          const sub
          of subscriptions
        ) {


          const pushSubscription = {

            endpoint:
              sub.endpoint,

            keys: {

              p256dh:
                sub.p256dh,

              auth:
                sub.auth

            }

          };


          const dosageText =
            reminder.dosage
              ? ` - ${reminder.dosage}`
              : "";


          const payload =
            JSON.stringify({

              title:
                "💊 Pill Reminder",

              body:
                `Time to take ${reminder.medicine_name}${dosageText}`

            });


          try {

            await webpush.sendNotification(

              pushSubscription,

              payload

            );


            console.log(

              "✅ Notification sent:",

              reminder.medicine_name

            );


          } catch (pushError) {

            console.error(

              "❌ Push notification error:",

              pushError.message

            );

          }

        }

      }

    } catch (error) {

      console.error(

        "Reminder checker error:",

        error

      );

    }

  }
);


// ============================================================
// SOCKET.IO CONNECTION
// ============================================================

io.on(
  "connection",
  (socket) => {

    console.log(
      "🔌 User connected:",
      socket.id
    );


    socket.on(
      "disconnect",
      () => {

        console.log(
          "🔌 User disconnected:",
          socket.id
        );

      }
    );

  }
);




// ============================================================
// BMI HISTORY
// ============================================================
app.post("/api/bmi", async (req, res) => {
  try {
    const { user_id, height, weight } = req.body;
    const h = Number(height), w = Number(weight);
    if (!user_id || !Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) {
      return res.status(400).json({ success:false, message:"Valid user, height and weight are required." });
    }
    const bmi = w / Math.pow(h / 100, 2);
    const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : bmi < 30 ? "Overweight" : "Obese";
    const [result] = await db.execute(
      "INSERT INTO bmi_records (user_id,height,weight,bmi,category) VALUES (?,?,?,?,?)",
      [user_id,h,w,bmi.toFixed(2),category]
    );
    res.status(201).json({ success:true, id:result.insertId, bmi:Number(bmi.toFixed(1)), category });
  } catch (error) {
    console.error("BMI save error:", error.message);
    res.status(500).json({ success:false, message:"Could not save BMI record." });
  }
});

app.get("/api/bmi/:user_id", async (req,res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM bmi_records WHERE user_id=? ORDER BY created_at DESC", [req.params.user_id]);
    res.json({ success:true, records:rows });
  } catch (error) { res.status(500).json({success:false,message:"Could not load BMI history."}); }
});

// ============================================================
// CHATBOT HISTORY
// ============================================================
app.post("/api/chat/conversations", async (req,res) => {
  try {
    const { user_id, title } = req.body;
    if (!user_id) return res.status(400).json({success:false,message:"User ID required."});
    const [r] = await db.execute("INSERT INTO chatbot_conversations (user_id,title) VALUES (?,?)", [user_id,title || "Health Assistant Chat"]);
    res.status(201).json({success:true,conversation_id:r.insertId});
  } catch(error){ res.status(500).json({success:false,message:"Could not create conversation."}); }
});

app.post("/api/chat/messages", async (req,res) => {
  try {
    const { conversation_id, sender, message } = req.body;
    if (!conversation_id || !sender || !message) return res.status(400).json({success:false,message:"Conversation, sender and message are required."});
    await db.execute("INSERT INTO chatbot_messages (conversation_id,sender,message) VALUES (?,?,?)", [conversation_id,sender,message]);
    res.status(201).json({success:true});
  } catch(error){ res.status(500).json({success:false,message:"Could not save chat message."}); }
});

app.get("/api/chat/history/:user_id", async (req,res) => {
  try {
    const [rows] = await db.execute(`SELECT c.id conversation_id,c.title,c.created_at conversation_created_at,m.sender,m.message,m.created_at FROM chatbot_conversations c LEFT JOIN chatbot_messages m ON m.conversation_id=c.id WHERE c.user_id=? ORDER BY c.created_at DESC,m.created_at ASC`, [req.params.user_id]);
    res.json({success:true,history:rows});
  } catch(error){ res.status(500).json({success:false,message:"Could not load chat history."}); }
});

// ============================================================
// ACTION LOGS / PROFILE
// ============================================================
app.post("/api/action-logs", async (req,res) => {
  try {
    const { user_id, action, details, page } = req.body;
    if (!action) return res.status(400).json({success:false,message:"Action is required."});
    await db.execute("INSERT INTO action_logs (user_id,action,details,page) VALUES (?,?,?,?)", [user_id || null,action,details || null,page || null]);
    res.status(201).json({success:true});
  } catch(error){ res.status(500).json({success:false,message:"Could not save activity."}); }
});

app.get("/api/action-logs/:user_id", async (req,res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM action_logs WHERE user_id=? ORDER BY created_at DESC LIMIT 50", [req.params.user_id]);
    res.json({success:true,logs:rows});
  } catch(error){ res.status(500).json({success:false,message:"Could not load activity."}); }
});

app.get("/api/profile/:user_id", async (req,res) => {
  try {
    const [users] = await db.execute("SELECT id,name,email,created_at FROM users WHERE id=?", [req.params.user_id]);
    if (!users.length) return res.status(404).json({success:false,message:"User not found."});
    const [bmi] = await db.execute("SELECT * FROM bmi_records WHERE user_id=? ORDER BY created_at DESC LIMIT 10", [req.params.user_id]);
    const [pills] = await db.execute("SELECT * FROM pill_reminders WHERE user_id=? ORDER BY reminder_time ASC", [req.params.user_id]);
    const [logs] = await db.execute("SELECT * FROM action_logs WHERE user_id=? ORDER BY created_at DESC LIMIT 20", [req.params.user_id]);
    const [chats] = await db.execute(`SELECT c.id,c.title,c.created_at,COUNT(m.id) message_count FROM chatbot_conversations c LEFT JOIN chatbot_messages m ON m.conversation_id=c.id WHERE c.user_id=? GROUP BY c.id ORDER BY c.created_at DESC`, [req.params.user_id]);
    res.json({success:true,user:users[0],bmi,pills,logs,chats});
  } catch(error){ console.error("Profile error:",error.message); res.status(500).json({success:false,message:"Could not load profile."}); }
});

// ============================================================
// OP QUEUE
// ============================================================
app.post("/api/op-queue/join", async (req,res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({success:false,message:"User ID required."});
    const [active] = await db.execute("SELECT * FROM op_queue WHERE user_id=? AND status='waiting' ORDER BY id DESC LIMIT 1", [user_id]);
    if (active.length) return res.json({success:true,queue:active[0]});
    const [maxRows] = await db.execute("SELECT COALESCE(MAX(token_number),0) max_token FROM op_queue WHERE DATE(joined_at)=CURDATE()");
    const token = Number(maxRows[0].max_token) + 1;
    const [r] = await db.execute("INSERT INTO op_queue (user_id,token_number,status) VALUES (?,?,'waiting')", [user_id,token]);
    const queue={id:r.insertId,user_id,token_number:token,status:"waiting",joined_at:new Date()};
    io.emit("queueUpdated", queue);
    res.status(201).json({success:true,queue});
  } catch(error){ console.error("Queue join error:",error.message); res.status(500).json({success:false,message:"Could not join queue."}); }
});

app.get("/api/op-queue/:user_id", async (req,res) => {
  try {
    const [mine] = await db.execute("SELECT * FROM op_queue WHERE user_id=? AND status='waiting' ORDER BY id DESC LIMIT 1", [req.params.user_id]);
    const [waiting] = await db.execute("SELECT COUNT(*) count FROM op_queue WHERE status='waiting' AND DATE(joined_at)=CURDATE()");
    const current = Math.max(0, (mine[0]?.token_number || 1) - 1);
    res.json({success:true,queue:mine[0] || null,current_token:current,people_waiting:Number(waiting[0].count)});
  } catch(error){ res.status(500).json({success:false,message:"Could not load queue."}); }
});

app.delete("/api/op-queue/:id", async (req,res) => {
  try { await db.execute("UPDATE op_queue SET status='left' WHERE id=?", [req.params.id]); io.emit("queueUpdated",{id:req.params.id}); res.json({success:true}); }
  catch(error){ res.status(500).json({success:false,message:"Could not leave queue."}); }
});

// ============================================================
// START SERVER
// ============================================================

server.listen(
  PORT,
  () => {

    console.log(
      `🚀 Smart Health Portal Backend running on http://localhost:${PORT}`
    );

  }
);
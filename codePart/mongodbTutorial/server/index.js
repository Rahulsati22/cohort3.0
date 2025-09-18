const express = require("express");
const jwt = require("jsonwebtoken");
const jwt_secret = "ajabpremkigajabkahani";
const bcrypt = require("bcrypt");
const { z } = require("zod");
let cors = require("cors");

const signUpSchema = z
    .object({
        username: z.string().email({ message: "Invalid email format" }),
        password: z.string().min(6).max(50),
    })
    .strict();

function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)

        if (!result.success) {
            const message = result.error.issues[0].message;
            console.log(message); // 👉 "Invalid email format"

            return res.status(400).send({
                message: message, // first error message
            });
        }

        req.body = result.data; // valid & parsed body
        next();
    };
}

const app = express();

//using cors
app.use(cors());

//to understand json
app.use(express.json());

//to understand form data
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const User = require("./user.js");
const Todo = require("./todos.js");

mongoose
    .connect(
        "mongodb+srv://rahulsati9969_db_user:FBnt6LGv8sro0l3h@cluster0.rkd1z9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log(error));

function auth(req, res, next) {
    try {
        const decoded = jwt.verify(req.headers.token, jwt_secret);
        if (decoded?.id) {
            req.userId = decoded.id;
            return next();
        }
        return res.status(401).send({ message: "Invalid user" });
    } catch (err) {
        return res.status(401).send({ message: "Invalid token" });
    }
}

// signup
app.post("/signup", validate(signUpSchema), async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // hashing password
        const newPassword = await bcrypt.hash(password, 10);

        if (!username || !password)
            return res.status(400).send({ message: "Invalid credentials" });

        // check if user exists
        const user = await User.findOne({ username });
        if (user)
            return res.status(409).send({ message: "User already exists" });

        const operation = await User.create({
            username,
            password: newPassword,
        });
        if (operation)
            return res.status(201).send({ message: "User created successfully" });

        return res.status(500).send({ message: "Some error occurred" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// login
app.post("/login", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password)
            return res.status(400).send({ message: "Invalid credentials" });

        const userName = await User.findOne({ username });
        if (!userName)
            return res.status(401).send({ message: "Invalid credentials" });

        const isCorrect = await bcrypt.compare(password, userName.password);
        if (isCorrect) {
            const token = jwt.sign({ id: userName.id }, jwt_secret, {
                expiresIn: "7d",
            });

            return res.status(200).send({
                message: "Logged in successfully",
                data: userName,
                token,
            });
        }
        return res.status(401).send({ message: "Invalid credentials" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// me endpoint (currently not using in frontend)
app.get("/me", auth, async (req, res) => {
    try {
        const person = await User.findById(req.userId);
        if (!person)
            return res.status(401).send({ message: "Unauthorized access" });

        return res.status(200).send(person);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// create todo
app.post("/todo", auth, async (req, res) => {
    try {
        const title = req.body.title;
        const id = req.userId;
        const dueDate = req.body.dueDate;

        if (!title)
            return res.status(400).send({ message: "Please add a task" });

        await Todo.create({ title, id, dueDate });
        return res
            .status(201)
            .send({ message: "Successfully created the todo" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// get todos
app.get("/todos", auth, async (req, res) => {
    try {
        const id = req.userId;
        const todos = await Todo.find({ id });
        return res.status(200).send(todos);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// complete todo
app.patch("/todo", auth, async (req, res) => {
    try {
        const todoId = req.query.id;
        let todoTask = await Todo.findById(todoId);
        if (!todoTask)
            return res.status(404).send({ message: "Task doesn't exist" });

        todoTask.isCompleted = true;
        await todoTask.save();
        return res
            .status(200)
            .send({ message: "Task completed successfully" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// delete todo
app.delete("/todo", auth, async (req, res) => {
    try {
        const todoId = req.query.id;
        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).send({ message: "Invalid todo ID" });
        }

        const deleted = await Todo.findByIdAndDelete(todoId);
        if (!deleted)
            return res.status(404).send({ message: "Task not found" });

        return res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log("app is running on server 3000");
});

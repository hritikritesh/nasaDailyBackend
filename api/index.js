import express from "express"
import {v4} from "uuid"
import cors from "cors"
import mongoose from "mongoose"

const vv4 = v4();

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const DB = "mongodb+srv://hritikritesh:loginRegister@cluster0.a2x6upm.mongodb.net/myLoginRegisterdb?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => console.log("DB connected"))
.catch((err) => console.log(err))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

// Routes
app.post("/login", (req,res) => {
    console.log("login request")
    const {email, password} = req.body
    console.log(email)
    User.findOne({email : email})
    .then((user) => {
        if(user){
            if(password == user.password){
                res.send({message: "Login Successful", user: user})
            }else{
                res.send({message: "Password didn't match"})
            }
        }
        else{
           res.send({message: "User not registered"})
        }
    })
    .catch((err) => {
        console.log(err)
    })
})

app.post("/register", (req,res) => {
    const {name, email, password} = req.body

    User.findOne({email : email})
    .then((user) => {
        if(user){
            res.send({message: "user already registered"})
        }
        else{
            const user = new User({
                name,
                email,
                password
            })
            
            user.save()
            .then(() => {
                res.send({message: "user successfully registered"})
            })
            .catch((err) => {
                console.log(err)
            })
        }
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/api', (req, res) => {
  const path = `/api/item/${vv4}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Product from './models/product.js';
import CartItem from './models/CartItem.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/E-CommerceWebsite')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error', error);
  });

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs", { errorMessage: null });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.render("register.ejs", { errorMessage: "User is already registered" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log('User registered successfully');
    res.render("mart.ejs", { userName: newUser.name ,searchTerm:undefined,category:undefined});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while registering the user');
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { errorMessage: null });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login.ejs", { errorMessage: "User is not registered" });
    }
    if (user.password !== password) {
      return res.render("login.ejs", { errorMessage: "Incorrect password" });
    }
    console.log('Login successful');
    res.render("mart.ejs", { userName: user.name, searchTerm: undefined});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while logging in the user');
  }
});

app.post("/back", async(req,res) =>{
  const name=req.body.name;
  res.render("mart.ejs",{userName:name ,searchTerm:undefined});
});

app.post("/search", async (req, res) => {
  const searchTerm = req.body.search;
  const user = req.body.name;
  const category=req.body.category;
  try {
    const products = await Product.find({ name: new RegExp(searchTerm, 'i') });
    res.render('search-results.ejs', { products, userName: user, searchTerm, className: "notAdded", result: "Add to Cart", check: undefined, category: category});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for products');
  }
});

app.post("/Appliances", async (req, res) => {
  const searchTerm = "Appliances";
  const user = req.body.user;
  try {
    const products = await Product.find({ category: new RegExp(searchTerm, 'i') });
    res.render('search-results.ejs', { products, userName: user, searchTerm: undefined, className: "notAdded", result: "Add to Cart", check: undefined, category: searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for products');
  }
});

app.post("/Grocery", async (req, res) => {
  const searchTerm = "Grocery";
  const user = req.body.user;
  try {
    const products = await Product.find({ category: new RegExp(searchTerm, 'i') });
    res.render('search-results.ejs', { products, userName: user, searchTerm: undefined, className: "notAdded", result: "Add to Cart", check: undefined, category: searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for products');
  }
});

app.post("/Clothing", async (req, res) => {
  const searchTerm = "Clothing";
  const user = req.body.user;
  try {
    const products = await Product.find({ category: new RegExp(searchTerm, 'i') });
    res.render('search-results.ejs', { products, userName: user, searchTerm: undefined, className: "notAdded", result: "Add to Cart", check: undefined, category: searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for products');
  }
});

app.post("/Electronics", async (req, res) => {
  const searchTerm = "Electronics";
  const user = req.body.user;
  try {
    const products = await Product.find({ category: new RegExp(searchTerm, 'i') });
    res.render('search-results.ejs', { products, userName: user, searchTerm: undefined, className: "notAdded", result: "Add to Cart", check: undefined, category: searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for products');
  }
});

app.post("/Books", async (req, res) => {
  const searchTerm = "Books";
  const user = req.body.user;
  try {
    const products = await Product.find({ category: new RegExp(searchTerm, 'i') });
    res.render('search-results.ejs', { products, userName: user, searchTerm: undefined, className: "notAdded", result: "Add to Cart", check: undefined, category: searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for products');
  }
});

app.post("/Toys", async (req, res) => {
  const searchTerm = "Toys";
  const user = req.body.user;
  try {
    const products = await Product.find({ category: new RegExp(searchTerm, 'i') });
    res.render('search-results.ejs', { products, userName: user, searchTerm: undefined, className: "notAdded", result: "Add to Cart", check: undefined, category: searchTerm });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while searching for products');
  }
});

app.post('/add-to-cart', async (req, res) => {
  const { search, user, name, description, price, image, category } = req.body;
  let message = "";
  let result = "";
  try {
    const cartItem = await CartItem.findOne({ name });
    if (cartItem) {
      await CartItem.deleteOne({ name: name });
      message = "notAdded";
      result = "Add to Cart";
    } else {
      const newCartItem = new CartItem({
        username: user,
        name: name,
        description: description,
        price: price,
        image: image,
      });
      message = "added";
      result = "Added to Cart";
      await newCartItem.save();
    }
    console.log(search);
    console.log(category);
    let products;
    if (search) {
      products = await Product.find({ name: new RegExp(search, 'i') });
    } else{
      products = await Product.find({ category: new RegExp(category, 'i') });
    }
    res.render("search-results.ejs", { products, userName: user, searchTerm: search, className: message, result: result, check: name, category: category });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while adding/removing item to/from cart');
  }
});

app.post('/cart',async(req,res)=>{
  const name=req.body.name;
  const products= await CartItem.find({ username: new RegExp(name, 'i') });
  console.log(name);
    res.render("cart.ejs",{products,userName:name});
})

app.post('/remove-from-cart', async (req, res) => {
  const { productName } = req.body;
  const user = req.body.userName;
  
  try {
      await CartItem.deleteOne({ username: user, name: productName });
      const products = await CartItem.find({ username: user });
      res.render("cart.ejs", { products, userName: user });
  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while removing the item from the cart');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

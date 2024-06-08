const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let books_list = Object.values(books);
    books_list.forEach( book => {
        if(author == book["author"]){
            return res.send(JSON.stringify(book,null,4));
        }
    });
    return res.status(300).json({message: "Author not in DataBase"});
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let books_list = Object.values(books);
    books_list.forEach( book => {
        if(title == book["title"]){
            return res.send(JSON.stringify(book,null,4));
        }
    });
    return res.status(300).json({message: "Title not in DataBase"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn]["reviews"],null,4));
});

module.exports.general = public_users;

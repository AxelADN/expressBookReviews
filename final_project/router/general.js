const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



// Get the book list available in the shop
public_users.get('/', function (req, res) {
    let getBooksPromise = new Promise((resolve, reject) => {
        if (books) {
            resolve(books);
        }
    }).then((theBooks) => {
        console.log("Resolved!")
        return res.send(JSON.stringify(theBooks, null, 4));
    });
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    let getBooksPromiseByISBN = new Promise((resolve, reject) => {
        if (isbn && books) {
            resolve(books[isbn]);
        }
    }).then(theBook => {
        console.log("Resolved!")
        return res.send(JSON.stringify(theBook, null, 4));
    });
});



// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let getBooksPromiseByAuthor = new Promise((resolve, reject) => {
        let author = req.params.author;
        if (author && books) {
            Object.values(books).forEach(book => {
                if (author == book["author"]) {
                    resolve(book);
                }
            });
        }
        reject("Author not in DataBase");
    }).then(
        theBook => {
            return res.send(JSON.stringify(theBook, null, 4));
        }, err => {
            return res.status(300).json({ message: err });
        });


});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    let getBooksPromiseByTitle = new Promise((resolve, reject) => {
        let title = req.params.title;
        if (title && books) {
            Object.values(books).forEach(book => {
                if (title == book["title"]) {
                    resolve(book);
                }
            });
        }
        reject("Title not in DataBase");
    }).then(
        theBook => {
            return res.send(JSON.stringify(theBook, null, 4));
        }, err => {
            return res.status(300).json({ message: err });
        });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    return res.send(JSON.stringify(books[isbn]["reviews"], null, 4));
});

module.exports.general = public_users;

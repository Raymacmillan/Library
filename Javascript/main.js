const addBook = document.querySelector(".add_book");
const form = document.querySelector(".background_form");
const submitButton = document.querySelector(".submitbtn");
const title = document.querySelector("#Title");
const author = document.querySelector("#Author");
const pages = document.querySelector("#Pages");

let myLibrary = [];
let library = document.querySelector(".library");


function Book(title, author, pages,id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;

  this.readBook = false;
}

Book.prototype.addBookToLibrary = function () {
  myLibrary.push({ title: this.title, author: this.author, pages: this.pages,id: myLibrary.length ,readBook: false});
};


function bookFinder() {
    library.innerHTML = "";
  for (let x = 0; x < myLibrary.length; x++) {
    library.innerHTML += `
    <div>
        <h1>Title: ${myLibrary[x].title}</h1>
        <h2>Author: ${myLibrary[x].author}</h2>
        <p>Pages: ${myLibrary[x].pages}</p>
        <button data-id="${myLibrary[x].id}">Delete Book</button>
        <button data-id="${myLibrary[x].id}" style="background: ${myLibrary[x].readBook ? '#007791' : '#AA0000'}">${myLibrary[x].readBook ? "" : "Not"} Read</button>
    </div>
    `;
  }
}

addBook.addEventListener("click",()=>{
    form.classList.add("showForm");
    document.body.style.overflow = "hidden";
});

form.addEventListener("click",({target})=>{
    if(!target.classList.contains("background_form"))return;
    removeForm();

});

submitButton.addEventListener("click",()=>{
    if(title.value!== "" && author.value !== "" && pages.value !== null) {
        let book = new Book(title.value,author.value,pages.value);
        book.addBookToLibrary();
        bookFinder();
        removeForm();
        title.value = "";
        author.value= "";
        pages.value = null;
        console.log(myLibrary);
    }
});

document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
});

function removeForm(){

    form.classList.add("hide_form");

    setTimeout(()=> {
        form.classList.remove("showForm");
        form.classList.remove("hide_form");

        document.body.style.overflow = "auto";
    }, 290)
}

library.addEventListener("click",({target})=>{
    if(target.tagName === "BUTTON" && target.textContent === "Delete Book") {
        const id = parseFloat(target.dataset.id);
        myLibrary =  myLibrary.filter((book)=>book.id !== id);
        bookFinder();
    }else if(target.tagName ==="BUTTON" && target.textContent.includes("Read")) {
        const id = parseFloat(target.dataset.id);
        myLibrary = myLibrary.map((book)=>{
            if(book.id === id){
                book.readBook = !book.readBook;
            }
            return book;
        }); 
        bookFinder();
    }
});

/*
the information is the array

- you need a way to identify 1 element from the array
- remove it
- redraw the library using the new info from the array

*/


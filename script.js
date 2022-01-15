let myLibrary=[];

class Book{
    constructor(title, author, pages, read) {
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
    }
    
    
    toggleRead = function(e) {
        let index=e.target.getAttribute("data-key");
        const button=document.querySelector(`.toggle[data-key="${index}"]`);
        if(myLibrary[index].read==="Read"){
            myLibrary[index].read="Not Read";
            button.innerText="Not Read";
            button.setAttribute("style", "background-color:white;");
        }
        else{
            myLibrary[index].read="Read";
            button.innerText="Read";
            button.setAttribute("style", "background-color:green;");
        }
    };
    

}


function addBookToLibrary(e) {

    const form=document.querySelector(".form");
    
    //Taking input from the form
    const title=document.getElementById("title");
    const author=document.getElementById("author");
    const pages=document.getElementById("pages");
    const readOrNot=document.getElementById("yes").checked ? document.getElementById("yes").value :  document.getElementById("no").value ;

    const book=new Book(title.value, author.value, pages.value, readOrNot);
    myLibrary.push(book);
    console.log(myLibrary);
    
    form.style.display="none";
    displayBooks();

    //Clearing the inputs
    title.value="";
    author.value="";
    pages.value="";
}

function displayBooks() {
    const library=document.querySelector(".library");
    for(let i=myLibrary.length-1; i<myLibrary.length; ++i){
        let book=document.createElement("div");
        book.setAttribute("style", 
        " display:flex; flex-direction:column; justify-content:space-between; text-align:center; padding:0px 30px; height:540px; width:350px; border:1px solid black; background-color:rgb(206, 188, 128); box-shadow:10px 5px 10px 3px ;");
        //Setting data-key attribute of the book div
        book.setAttribute("data-key", i);
        
        let title=document.createElement("div");
        title.innerText=myLibrary[i].title;
        title.setAttribute("style", "font-size:2.3em; margin-top:110px; overflow-warp:noraml;");

        let bottomOfBook=document.createElement("div");

        let author=document.createElement("div");
        author.innerText=myLibrary[i].author;
        author.setAttribute("style", "font-size:20px; margin-bottom:10px;");

        let pages=document.createElement("div");
        pages.innerText=myLibrary[i].pages;
        pages.setAttribute("style", "font-family:monospace;")

        let buttons=document.createElement("div");
        buttons.setAttribute("style", "display:flex; justify-content:space-between; padding:10px; margin-top:10px;")

        let read=document.createElement("button");
        read.innerText=myLibrary[i].read;
        read.classList.value="toggle";
        //Setting the data-key attribute of toggle buttons
        read.setAttribute("data-key", i);
        if(read.innerText==="Read")
          read.style.backgroundColor="green";
        read.addEventListener("click", (e) => {myLibrary[i].toggleRead(e)});

        let remove=document.createElement("button");
        remove.classList.value="remove";
        remove.innerText="Remove";
        //Setting the data-key attribute of remove buttons
        remove.setAttribute("data-key", i);
        remove.addEventListener("click", removeBook); 

        buttons.appendChild(read);
        buttons.appendChild(remove);

        bottomOfBook.appendChild(author);
        bottomOfBook.appendChild(pages);
        bottomOfBook.appendChild(buttons);


        book.appendChild(title);
        book.appendChild(bottomOfBook);
       
        library.appendChild(book);
    }
}

function removeBook(e){

    //Deleting the books using data-key attribute

    let dataKey=e.target.getAttribute("data-key");
    // Removing the object from myLibrary array
    myLibrary.splice(+dataKey, 1);
    
    for(let i=dataKey; i<myLibrary.length; ++i){
        //Reducing the value of data-key attribute of every object after the removed object by 1
        const book=document.querySelector(`div[data-key="${+dataKey + 1}"]`);
        book.setAttribute("data-key", i);
        //Reducing the value of data-key attribute of every remove button after the removed object by 1
        const remove=document.querySelector(`.remove[data-key="${+dataKey + 1}"]`);
        remove.setAttribute("data-key", i);
        //Reducing the value of data-key attribute of every toggle button after the removed object by 1
        const toggle=document.querySelector(`.toggle[data-key="${+dataKey + 1}"]`);
        toggle.setAttribute("data-key", i);
    }
    //Deleting the book div from the DOM
    const book=document.querySelector(`div[data-key="${dataKey}"]`);
    book.remove();

}

//Displaying the form to add another book
const form=document.querySelector(".open_form");
form.addEventListener("click", () => {
    const form=document.querySelector(".form");
    form.style.display="block";

});

//Adding the book details to library array and displaying the new book
const addBook=document.getElementById("submit");
addBook.addEventListener("click", addBookToLibrary); 




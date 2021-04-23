//The ui declaration
let form=document.querySelector(`#book-form`)
let remove=document.querySelector(`#book-list`)
//Book class
class Book{
  constructor(title,author,isbn){
    this.title=title
    this.author=author
    this.isbn=isbn
  }
}
//Another class
class UI{
 
  //adding books
static addToBookList(book){
  let list=document.querySelector(`#book-list`)
  let row=document.createElement(`tr`)
  row.innerHTML=
  `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`
  list.appendChild(row)
}
//cleaning the fields
static clearFields(){
document.querySelector(`#title`).value=``
document.querySelector(`#author`).value=``
document.querySelector(`#isbn`).value=``
}
//showing alerts dynamically
static showAlert(message,className){
  let div=document.createElement(`div`)
  div.className=`alert ${className}`
  div.appendChild(document.createTextNode(message))
  let container=document.querySelector(`.container`)
  let book_form=document.querySelector(`#book-form`)
  container.insertBefore(div,book_form)
  setTimeout(function(){
    document.querySelector(`.alert`).remove()
  },2000)
}
//deleting books
static deleteFormBookList(target){
    if(target.hasAttribute(`href`)){
      if(confirm(`Are you sure?`)){
      target.parentNode.parentNode.remove()
      Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
    
    UI.showAlert(`Book Removed`,`success`)
    }
  }
}
}

//local storage
class Store{

  static getBooks(){
    let books;
    if(localStorage.getItem(`books`)===null){
      books=[]
    }else{
      books=JSON.parse(localStorage.getItem(`books`))
    }
    return books
  }
 static addBook(book){
    let books=Store.getBooks()
    books.push(book)
    localStorage.setItem(`books`,JSON.stringify(books))
  }
  static displayBooks(){
    let books=Store.getBooks()
    books.forEach(book=>{
      UI.addToBookList(book)
    })
  }
  static removeBook(isbn){
    let books=Store.getBooks()
    books.forEach(function(book,index){
      if(book.isbn===isbn){
        books.splice(index,1)
      }
    })
    localStorage.setItem(`books`,JSON.stringify(books))
  }
}





//declaring the events
form.addEventListener(`submit`,newBook)
remove.addEventListener(`click`,removeBooks)
document.addEventListener(`DOMContentLoaded`,Store.displayBooks())
//function for adding books
function newBook(e){
let title=document.querySelector(`#title`).value
let author=document.querySelector(`#author`).value
let isbn=document.querySelector(`#isbn`).value
// let ui=new UI()
if(title===``||author===``||isbn===``){
UI.showAlert(`Fill all the inputs properly`,`error`)
}else{
let book=new Book(title,author,isbn)
UI.addToBookList(book)
UI.showAlert(`Book added succesfully`,`success`)
UI.clearFields()
Store.addBook(book)
}
e.preventDefault()
}
//function for removing books
function removeBooks(e){

UI.deleteFormBookList(e.target)
e.preventDefault()
}
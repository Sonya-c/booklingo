# Project 01

Servicio de e-commerce de libros para la venta y compra de libros usados

## Endpoints 

- [x] Users
- [x] Auth
- [x] Books
- [ ] Orders

## CRUD

- [ ] Create
    - [x] User
    - [x] Book
    - [ ] Order
- [ ] Read
    - [x] Get one user (by Id)
    - [ ] Get many users
    
    - [x] Get one book (by Id)
    - [x] Get many books (filter by genere, pubDate, editorial, auth, title)

    - [ ] Get one order (by Id)
    - [ ] Get many orders (creationDate (range), state (progress, complete, canceled))

- [ ] Update
    - [x] Update a user
    - [x] Update a book
    - [x] Update a order (status only)

- [ ] Delete
    - [x] User (soft delete)
    - [ ] Book (selt delete)
    - [ ] Order?

## Constraints

- To make it simple, a book can only have one auth and one genere.
- All endpoint requried auth (but create user and read books).
- Read should not should deleted entrys (unsless is required).
- When updating a order, only the state can be change
    - The user that create the orden can cancel it
    - The user that recived the orden can complete it 
- A order can have more that one book. 
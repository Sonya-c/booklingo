# Booklingo

Book e-commerce service for the sale and purchase of used books.

## Getting Started

**Dependencies**

- Node v20.11.0 (or latest)
- npm v10.2.4 (or latest)

**Instalation**

1. Clone the repo 

    ```
    git clone https://github.com/Sonya-c/booklingo.git
    ```

2. Install packages 
    ```
    npm install
    ```

3. Create an `.env` file. You can check the [example env](.env.example)
    ```
    PORT = # Optional default to 5000
    JWT_SECRET=
    JWT_ACCESS_EXPIRE=60 # This is on minutes
    MONGO_URI= 
    MONGO_DB= # prod, test
    ```

    You can create the `JWT_SECRET` using [createSecret.js](./scripts/createSecret.js) script.

**Executing programm**

```
npm run start
```

Now you can use the api on the localhost!

## Endpoints 

- **Authentication:**
    - `POST /auth/register` - Create a new user.
    - `POST /auth/login` - Login a user.
    
- **Users:**
    - `GET /users` - Get all users.
    - `GET /users/:userId` - Get one user by id.
    - `PATCH /users/:userId` - Update one user by id (auth required).
    - `DELETE /users/:userId` - Delete one user by id (auth required).

- **Books:**
    - `GET /books` - Get all users. Optional filters: genre, pubDate (range), editorial, author adn title.
    - `GET /book/:bookId` - Get one book by id.
    - `POST /book/` - Create a book (auth required).
    - `PATCH /book/:bookId` - Update one book by id (auth required).
    - `DELETE /book/:bookId` - Delete one book by id (auth required).

- **Orders:**

## Constraints

- **Book data**: To make it simple, a book can only have one auth and one genere.
- **Auth requirement**: All endpoint requried auth (but create user and read books).
- **Delete**: All deletes are *soft delete* and read operations should not return deleted entrys (**unsless is required**).
- **Oder Status**: When updating a order, only the state can be change
    - The user that create the orden can cancel it.
    - The user that recived the orden can complete it and cancel it.
- **Orders and book**: A order can have more that one book (all with the same owner).

## Roadmap

- [x] Auth 
    - [x] Login.
    - [x] Register.

- [x] User endpoint.
    - [x] Create an user.
    - [x] Get all users.
    - [x] Get a user by id.
    - [x] Update an user.
    - [x] Delete an user.

- [x] Books endpoints.
    - [x] Create an user.
    - [x] Get all books (+ optional filters) 
    - [x] Get a book by id.
    - [x] Get all book by userId.
    - [x] Update a book by id.
    - [x] Delete a book by id.

- [ ] Orders.
    - [ ] Create an order.
    - [ ] Update an order (stauts, check auth).
    - [ ] Delete an oder.
    - [ ] Get all order.
    - [ ] Get order by id.

- Other/Not sure.
    - [ ] Extra query: show deleted items.
    - [ ] When getting a order, and extra query for send order and recived orders.
    - [ ] When getting the books of a user, it should be on book route or user route?

## Authors

- Sonya Castro @sonya-c
    - sonyac@uninorte.edu.co
    - sonya.castro.gomez@gmail.com

<!-- ## Acknowledgments

Inspiration:

- [RESTful API Node Server Boilerplate](https://github.com/hagopj13/node-express-boilerplate/tree/master) -->
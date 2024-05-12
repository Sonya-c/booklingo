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
    MONGO_DB= # Prod or Test
    ```

    You can create the `JWT_SECRET` using [createSecret.js](./scripts/createSecret.js) script.

    ```
    node .\scripts\createSecret.js
    ```

**Executing programm**

```
npm run start
```

Now you can use the api on the localhost!

## Mock data

The script [generateDatabase.js](./scripts/generateDatabase.js) creates random users and books and saves the data as a JSON on the data folder.
It also saves the plainPassword.

```
node .\scripts\generateDatabase.js
```

**This data is just for testing purposes so it's saved in the test db. Never in production**. 

This script use the [faker.js](https://github.com/faker-js/faker) library and a set of pre-defined genres. You can ajust the numbers of users and books to be created changing the `userNumber` and `bookNumber` variables (respectively).

## Endpoints 

### Authentication

- `POST /auth/register` - Create a new user.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | userData    | body (required)  | User data  |

    UserData schema (example)

    ```JSON
    {
        "name": "Waldo", // name is optional
        "email": "TheOriginalWaldo@hotmail.com",
        "password": "raMGvnui"
    }
    ```

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Object (user: user model, authToken: jwt token) |
    | 422  | Bad request data |
    | 409  | Conflict - User with given email already exists |

    Example response

    ```JSON
    {
        "user": {
            "_id": "66400b5d258f2e3132bcd837",
            "name": "Kelvin Leffler",
            "email": "Lukas_Stark23@yahoo.com",
            "password": "$2b$10$KNCmq.PCwx.J6ZhmjNX2yOZ5K7VSruCqHpdyaW514TEhmXYYxzkUK",
            "isDeleted": false,
            "createdAt": "2024-05-12T00:20:45.306Z",
            "updatedAt": "2024-05-12T00:20:45.306Z",
            "__v": 0
        },
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQwMGI1ZDI1OGYyZTMxMzJiY2Q4MzciLCJpYXQiOjE3MTU0NzYzMzQsImV4cCI6MTcxNTQ3OTkzNH0.iPgi_CHw9PbU-YqdcAKHoMkfzlAy7146zf7AjtaDlY4"
    }
    ```

- `POST /auth/login` - Login a user.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | userData    | body (required)  | User data: email, password |

    UserData schema (example)

    ```JSON
    {
        "email": "TheOriginalWaldo@hotmail.com",
        "password": "raMGvnui"
    }
    ```

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | User Object and auth Token |
    | 422  | Bad request data |
    | 404  | User dosen't exist |
    | 401  | Wrong password |
    
    Example response

    ```JSON
    {
        "user": {
            "_id": "66400b5d258f2e3132bcd837",
            "name": "Kelvin Leffler",
            "email": "Lukas_Stark23@yahoo.com",
            "password": "$2b$10$KNCmq.PCwx.J6ZhmjNX2yOZ5K7VSruCqHpdyaW514TEhmXYYxzkUK",
            "isDeleted": false,
            "createdAt": "2024-05-12T00:20:45.306Z",
            "updatedAt": "2024-05-12T00:20:45.306Z",
            "__v": 0
        },
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQwMGI1ZDI1OGYyZTMxMzJiY2Q4MzciLCJpYXQiOjE3MTU0NzYzMzQsImV4cCI6MTcxNTQ3OTkzNH0.iPgi_CHw9PbU-YqdcAKHoMkfzlAy7146zf7AjtaDlY4"
    }
    ```

### Users

- `GET /user` - Get all users.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | showDeleted | query (optional) | Boolean |

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | List of User Objects |
    

- `GET /user/:userId` - Get one user by id.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | userId      | parm (required)  | User Id (mongo Id)        |
    | showDeleted | query (optional) | Show deleted entries too. |

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | User Object |
    | 404  | User not found | 
    | 422  | Bad request data |

    Example response

    ```JSON
    {
        "_id": "66400b5d258f2e3132bcd837",
        "name": "Kelvin Leffler",
        "email": "Lukas_Stark23@yahoo.com",
        "password": "$2b$10$KNCmq.PCwx.J6ZhmjNX2yOZ5K7VSruCqHpdyaW514TEhmXYYxzkUK",
        "isDeleted": false,
        "createdAt": "2024-05-12T00:20:45.306Z",
        "updatedAt": "2024-05-12T00:20:45.306Z",
        "__v": 0
    }
    ```

- `PATCH /user/:userId` - Update one user by id (auth required).

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | authToken      | header (required)  | Auth token        |
    

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | User Object (before) |
    | 404  | User not found | 
    | 401  | Unauthorized (no token) |
    | 403  | Forbiden |


- `DELETE /user/:userId` - Delete one user by id (auth required).

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | authToken      | header (required)  | Auth token        |
    

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | User Object |
    | 404  | User not found | 
    | 401  | Unauthorized (no token) |
    | 403  | Forbiden |


### Books

- `GET /book` - Get all books with optional filters.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | title       | Query (Optional) | String |
    | genre       | Query (Optional) | String |
    | startPubDate | Query (Optional) | Date (string) |
    | endPubDate   | Query (Optional)  | Date (string) |
    | editorial    | Query (Optional)  | String |
    | author       | Query (Optional)  | String |
    | showDeleted  | Query (Optional)  | Boolean |
    

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Book Object list |
    | 422  | Bad request data |
    
- `GET /book/:bookId` - Get one book by id.

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | BookId      | parms (required) | Book Id (mongo Id)        |
    

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Book Object list |
    | 422  | Bad request data |
    | 404  | Book not found |

    Example response

    ```JSON
    {
        "_id": "66400b5e258f2e3132bcd85d",
        "user": "66400b5d258f2e3132bcd837",
        "title": "Tractatus logico-philosophicus",
        "author": "Ludwig Wittgenstein",
        "editorial": "Trantow - Bernhard",
        "genre": "Graphic Novel",
        "pubDate": "1611-03-14T16:43:46.191Z",
        "isDeleted": true,
        "createdAt": "2024-05-12T00:20:46.321Z",
        "updatedAt": "2024-05-12T00:38:20.854Z",
        "__v": 0s
    }
    ```

- `POST /book/` - Create a book (auth required).

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | authToken      | headers (required) | AuthToken        |
    | bookData       | body (required) | Book Data |

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Book Object  |
    | 422  | Bad request data |
    | 404  | User not found | 
    | 401  | Unauthorized (no token) |
    | 403  | Forbiden |
    
- `PATCH /book/:bookId` - Update one book by id (auth required).

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | authToken      | headers (required) | AuthToken        |
    | bookId         | parms (required)  | Book id | 
    | bookData       | body (required) | Book Data (partial) |

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Book Object  |
    | 422  | Bad request data |
    | 404  | User not found | 
    | 404  | Book not found | 
    | 401  | Unauthorized (no token) |
    | 403  | Forbiden |

- `DELETE /book/:bookId` - Delete one book by id (auth required).

    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | authToken      | headers (required) | AuthToken        |
    | bookId         | parms (required)  | Book id | 

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Book Object  |
    | 422  | Bad request data |
    | 404  | User not found | 
    | 404  | Book not found | 
    | 401  | Unauthorized (no token) |
    | 403  | Forbiden |

### Orders

- `GET /order` - Get all orders with optional filters. 
    
    <!-- debe poderse filtrar por fecha de creación (entre una y otra fecha), y por estado del pedido (en progreso, completado, cancelado -->

- `GET /order/:orderId` - Get one order by id.

     **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | orderId     | params (required) | | 


    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Order Object  |
    | 404  | Order not found | 

- `POST /order` - Create a order.
    
    **Parameters**

    | Name        | Type             | Description               |
    |-------------|------------------|---------------------------|
    | authToken      | headers (required) | AuthToken        |
    | bookList       | body (required) | List of Book Id |

    Note: all books should have the same owner. Otherwise, a `422` will happen.

    **Response**

    | Code | Description             |     
    |------|-------------------------|
    | 200  | Order Object  |
    | 422  | Bad request data |
    | 404  | User (orderCreator) not found | 
    | 404  | User (orderReceiver) not found | 
    | 404  | Book not found | 
    | 401  | Unauthorized (no token) |
    | 403  | Forbiden |

- `PATCH /order/:orderId`

- `DELETE /order/:orderId`

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
    - [x] Update a book by id.
    - [x] Delete a book by id.

- [ ] Orders.
    - [x] Create an order.
    - [ ] Update an order (stauts, check auth).
    - [ ] Delete an oder.
    - [ ] Get all order (filter by status, creation date).
    - [x] Get order by id.

- Other/Not sure.
    - [ ] Get books of one user.
    - [x] Extra query: show deleted items.
    - [ ] When getting a order, and extra query for send order and recived orders.
    - [ ] When getting the books of a user, it should be on book route or user route?

## Authors

<a href="https://github.com/sonya-c/booklingo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sonya-c/booklingo" />
</a>

<!-- ## Acknowledgments

Inspiration:

- [RESTful API Node Server Boilerplate](https://github.com/hagopj13/node-express-boilerplate/tree/master) -->
# Books Collection API


A RESTful API for managing a collection of books with robust features, including user authentication, role-based access control (RBAC), and favorite books management,CRUD operations.
 ## [Found Live Demo Here](https://bookscollectionapi.onrender.com/)
## Features
- `CRUD Operations for Books:` Add, update, retrieve, and delete books.
- `Favorite Management:` Mark books as favorites or remove them from the favorites list.
- `Recommendations:` Retrieve personalized book recommendations based on user roles.
- `Data Validation:` Validates book data, including strict ISBN checks and optional fields.
- **User Authentication:**
  - JWT-based user authentication with secure token handling.
  - Routes for user signup and login.
- `Role-Based Access Control (RBAC):`
  - Different access levels for `admin`, `superadmin` and regular `user`s.
  - Admin-specific features include fetching book recommendations specifically from the "Leadership" and "Management" genres.


---
# Authentication and Role-Based Access Control (RBAC)
 **Signup & Login:**
- `/auth/signup` Register new users with a username, email, password, and role.
- `/auth/login` Authenticate users and generate JWT tokens.
- `Token Validation:` JWT tokens are validated for protected routes using middleware.
**Role Handling:**
- Admins can access books with genre leadership and management recommendations.
- Regular users can access all other books and personalized favorites.

## Validation Rules

### Book Fields
| **Field**           | **Required** | **Description**                                                                 |
|----------------------|--------------|---------------------------------------------------------------------------------|
| `title`             | ✅           | The title of the book.                                                        |
| `author`            | ✅           | The author of the book.                                                       |
| `isbn`              | ✅           | Must be a valid ISBN-10 or ISBN-13 format.                                    |
| `published_year`    | ✅           | A number between 1000 and the current year.                                   |
| `genre`             | ❌           | Optional. A string indicating the genre.                                      |
| `language`          | ❌           | Optional. A string indicating the language (defaults to "English").           |
| `publisher`         | ❌           | Optional. A string for the publisher's name.                                  |
| `page_count`        | ❌           | Optional. A positive integer (defaults to 1).                                 |
| `edition`           | ❌           | Optional. A string (defaults to "1st").                                       |
| `description`       | ❌           | Optional. A string containing the book description.                           |
| `price`             | ❌           | Optional. A decimal with up to two digits after the decimal point.            |
| `currency`          | ❌           | Optional. Must be one of: `ETB`, `USD`, `EUR`, `GBP`, `JPY`.                  |
| `availability_status` | ❌         | Optional. Either `"Available"` or `"Sold"`.                                   |
| `favorite`          | ❌           | Optional. A boolean indicating if the book is marked as favorite.             |
| `cover_img`         | ❌           | Optional. Must be an image file of type JPEG, JPG, PNG, or GIF and ≤2 MB.  else you can get an error   |

# Users fields
Here’s the breakdown of fields for **User Registration** and **User Login**:

### **User Registration Fields**
| **Field**   | **Required** | **Type**    | **Validation**                                                                 |
|-------------|--------------|-------------|--------------------------------------------------------------------------------|
| `username`  | ✅           | `string`    | Must be alphanumeric,`unique` and 3-10 characters long.                                 |
| `email`     | ✅           | `string`    | Must be a valid email format and must be `unique`.                                                  |
| `password`  | ✅           | `string`    | Must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character. |
| `role`      | ✅           | `string`    |  Must be one of: `user`, `admin`, `superadmin`.  |

**Example Request Body for Registration:**
```json
{
  "username": "tola123",
  "email": "tola@example.com",
  "password": "P@ssw0rd123",
  "role": "user"
}
```

---

### **User Login Fields**
| **Field**   | **Required** | **Type**    | **Validation**                          |
|-------------|--------------|-------------|-----------------------------------------|
| `email`     | ✅           | `string`    | Must be a valid email format.           |
| `password`  | ✅           | `string`    | Must match the registered user's password. |

**Example Request Body for Login:**
```json
{
  "email": "tola@example.com",
  "password": "P@ssw0rd123"
}
```

---

### **Password Validation Criteria:**
1. **Length:** Minimum 8 characters.
2. **Complexity:** Must include:
   - At least one uppercase letter (`A-Z`).
   - At least one lowercase letter (`a-z`).
   - At least one digit (`0-9`).
   - At least one special character (`@#$%^&*!`).
**`Password Examples:`**
✅ StrongP@ssword1
✅ MyP@ssw0rd!
❌ password (no uppercase, number, or special character)
❌ P@ss123 (too short)

# username sample
`Username Examples:`
✅ user_123
✅ Admin-Role
❌ user!@# (invalid special characters)
❌ ab (too short)

---

### **Response Examples**

**Registration Success:**
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJ0b2xhMTIzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzMyMjIxNzMsImV4cCI6MTczMzIyNTc3M30.qdJG1rQfyaEOd-mSIAT746skD6ZPSs70kkZMMIi42ns",
	"message": "User Created Successfully.",
	"user": {
		"id": 8,
		"username": "tola123",
		"email": "tola@example.com",
		"role": "user"
	}
}
```

**Login Success:**
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJ0b2xhMTIzIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InRvbGFAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzMyMjIzMzksImV4cCI6MTczMzIyNTkzOX0.J8gB2EI6VwmgwJZpXXoU3vxyv5s0oFK-w5vpde9Ygdk",
	"message": "You are Logged in  Successfully!",
	"user": {
		"id": 8,
		"username": "tola123",
		"email": "tola@example.com",
		"password": "$2b$10$GKh2lOtxyvJfFt9EwHNZ1OzO0xNiL591ScfpWyOYWvNpQ3dZeKFpu",
		"role": "user",
		"created_at": "2024-12-03T10:36:13.799Z"
	}
}
```
NB. The password field displayed during user login is for demonstration purposes only, intended to show that the password is securely hashed. In a real-world scenario, this field would be hidden from view for security reasons.
---

## API Endpoints
# API Routes Documentation
*<i>All route needs valid token Except for the public (signup and login).</i>

| **Route**                        | **Method** | **Access**          | **Description**                                                                                  |
|----------------------------------|------------|---------------------|--------------------------------------------------------------------------------------------------|
| `/books`                         | `POST`     | Admin               | Add a new book to the collection.                                                                |
| `/books`                         | `GET`      | Admin         | Retrieve all books in the collection.                                                            |
| `/books/:id`                     | `GET`      | Admin & Users        | Retrieve a specific book by its ID.                                                              |
| `/books/cover/:id`               | `GET`      | Users Only           | Retrieve a book's cover image by its ID.                                                         |
| `/books/best/recommendations`    | `GET`      | Admin & Users        | Get recommended books. Admins receive  leadership/management books books based on genre; others receive random books.   |
| `/books/:id`                     | `DELETE`   | Admin               | Delete a book by its ID.                                                                         |
| `/books/:id`                     | `PUT`      | Admin               | Update book information by its ID.                                                               |
| `/books/add/favorite/:id`        | `PUT`      | Users Only           | Mark a book as a favorite for the logged-in user.                                                |
| `/books/unfavorite/:id`          | `PUT`      | Users Only           | Remove a book from the favorites list.                                                           |
| `/books/get/favorite`            | `GET`      | Users Only           | Retrieve all favorite books for the logged-in user.                                               |
| `/auth/signup`                   | `POST`     | Public               | Register a new user with role-based assignment.                                                   |
| `/auth/login`                    | `POST`     | Public               | Authenticate user and generate a JWT token for secure access.                                     |
| `/auth/users`                    | `GET`      | Super Admin Only     | Retrieve a list of all users including admins.                                                                     |
| `/auth/delete/user/:id`          | `DELETE`   | Super Admin Only     | Delete a user by their ID.                                                                        |

### Notes:
- **Authentication & Authorization:** JWT-based authentication is required for most routes, with role-based access control (RBAC) determining whether the request is allowed.
- **Admin & User Roles:** Admins have full control over the books, while users can only mark books as favorites, view covers.
- **Public Routes:** Registration and login are accessible without authentication, providing a token upon successful login.
* **For All protected route** A valid token must be provided in the request header for both admins and users upon login. Without the token, access will be denied, and an error will be returned.
### **1. Add a Book**
**Route:** `POST /books`   
**Access** `admin only`
**Description:** Adds a new book to the collection.  
**Validations:**
- All required fields must be provided.
- ISBN must be valid (checked using custom validation). [check Online ISBN checker Here ](https://isbn-checker.netlify.app/)
- Optional fields are sanitized and validated if provided.  
 **Example Request Body:**
   ```json
      {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "9780141182636",
      "published_year": 1925,
      "genre": "Novel",
      "language": "English",
      "page_count": 180
      } 
and On Header part you must pass admin token
x-auth-token -------   token   {Shown on Second Images Below}

**BODY**
![Post example](./screenshot/post.png)
**HEADER with token**
**NB. Token Is generated whenever user login so Copy and Paste it here**
![Post example](./screenshot/token.png)
### **2. Get All Books**
**Route:** `GET /books`
**Access:** `admin only`
Description: Fetches a list of all books in the collection.
![Sample_get](./screenshot/get.png)
**x-auth-token**
![Sample_get](./screenshot/theader.png)
## **3. Get Book by ID**
**Route:** `GET /books/:id`
**Access:** `user and admin`
Description: Fetches a book by its ID.
- Fetch like `{{URL}}/books/4` this returns books related to id 4 if exist 
- Error Cases: Returns `404` if the book does not exist.
**A valid token must be provided in the request header for both admins and users upon login. Without the token, access will be denied, and an error will be returned.**
![Sample_get](./screenshot/theader.png)
## **4. Get Book Cover Image**
**Route:** `GET /books/cover/:id`
**Access:** `user only`
Description: Fetches the cover image of a book by its ID.
-  Fetch like `{{URL}}/books/cover/4` this returns books related to id 4 if exist 
- Error Cases: Returns `404` if the cover image or book does not exist.
![cover image](./screenshot/cover.png)
` token on header `
![Sample_get](./screenshot/theader.png)
## **5. Get Best Recommendations**
**Route:** `GET /books/best/recommendations`
**Access:** `user and admin`
Description: Fetches a list of random three recommended books / if not it fetches 2 0r 1 if the book is not exist in collection you will get an error
- Admin-specific features include fetching book recommendations specifically from the "Leadership" and "Management" genres and fetch at random for regular user
` token on header `
![Sample_get](./screenshot/theader.png)
## **6. Delete a Book**
**Route:** `DELETE /books/:id`
**Access:** `admin only`
Description: Deletes a book by its ID.
- `{{URL}}/books/4`  delete books related to id 4
- Error Cases:Returns 404 if the book does not exist.
` token on header `
![Sample_get](./screenshot/theader.png)
## **7. Update a Book**
**Route:** `PUT /books/:id`
**Access:** `admin only`
Description: Updates details of an existing book.
**Validations:**
- All fields are optional, but the values must conform to validation rules.
- ISBN updates must not duplicate an existing ISBN in the database and it must be valid too.
- Error Cases: Returns 404 if the book does not exist.
  ` token on header `
![Sample_get](./screenshot/theader.png)
## **8. Add to Favorite**
**Route:** `PUT /books/add/favorite/:id`
**Access:** `user only`
Description: Marks a book as a favorite.
 - `{{URL}}/books/add/favorite/4` this adds books related to id 4
Error Cases:
- Returns 404 if the book does not exist.
- Returns 400 if the book is already marked as favorite.
` token on header `
![Sample_get](./screenshot/theader.png)
## **9. Remove from Favorite**
**Route:** `PUT /books/unfavorite/:id`
**Access:** `user only`
Description: Removes a book from the favorites list.
- `{{URL}}/books/unfavorite/4` removes books related with id 4
Error Cases:
- Returns 404 if the book does not exist.
- Returns 400 if the book is not marked as favorite.
` token on header `
![Sample_get](./screenshot/theader.png)
## **10. Get Favorite Books**
**Route:** `GET /books/get/favorite`
**Access:** `user only`
Description: Fetches all books marked as favorite, returning only specific fields:
`title`, 
`author`, 
`isbn`, 
`published_year`,
`genre`, 
`language`, 
`publisher`, 
`page_count`, 
`edition`, 
`description`.

` token on header `
![Sample_get](./screenshot/theader.png)
## **11. Get All users**
**Route:** `GET /auth/users`
**Access:** `superadmin only`
` superadmin token on header `
![Sample_get](./screenshot/theader.png)
## **12. Delete user**
**Route:** `DELETE /auth/delete/user/:id`
**Access:** `superadmin only`
` superadmin token on header `
![Sample_get](./screenshot/theader.png)
## Setup
### Install Dependencies
    ```
     npm install

## Environment Variables

Create a `.env` file with the following:
- DB_HOST=your_database_host
- DB_USER=your_database_user
- DB_PORT=your_database_port
- DB_PASSWORD=your_database_password
- DB_NAME=your_database_name
- JWT_SECRET=your_jwt_secret

## Run the Server
```
    npm start
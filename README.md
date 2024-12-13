## E-commerce Website (MERN Stack)

Website deployed on Vercel: **[E-commerce Website URL](https://full-stack-ecommerce-app-delta.vercel.app)**

API EndPoints Link : **[Postman Public URL](https://www.postman.com/aerospace-geologist-25924470/workspace/public-e-commerce/collection/34091040-10477bbe-7028-4820-bda7-b3f48eb557dc?action=share&creator=34091040)**

### Description

-   Designed and developed a full-stack e-commerce website using the **MERN** (`MongoDB`, `Express`, `React`, `Node.js`) tech stack
-   Created a responsive and user-friendly interface for customers to browse and purchase products
-   Implemented features for user authentication, payment processing, and order management
-   Developed a robust backend API for managing products, orders, and customer data
-   Utilized MongoDB for database management and implemented data modeling and schema design

### Tech Stack

-   **HTML/CSS**
-   **JavaScript (ES6+)**
-   **MongoDB** (database)
-   **Express.js** (backend framework)
-   **React.js** (frontend framework)
-   **Node.js** (runtime environment)
-   **Stripe (payment processing)**
-   **Responsive Web Design**
-   **RESTful API design**

### Getting Started

1. Clone the repository: `https://github.com/AdarshTheki/full-stack-ecommerce-app.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the website in your browser: `http://localhost:3000`

### License

This project is licensed under the [MIT License]().

### Author

### route paths

```bash
# Categories & Brands
GET        /category                get all category
POST       /category                create category
PATCH      /category/:id            update category
DELETE     /category/:id            delete category
# Products
GET        /products/:id            single product
GET        /products?q=             all products with params
POST       /products                create product with jwt
PATCH      /products/:id            update product with jwt
DELETE     /products/:id            delete product with jwt
# Users
POST       /users/sign-up           create user
POST       /users/sign-in           login user
POST       /users/refresh           refresh user with jwt
GET        /users/logout            logout user with jwt
GET        /users/me                login user with jwt
PATCH      /users/me                update user with jwt  // update to me
PATCH      /users/avatar            update avatar with jwt
DELETE     /users/avatar            delete avatar with jwt
POST       /users/wishlist/:id      product like with jwt

DELETE     /users/me                delete user with jwt
GET        /users/wishlist          Get the list of favorite products.

# Admin-Specific (admin only)
GET        /users                   Get all users
GET        /users/:id               Get a specific user's details
PATCH      /users/:id               Update any user's details
DELETE     /users/:id               Delete any user


```

**[Adarsh Verma]()**

# Travlr Getaways: Full Stack Web Application

## CS 465: Full Stack Development

Travlr Getaways is a full stack travel application developed throughout CS 465. The project uses the MEAN stack—MongoDB, Express, Angular, and Node.js—to support both a public customer-facing travel website and an administrative single-page application.

Throughout the course, the application evolved from a largely static travel website into a database-driven full stack system with RESTful API communication, reusable Angular components, CRUD functionality, and authenticated administrative access.

---

## Architecture

### Frontend Development

This project gave me experience with multiple approaches to frontend development.

The customer-facing portion of Travlr uses Express with HTML, JavaScript, and Handlebars templates. Rather than maintaining completely static HTML pages, Handlebars allows the server to dynamically render information retrieved by the application. This approach works well for the public-facing portion of the website because the server is responsible for assembling and returning the requested page.

The administrative interface uses Angular as a single-page application (SPA). The SPA provides a more interactive experience because the browser does not need to reload an entirely new page for every administrative action. Angular components, services, models, and routing separate responsibilities within the frontend and allow portions of the interface to update as application data changes.

The two approaches ultimately communicate with the same application and data, but they provide different user experiences. Express and Handlebars provide server-rendered content for customers, while Angular provides a richer client-side interface for administrators who need to manage trip information.

### Why MongoDB?

The backend uses MongoDB, a NoSQL database, to store the application's trip and user information.

MongoDB works particularly well with the JavaScript-based MEAN stack because its document structure closely resembles the JSON objects exchanged throughout the application. Mongoose provides schemas and models that add structure and validation to the data while still allowing the flexibility of a document-oriented database.

This made it possible for trip information to move naturally between MongoDB, the Express API, and the Angular frontend.

---

## Functionality

### JSON and JavaScript

JavaScript is a programming language used to create application logic and interactive behavior. JSON, or JavaScript Object Notation, is a lightweight data format used to represent and exchange information.

Although their syntax can look similar, JSON is data rather than executable program logic.

JSON became an important connection between the frontend and backend of Travlr. The Angular application could send HTTP requests to RESTful API endpoints, the Express/Node backend could interact with MongoDB through Mongoose, and the resulting information could be returned to the frontend as JSON.

In that way, JSON provided a consistent format for moving trip and authentication information between different layers of the application.

### Refactoring and Reusable Components

Refactoring was an important part of developing Travlr because the application became more complex as each new layer was introduced.

One example was moving from static trip content toward database-driven information retrieved through the REST API. Another was separating Angular functionality into reusable components and services instead of placing all application behavior in one location. Authentication also required refactoring the frontend and backend so protected administrative requests could include the user's authentication token.

Reusable UI components reduce duplicated code and make an application easier to maintain. If the presentation or behavior of a reusable component changes, that change can be made in one location instead of repeatedly throughout the application.

The result is a system that is easier to understand, test, extend, and maintain.

---

## Testing

### Methods, Endpoints, and Security

Testing a full stack application requires understanding how HTTP methods interact with API endpoints.

An endpoint identifies a resource or operation exposed through the API, while HTTP methods describe the action being requested. For example, GET retrieves information, POST can create new information, PUT updates existing information, and DELETE removes information.

During development, I tested API behavior to verify that requests reached the appropriate endpoints and produced the expected responses. Testing also helped identify whether data was being correctly exchanged among the frontend, API, and MongoDB database.

Security made this process more complex because successful API communication alone was no longer enough. Administrative operations also needed to verify that the person making the request was authenticated.

In the final iteration of Travlr, authentication was added using login functionality and JSON Web Tokens (JWTs). After successful authentication, the client can include its token with requests to protected administrative endpoints. The server then verifies the token before permitting the operation.

Testing therefore included both successful authenticated requests and situations where authentication information was missing or invalid. This reinforced an important lesson from the project: a secure application must test not only what an authorized user is allowed to do, but also what an unauthorized user must be prevented from doing.

---

## Reflection

CS 465 helped me understand full stack development as a connected system rather than a collection of unrelated technologies.

Before working through the complete Travlr application, it was easier to think separately about frontend development, APIs, databases, and security. Building one application through each of these stages showed me how decisions in one layer affect the others. A change to a data model can affect the API and frontend, while adding authentication can require changes to routes, services, requests, and the user interface.

Throughout the course, I developed experience with MongoDB, Mongoose, Express, Node.js, Angular, TypeScript, RESTful APIs, JSON, reusable components, CRUD operations, authentication, JWTs, routing, testing, and full stack application architecture.

More importantly, I became more comfortable tracing information through an entire system—from a user's interaction with the frontend, through an API request, into the server and database, and back to the interface.

The security portion of the project also strengthened my understanding that functionality alone is not enough. Applications must validate data, protect sensitive operations, authenticate users appropriately, and consider what happens when requests are malformed or unauthorized.

Professionally, this course strengthened the software engineering foundation I want to carry into more advanced work involving intelligent systems and AI. Even highly intelligent systems still require reliable architecture, APIs, data management, testing, security, and interfaces that allow people to use them effectively. Understanding the complete application stack therefore gives me a stronger foundation for building more complex systems in the future.

Travlr represents an important step in that development because it demonstrates my ability to build and integrate multiple layers of a working web application rather than focusing on only one part of the system.

---

## Technologies Used

- MongoDB
- Mongoose
- Express.js
- Angular
- Node.js
- TypeScript
- JavaScript
- HTML/CSS
- Handlebars
- RESTful APIs
- JSON
- JSON Web Tokens (JWT)
- Git and GitHub

---

**Fatima Mubasher**  
Bachelor of Science in Computer Science 

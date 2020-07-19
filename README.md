# express-bookstore


### What was this project about? 

This project was an opportunity to learn about API validation through the creation and implementation of JSON Schema. 

--- 

### What I did 

I was given starter code that contained a simple RESTful API for a bookstore, a static model for "Book," and a SQL file to create a db table. 

After setting up my environment, installing and requiring dependencies, creating my database, and gaining a thorough understanding of the codebase, I created an example book object. I used a JSON Schema tool provided by [JSONSchema.net](https://jsonschema.net/home) to generate the original schema for my book objects based on my example. I then made a few adjustments to my bookSchema (descriptions, max for the year published, etc), and utilized this schema in conjunction with the jsonschema npm tool to validate incoming book data in my routes.

I also wrote tests for every route, testing both success and error cases. 

--- 

### What I learned

This project taught me both the basics of API validation, and the point of validating data in the first place (having requests fail fast, avoiding errors down the road with corrupt/incomplete data, giving the user adequate feedback, etc). 

This was also the fastest I was able to write tests efficiently and with confidence, which is a victory in and of itself. 

--- 

### Looking forward 

My future work will consistently make use of API validation with JSONSchema, as I will want to avoid issues with my database. If I end up with free time and a lack of something to fill it with in the future (HAH) I would love to backtrack on previous REST API projects to include validation for creating and updating data.   

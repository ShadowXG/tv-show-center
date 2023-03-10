# TV Show Center
A place where you can add tv shows, comment on the shows, and give the shows a rating

---

# Technologies Used
- Javascript
- Mongoose
- CSS
- Liquid
- Bootstrap
- Axios
- Express

---

## User Stories
- I want the ability to sign up
- I want the ability to sign in
- I want the ability to update my tv shows
- I want the ability to read more about the tv show
- I want the ability to delete my own shows
- I want to be able to see all the different shows other people have added
- I want the ability to see my own tv shows
- I want to be able to comment on the shows
- I want to be able to rate the show

---

## Route tables

#### TV Shows

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /shows/         | GET          | index  
| /shows/:id      | GET          | show       
| /shows/new      | GET          | new   
| /shows          | POST         | create   
| /shows/:id/edit | GET          | edit       
| /shows/:id      | PATCH/PUT    | update    
| /shows/:id      | DELETE       | destroy  

#### Comments

| **URL**          | **HTTP Verb**|**Action**|
|--------------------|--------------|----------|
| /comments/:showId | POST          | create  
| /comments/delete/:showId/:commentId      | DELETE          | destroy 

#### Replies

| **URL**          | **HTTP Verb**|**Action**|
|--------------------|--------------|----------|
| /replies/:showId/:commentId    | POST          | create  
| /replies/delete/:showId/:replyId     | DELETE          | destroy 


#### Users

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /users/signup    | GET          | create  
| /users/login     | GET          | create             
| /users/logout    | DELETE       | destroy 

---

### Wireframe
![Alt text](project-planning/TV%20Show%20Center.jpg)

---

### ERD (Entity Relationship Diagram)
![Alt text](project-planning/ERD.jpg)

---

### Stuff I hope to add
- An average rating/ star rating average from users
- The ability to favorite shows and display those in a list

---

### Need to do research to do these
- incorporate pictures somehow
- Likes on comments (this will probably take too long)
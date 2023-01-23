# TV Show app
A place where you can add tv shows, comment on the shows, and give the shows a rating

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

#### Ratings BONUS

| **URL**          | **HTTP Verb**|**Action**|
|--------------------|--------------|----------|
| /ratings/:showId | POST          | create  
| /ratings/update/:showId/:ratingId      | PATCH/PUT         | update  

#### Comments

| **URL**          | **HTTP Verb**|**Action**|
|--------------------|--------------|----------|
| /comments/:showId | POST          | create  
| /comments/delete/:showId/:commentId      | DELETE          | destroy       


#### Users

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /users/signup    | GET          | new  
| /users/signup    | POST         | create  
| /users/login     | GET          | login       
| /users/login     | POST         | create       
| /users/logout    | DELETE       | destroy 


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
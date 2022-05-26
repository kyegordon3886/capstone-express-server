# **StoryTellers**
## A place for sharing stories
#### This app is a basic single page application that allows users to, upon signing up and signing in, share stories of any kind. It is a bit of a writer's hangout. A pace one can come to read and write interesting tales of truth or fiction. The idea behind the site is to inspire creativity and imagination, as well as provide a place for people to share their lives and their minds.
#
### **Planning and Problem Solving:**
#### Initially, the planning of this app began with thinking, and imagining a platform to share stories about peoples pets whom they lost as way of helping people heal. I had recently lost my dog whom I was very close with, and his loss inspired the idea behind the site. The idea evolved to a site for all stories, and thats when I began drawing up the plans. I started with an ERD of the back-end build, and then drew up what I wanted the front-end to look like, of course it evolved as I went along. There were quite a few problems to work out along the way, working with unfamiliar technologies and trying to create proper functionality. I had to reference a fair amount of documentation daily, and reach out to peers for guidance and ideas. But overall, little by little it came together. There is however, a good deal more I would like to include in the future as I further develop this application, including more in-depth styling, ability to share stories to social media sites, leave comments, and of course, a full length story of 'The Dog With No Eye's: The Incredible Life and Adventures of Sailor Boy, a Blind Chihuahua'. 
#
### **Unsolved bugs and problems:**
#### There are a handful of problems I was not able to sort out, most on the front end. I struggled to get the 'moment.js' date technology to work properly, and in some cases, decided not to implement it in version one. Other issues I ran into were building the correct back-end model for the like/unlike feature, which was a much larger undertaking than I had first imagined. I did have bugs with 'moment.js', where the date would not correctly display, but I managed to sort it out with some Googling, and using the proper .format() method. There is an issue with update, where it doesn't leave all the text in the boxes for a simple edits to be made, which forces the user to have to copy and paste from the story view, and place it in when editing if they wished to continue writing, or make a simple edit to their story, without having to re-write the whole thing. I struggled a bit with the proper routing as well in the nav-links, to get them to go where they needed to, but eventually figured them out with trial and error. Lots of changing things, and logging back in to test, but overall the app has turned out to be decently and basically functional for a version one. In the future, I predict there will need to be a good amount of maintenance done to manage to stories, as I am sure there will be too many and it will be hard to find what you want. I would like to implement a search feature that searches by name or keyword. I would also like to make it possible for users to create usernames, and be able to login with their username, as well has have it show who has liked which stories, and how many likes there are. Also, I would like to make comments on stories possible, and responses to those comments possible as well.  
#
### **User Stories:**
#### **As a user I want be able to:**
* Sign up
* Sign in
* Change my password
* Sign Out
* View all stories
* Write a story
* View my stories
* Edit my stories
* Delete my stories

#### Stretch Goals
* Comment on a story
* Edit my comments
* Delete my comments
* Search for stories with keywords
* Like a story
* Share a story to a social media site
#
### **ERD:**
[Link to ERD](https://i.imgur.com/yzijYR7.png)
![StoryTellers ERD](https://i.imgur.com/yzijYR7.png)

### **Route Catalog:**
API End Points

|Verb	|URI Pattern	|Controller#Action|
|-------|---------------|-----------------|
|POST   |	/sign-up	|users#signup     |
|POST	|   /sign-in	|users#signin     |
|DELETE	|   /sign-out	|users#signout    |
|PATCH	|/change-password|users#changepw|
|GET	|/stories	    |stories#index|
|POST	|/stories	    |stories#create|
|GET	|/stories/:id	|stories#show
|PATCH	|/stories/:id	|stories#update
|DELETE	|/stories/:id	|stories#delete
|PATCH	|/like/:id	    |like#update

* All data returned from API actions is formatted as JSON.
#

### **Installation Instructions:**
1. Fork and clone this repository.
1. Change into the new directory.
2. *If you plan to make contributions*, use `git init` to initialize a remote Git repository. Then create and checkout to a new branch using command `git checkout -b <new-branch-name>`.
3. Install dependencies in the root of your new directory with `npm install`.
4. Open in your code editor to make contributions. 
5. To run the application locally, in your terminal type `npm run server` to launch the server.
6. If you would like to launch the client, [click here](https://github.com/kyegordon3886/capstone-react-client) and follow the installation instructions in the readme.
#
### **Links:**
[Back End Url](https://infinite-island-44375.herokuapp.com/)

[Front End Repo](https://github.com/kyegordon3886/capstone-react-client)

[Deployed Site](https://kyegordon3886.github.io/capstone-react-client/)

### **Technologies Used:**
* Express.js
* Node.js
* Mongoose
* Passport
* Bcrypt

### Databases
* GitHub
* MongoDB
* Heroku
# spark-tech-challenge
tech challenge for Penn Spark Application

1. Fake Twitter (the kashyap456 way)
A basic forum where users can create posts, search posts, and reply to posts (and unfortunately not like posts :( )
2. It has distinct user accounts, which can send tweets to the scroller on the left (only if logged in).
Users can click on tweets to have them displayed in the display section (which is initially empty). Tweets can also be replied to,
and you can click on a reply to display its own replies. There's also a basic search that uses regex to check for author or keywords in a tweet.
3. I spent probably 5-6 hours, and another 2-3 attempting to deploy to Netlify/Next/Vercel. Next time I'll use NextJS!
4. Likes were the main thing that I would want to implement that I didn't really succeed at. If I were to do this again, I would probably use PostgreSQL
and use a many to one relationship between users and tweet to represent a like. I used mongoose because I was very familiar with it due to CIS197, but I 
think that using an ORM like Django would've given me more freedom.
5. install yarn if you don't have it installed.
Clone the git repo, then run yarn install to get any dependencies. It should run on Node 16.
Run yarn frontend:dev and yarn backend:dev in two separate terminal windows within the root directory of the project, then open up localhost:3000 in
the browser, and the application should be running.

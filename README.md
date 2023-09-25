# Spotify Playlist Maker

I created an app for building playlists in Spotify using their web API. It always bothered me that in both the app and web version of Spotify there was no way to have both the playlist and search open at the same time. I had friends that also complained about that along with a few other things so I decided to build a this app to create what I would want for user experience when building playlists.

**Link to project:** http://recruiters-love-seeing-live-demos.com/

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, Next.js, Styled Components, Spotify Web API and Web Playback SDK, MongoDB with Mongoose

For more information and details on how I built this project visit my project page where I go into even more details on how I built the project.
**Project page with more details** PORTFOLIO LINK HERE

### Initial Layout Problems and using Figma

When I first decided that I wanted to build this application I knew I wanted have three sections on the screen when on a desktop. I wanted a place where users could see all their playlists, a section for the active playlist, and finally a section for whatever they were searching for. I tried out a few layouts and eventually ended up liking the three column layout the best. After having a basic layout drawn up on paper I tried to start building in React. This ended poorly. I had no idea what any of the CSS was going to be. How much space I should have between elements, what colors to use, or even how I was going to fit everything I wanted on the page. I also had no idea how I would get the app to look nice on tablets and mobile while still retaining the basic functionality. Long story short, it was a mess and I was wasting so much time and in the end scrapped the code. I was going to need so form of organization and planning to build an app of this size.

I had used Figma designs before when building other sites but had never used it for my own design. I spent about a week in the evenings on learning and working on a design for the application. I was surprised by how easy it was to build and use Figma to create layouts. What was taking my hours while coding took minutes. The biggest take away I had from the experience was to never try and code up anything without having a good design and solid plan beforehand. It saves so many headaches and made the rest of the process so much smoother. Any time I had design questions I just had to look at the Figma document. Of course there were a few places where my design had to be altered when something that I didn't expect came up while coding but overall I think it was the most helpful thing I did to make building the application easier.

**Link to Figma document** https://www.figma.com/file/OTiDS4iFqGXu1qgfVK7mhI/Spotify-Playlist-Builder?type=design&node-id=0%3A1&mode=design&t=d8WZ2nHJWJhrwKvC-1

### Authentication Using Spotify Authorization Code Flow

### Building the Backend and getting data from Spotify

### Searching and Sorting

### Drag and Drop Playlist Songs

### Optimisic Updates and Fixing too Many Requests to Spotify

### Tagging Songs using a Database

### Playing Songs using Spotify Web SDK

### Initial logic

### Using styled components

This was the first project that I really used styled components in and I learned so much. One of the big things that I learned and really liked was having the ablity to change styles based on JavaScript variables. It made implementing the logic I had come up with into the CSS very easy. Instead of constantly having to change and add classes I could do something simple like this:

```
background-color: ${(p) =>
    p.enabled ? "var(--color-highlight-700)" : "var(--color-primary)"};
```

So whenever in the logic of the code a square is flagged as enabled the color of it's square is changed.

### React and Memoization

When I had started this project I had never heard of Memoization before, or if I had I didn't remember about it. I quickly ran into a problem that was causing my code to unlessly loop. I later found out that this was because every time a component renders the functions are rebuilt so are "different" even if the function code would be the same. This caused the app to think that a change had been made and a new render was needed. This new render recreated the function so a "new" change had happened causing another new render. This means an infinite loop had been created.

After some reading and trying to figure out and understand the problem I came across memoization and the useCallback function of react.

## Optimizations

- A better way to show that the game has ended
- ~~A button to start a new game~~
- The ablity to play against a computer AI.

## Lessons Learned:

This project was a really great way for me to learn and better understand a few new technologies as well as greatly improve my understanding of how to use 2d arrays. I learned the purpose of memoization and why it is important. I also learned an alternative to traditional css along with some of its strengths and weaknesses.

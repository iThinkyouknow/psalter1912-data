The Psalter 1912 Data Repository
===
Welcome! Here is where you'll find the data that is used in the Psalter 1912 project(s).
---
### You'll probably want to include this repository as a git submodule rather than copying from it directly.

    git submodule add https://github.com/iThinkyouknow/psalter1912-data.git

From your main project if you ever need to clone it from start,

    git clone --recurse-submodules <your project url>

When you are pulling in your main project and would also like to pull whatever is the latest from the submodule.

    git submodule update --recursive --remote

### There are unminified jsons that I work with (this helps with git diffing so that I know what I have changed.) and minified ones. You should use the minified ones for making your app.

### A few scripts might be of interest to you if you are working on it.
1. data-minifier.js
2. create-search-psalter-data.js

Run data-minifier to transform the unminified json to minified ones

(It saves a alot of space! 15mb -> 6mb)
    
    cd data-scripts
    node data-minifier.js

### The json used for search psalter function ought to be automatically generated from the psalter.json. Take note that you should run this before running "data-minifier". To do this run
    cd data-scripts
    node create-search-psalter-data.js

### I have included THE SCRIPT so that you do not need to worry about such minor details
    cd data-scripts
    sh the-script.js

### There is a "version.json" file to record the version of each json, and their respective remote urls (if you'd like to remotely fetch the data instead). Updates to each file would be manual and incremented by 1, when necessary.

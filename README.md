The Psalter 1912 Data Repository
===
Welcome! Here is where you'll find the data that is used in the Psalter 1912 project(s).
### Why am I writing this as if someone else is gonna use it? No one uses this ever! NO ONEEEEEEE!!!!
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
    sh the-script.sh

### There is a "version.json" file to record the version of each json, and their respective remote urls (if you'd like to remotely fetch the data instead). There is a script that automatically increments by 1 if you have any *.json in your git staged (added) files. i.e.
    
    git add _<file>.json
    cd data-scripts
    sh the-script.sh

or if you prefer to do it manually

    cd data-scripts
    node automagically-updating-version-json.js <filename>

or for git added files

    cd data-scripts
    node automagically-updating-version-json.js $(git diff --name-only --cached)

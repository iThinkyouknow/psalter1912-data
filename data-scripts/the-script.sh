#!/bin/sh
# This is THE script.js
# The script that you need to run to
#   1) auto generate the search json
#   2) generate minified jsons
node ./create-search-psalter-data.js
node ./create-confessions-search.js
node ./data-minifier.js
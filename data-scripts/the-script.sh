#!/bin/sh
# This is THE script.js
# The script that you need to run to
#   1) auto generate the search json
#   2) generate minified jsons
node automagically-updating-version-json.js $(git diff --name-only --cached)
node ./create-search-psalter-data.js
node ./data-minifier.js
#!/bin/bash

cd Tests

rm *.html
find . -name "*.text" -exec pandoc {} -f markdown -o {}.html \;
find . -name "*.text.html" -exec sh -c 'mv "$0" "${0%.text.html}.html"' {} \;

cd -

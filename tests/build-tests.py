#!/usr/bin/python

import os

filebody = ''
filebody+= 'QUnit.module("Pandoc Syntax test");\n\n'
#filebody+= 'Markdown = require("../pandoc.js").Markdown;\n\n'
count = 1

for root, dirs, files in os.walk('./Tests/'):
    for fname in files:
        if 'html' in fname:
            continue
        else:
            count += 1
            if count > 12:
                break;
            fname = fname.replace('.text', '')
            filebody += ('/**\n * %s\n */\n') % fname
            filebody += ('QUnit.test("%s", function() {\n') % fname

            # something.text
            filebody += ('    var input =\n')
            lines = open('Tests/'+fname+'.text').read().splitlines()
            for line in lines:
                line = line.replace('"', '\\"')
                filebody += ('        "%s\\n" +\n') % line
            filebody += ('        "";\n\n')

            # something.text
            filebody += ('    var expected =\n')
            lines = open('Tests/'+fname+'.html').read().splitlines()
            for line in lines:
                line = line.replace('"', '\\"')
                filebody += ('        "%s\\n" +\n') % line
            filebody += ('        "";\n\n')

            filebody += ('    var result = Markdown(input);\n')
            filebody += ('    QUnit.assert.equal(result, expected);\n')
            filebody += ('});\n\n')


fjs = open('pandoc-tests.js', 'w')
fjs.write(filebody)
fjs.close()

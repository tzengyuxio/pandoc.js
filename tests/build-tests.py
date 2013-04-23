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
            if count > 5:
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


#filebody+= '''
#/**
 #* Auto Link
 #*/
#QUnit.test("Auto Link", function() {
    #var input =
        #'<http://foo.com/>  ' + "\\n" +
        #'<mailto:foo@bar.com>' + "\\n" +
        #"";

    #var expected =
        #'<p><a href="http://foo.com/">http://foo.com/</a><br />'+"\\n"+
        #'<a
        #href="m&#97;&#105;&#108;&#116;&#111;&#58;&#x66;&#x6f;&#x6f;&#x40;&#x62;&#x61;&#x72;.&#99;&#111;&#109;">&#x66;&#x6f;&#x6f;&#x40;&#x62;&#x61;&#x72;.&#99;&#111;&#109;</a></p>'+"\\n"+
        #"";

    #var result = Markdown(input);
    #QUnit.assert.equal(result, expected);
#});
#'''

fjs = open('pandoc-tests.js', 'w')
fjs.write(filebody)
fjs.close()

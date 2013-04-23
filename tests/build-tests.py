#!/usr/bin/python

filebody = ''
filebody+= 'QUnit.module( "Pandoc Syntax test" );\n'
filebody+= '\n'

filebody+= '''
/**
 * Auto Link
 */
QUnit.test("Auto Link", function() {
    var input =
        '<http://foo.com/>  ' + "\\n" +
        '<mailto:foo@bar.com>' + "\\n" +
        "";

    var expected =
        '<p><a href="http://foo.com/">http://foo.com/</a><br />'+"\\n"+
        '<a
        href="m&#97;&#105;&#108;&#116;&#111;&#58;&#x66;&#x6f;&#x6f;&#x40;&#x62;&#x61;&#x72;.&#99;&#111;&#109;">&#x66;&#x6f;&#x6f;&#x40;&#x62;&#x61;&#x72;.&#99;&#111;&#109;</a></p>'+"\\n"+
        "";

    var result = Markdown(input);
    QUnit.assert.equal(result, expected);
});
'''

f = open('pandoc-tests.js', 'w')
f.write(filebody)
f.close()

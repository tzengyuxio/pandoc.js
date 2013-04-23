QUnit.module("Pandoc Syntax test");

/**
 * Amps and angle encoding
 */
QUnit.test("Amps and angle encoding", function() {
    var input =
        "AT&T has an ampersand in their name.\n" +
        "\n" +
        "AT&amp;T is another way to write it.\n" +
        "\n" +
        "This & that.\n" +
        "\n" +
        "4 < 5.\n" +
        "\n" +
        "6 > 5.\n" +
        "\n" +
        "Here's a [link] [1] with an ampersand in the URL.\n" +
        "\n" +
        "Here's a link with an amersand in the link text: [AT&T] [2].\n" +
        "\n" +
        "Here's an inline [link](/script?foo=1&bar=2).\n" +
        "\n" +
        "Here's an inline [link](</script?foo=1&bar=2>).\n" +
        "\n" +
        "\n" +
        "[1]: http://example.com/?foo=1&bar=2\n" +
        "[2]: http://att.com/  \"AT&T\"\n" +
        "";

    var expected =
        "<p>AT&amp;T has an ampersand in their name.</p>\n" +
        "<p>AT&amp;T is another way to write it.</p>\n" +
        "<p>This &amp; that.</p>\n" +
        "<p>4 &lt; 5.</p>\n" +
        "<p>6 &gt; 5.</p>\n" +
        "<p>Here's a <a href=\"http://example.com/?foo=1&amp;bar=2\">link</a> with an ampersand in the URL.</p>\n" +
        "<p>Here's a link with an amersand in the link text: <a href=\"http://att.com/\" title=\"AT&amp;T\">AT&amp;T</a>.</p>\n" +
        "<p>Here's an inline <a href=\"/script?foo=1&amp;bar=2\">link</a>.</p>\n" +
        "<p>Here's an inline <a href=\"/script?foo=1&amp;bar=2\">link</a>.</p>\n" +
        "";

    var result = Markdown(input);
    QUnit.assert.equal(result, expected);
});

/**
 * Auto links
 */
QUnit.test("Auto links", function() {
    var input =
        "Link: <http://example.com/>.\n" +
        "\n" +
        "With an ampersand: <http://example.com/?foo=1&bar=2>\n" +
        "\n" +
        "* In a list?\n" +
        "* <http://example.com/>\n" +
        "* It should.\n" +
        "\n" +
        "> Blockquoted: <http://example.com/>\n" +
        "\n" +
        "Auto-links should not occur here: `<http://example.com/>`\n" +
        "\n" +
        "	or here: <http://example.com/>\n" +
        "";

    var expected =
        "<p>Link: <a href=\"http://example.com/\">http://example.com/</a>.</p>\n" +
        "<p>With an ampersand: <a href=\"http://example.com/?foo=1&amp;bar=2\">http://example.com/?foo=1&amp;bar=2</a></p>\n" +
        "<ul>\n" +
        "<li>In a list?</li>\n" +
        "<li><a href=\"http://example.com/\">http://example.com/</a></li>\n" +
        "<li>It should.</li>\n" +
        "</ul>\n" +
        "<blockquote>\n" +
        "<p>Blockquoted: <a href=\"http://example.com/\">http://example.com/</a></p>\n" +
        "</blockquote>\n" +
        "<p>Auto-links should not occur here: <code>&lt;http://example.com/&gt;</code></p>\n" +
        "<pre><code>or here: &lt;http://example.com/&gt;</code></pre>\n" +
        "";

    var result = Markdown(input);
    QUnit.assert.equal(result, expected);
});

/**
 * Backslash escapes
 */
QUnit.test("Backslash escapes", function() {
    var input =
        "These should all get escaped:\n" +
        "\n" +
        "Backslash: \\\n" +
        "\n" +
        "Backtick: \`\n" +
        "\n" +
        "Asterisk: \*\n" +
        "\n" +
        "Underscore: \_\n" +
        "\n" +
        "Left brace: \{\n" +
        "\n" +
        "Right brace: \}\n" +
        "\n" +
        "Left bracket: \[\n" +
        "\n" +
        "Right bracket: \]\n" +
        "\n" +
        "Left paren: \(\n" +
        "\n" +
        "Right paren: \)\n" +
        "\n" +
        "Greater-than: \>\n" +
        "\n" +
        "Hash: \#\n" +
        "\n" +
        "Period: \.\n" +
        "\n" +
        "Bang: \!\n" +
        "\n" +
        "Plus: \+\n" +
        "\n" +
        "Minus: \-\n" +
        "\n" +
        "\n" +
        "\n" +
        "These should not, because they occur within a code block:\n" +
        "\n" +
        "	Backslash: \\\n" +
        "\n" +
        "	Backtick: \`\n" +
        "\n" +
        "	Asterisk: \*\n" +
        "\n" +
        "	Underscore: \_\n" +
        "\n" +
        "	Left brace: \{\n" +
        "\n" +
        "	Right brace: \}\n" +
        "\n" +
        "	Left bracket: \[\n" +
        "\n" +
        "	Right bracket: \]\n" +
        "\n" +
        "	Left paren: \(\n" +
        "\n" +
        "	Right paren: \)\n" +
        "\n" +
        "	Greater-than: \>\n" +
        "\n" +
        "	Hash: \#\n" +
        "\n" +
        "	Period: \.\n" +
        "\n" +
        "	Bang: \!\n" +
        "\n" +
        "	Plus: \+\n" +
        "\n" +
        "	Minus: \-\n" +
        "\n" +
        "\n" +
        "Nor should these, which occur in code spans:\n" +
        "\n" +
        "Backslash: `\\`\n" +
        "\n" +
        "Backtick: `` \` ``\n" +
        "\n" +
        "Asterisk: `\*`\n" +
        "\n" +
        "Underscore: `\_`\n" +
        "\n" +
        "Left brace: `\{`\n" +
        "\n" +
        "Right brace: `\}`\n" +
        "\n" +
        "Left bracket: `\[`\n" +
        "\n" +
        "Right bracket: `\]`\n" +
        "\n" +
        "Left paren: `\(`\n" +
        "\n" +
        "Right paren: `\)`\n" +
        "\n" +
        "Greater-than: `\>`\n" +
        "\n" +
        "Hash: `\#`\n" +
        "\n" +
        "Period: `\.`\n" +
        "\n" +
        "Bang: `\!`\n" +
        "\n" +
        "Plus: `\+`\n" +
        "\n" +
        "Minus: `\-`\n" +
        "\n" +
        "\n" +
        "These should get escaped, even though they're matching pairs for\n" +
        "other Markdown constructs:\n" +
        "\n" +
        "\*asterisks\*\n" +
        "\n" +
        "\_underscores\_\n" +
        "\n" +
        "\`backticks\`\n" +
        "\n" +
        "This is a code span with a literal backslash-backtick sequence: `` \` ``\n" +
        "\n" +
        "This is a tag with unescaped backticks <span attr='`ticks`'>bar</span>.\n" +
        "\n" +
        "This is a tag with backslashes <span attr='\\backslashes\\'>bar</span>.\n" +
        "";

    var expected =
        "<p>These should all get escaped:</p>\n" +
        "<p>Backslash: \</p>\n" +
        "<p>Backtick: `</p>\n" +
        "<p>Asterisk: *</p>\n" +
        "<p>Underscore: _</p>\n" +
        "<p>Left brace: {</p>\n" +
        "<p>Right brace: }</p>\n" +
        "<p>Left bracket: [</p>\n" +
        "<p>Right bracket: ]</p>\n" +
        "<p>Left paren: (</p>\n" +
        "<p>Right paren: )</p>\n" +
        "<p>Greater-than: &gt;</p>\n" +
        "<p>Hash: #</p>\n" +
        "<p>Period: .</p>\n" +
        "<p>Bang: !</p>\n" +
        "<p>Plus: +</p>\n" +
        "<p>Minus: -</p>\n" +
        "<p>These should not, because they occur within a code block:</p>\n" +
        "<pre><code>Backslash: \\\n" +
        "\n" +
        "Backtick: \`\n" +
        "\n" +
        "Asterisk: \*\n" +
        "\n" +
        "Underscore: \_\n" +
        "\n" +
        "Left brace: \{\n" +
        "\n" +
        "Right brace: \}\n" +
        "\n" +
        "Left bracket: \[\n" +
        "\n" +
        "Right bracket: \]\n" +
        "\n" +
        "Left paren: \(\n" +
        "\n" +
        "Right paren: \)\n" +
        "\n" +
        "Greater-than: \&gt;\n" +
        "\n" +
        "Hash: \#\n" +
        "\n" +
        "Period: \.\n" +
        "\n" +
        "Bang: \!\n" +
        "\n" +
        "Plus: \+\n" +
        "\n" +
        "Minus: \-</code></pre>\n" +
        "<p>Nor should these, which occur in code spans:</p>\n" +
        "<p>Backslash: <code>\\</code></p>\n" +
        "<p>Backtick: <code>\`</code></p>\n" +
        "<p>Asterisk: <code>\*</code></p>\n" +
        "<p>Underscore: <code>\_</code></p>\n" +
        "<p>Left brace: <code>\{</code></p>\n" +
        "<p>Right brace: <code>\}</code></p>\n" +
        "<p>Left bracket: <code>\[</code></p>\n" +
        "<p>Right bracket: <code>\]</code></p>\n" +
        "<p>Left paren: <code>\(</code></p>\n" +
        "<p>Right paren: <code>\)</code></p>\n" +
        "<p>Greater-than: <code>\&gt;</code></p>\n" +
        "<p>Hash: <code>\#</code></p>\n" +
        "<p>Period: <code>\.</code></p>\n" +
        "<p>Bang: <code>\!</code></p>\n" +
        "<p>Plus: <code>\+</code></p>\n" +
        "<p>Minus: <code>\-</code></p>\n" +
        "<p>These should get escaped, even though they're matching pairs for other Markdown constructs:</p>\n" +
        "<p>*asterisks*</p>\n" +
        "<p>_underscores_</p>\n" +
        "<p>`backticks`</p>\n" +
        "<p>This is a code span with a literal backslash-backtick sequence: <code>\`</code></p>\n" +
        "<p>This is a tag with unescaped backticks <span attr='`ticks`'>bar</span>.</p>\n" +
        "<p>This is a tag with backslashes <span attr='\\backslashes\\'>bar</span>.</p>\n" +
        "";

    var result = Markdown(input);
    QUnit.assert.equal(result, expected);
});

/**
 * Blockquotes with code blocks
 */
QUnit.test("Blockquotes with code blocks", function() {
    var input =
        "> Example:\n" +
        "> \n" +
        ">     sub status {\n" +
        ">         print \"working\";\n" +
        ">     }\n" +
        "> \n" +
        "> Or:\n" +
        "> \n" +
        ">     sub status {\n" +
        ">         return \"working\";\n" +
        ">     }\n" +
        "";

    var expected =
        "<blockquote>\n" +
        "<p>Example:</p>\n" +
        "<pre><code>sub status {\n" +
        "    print &quot;working&quot;;\n" +
        "}</code></pre>\n" +
        "<p>Or:</p>\n" +
        "<pre><code>sub status {\n" +
        "    return &quot;working&quot;;\n" +
        "}</code></pre>\n" +
        "</blockquote>\n" +
        "";

    var result = Markdown(input);
    QUnit.assert.equal(result, expected);
});

/**
 * Code Blocks
 */
QUnit.test("Code Blocks", function() {
    var input =
        "	code block on the first line\n" +
        "	\n" +
        "Regular text.\n" +
        "\n" +
        "    code block indented by spaces\n" +
        "\n" +
        "Regular text.\n" +
        "\n" +
        "	the lines in this block  \n" +
        "	all contain trailing spaces  \n" +
        "\n" +
        "Regular Text.\n" +
        "\n" +
        "	code block on the last line\n" +
        "";

    var expected =
        "<pre><code>code block on the first line</code></pre>\n" +
        "<p>Regular text.</p>\n" +
        "<pre><code>code block indented by spaces</code></pre>\n" +
        "<p>Regular text.</p>\n" +
        "<pre><code>the lines in this block  \n" +
        "all contain trailing spaces  </code></pre>\n" +
        "<p>Regular Text.</p>\n" +
        "<pre><code>code block on the last line</code></pre>\n" +
        "";

    var result = Markdown(input);
    QUnit.assert.equal(result, expected);
});

/**
 * Code Spans
 */
QUnit.test("Code Spans", function() {
    var input =
        "`<test a=\"` content of attribute `\">`\n" +
        "\n" +
        "Fix for backticks within HTML tag: <span attr='`ticks`'>like this</span>\n" +
        "\n" +
        "Here's how you put `` `backticks` `` in a code span.\n" +
        "\n" +
        "";

    var expected =
        "<p><code>&lt;test a=&quot;</code> content of attribute <code>&quot;&gt;</code></p>\n" +
        "<p>Fix for backticks within HTML tag: <span attr='`ticks`'>like this</span></p>\n" +
        "<p>Here's how you put <code>`backticks`</code> in a code span.</p>\n" +
        "";

    var result = Markdown(input);
    QUnit.assert.equal(result, expected);
});

/**
 * Hard-wrapped paragraphs with list-like lines
 */
QUnit.test("Hard-wrapped paragraphs with list-like lines", function() {
    var input =
        "In Markdown 1.0.0 and earlier. Version\n" +
        "8. This line turns into a list item.\n" +
        "Because a hard-wrapped line in the\n" +
        "middle of a paragraph looked like a\n" +
        "list item.\n" +
        "\n" +
        "Here's one with a bullet.\n" +
        "* criminey.\n" +
        "";

    var expected =
        "<p>In Markdown 1.0.0 and earlier. Version 8. This line turns into a list item. Because a hard-wrapped line in the middle of a paragraph looked like a list item.</p>\n" +
        "<p>Here's one with a bullet. * criminey.</p>\n" +
        "";

    var result = Markdown(input);
    QUnit.assert.equal(result, expected);
});


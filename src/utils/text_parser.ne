# Make use you have already installed nearley as a global package.
# If not, run npm install -g nearley
# Don't forget to run nearleyc text_parser.ne -o textParser.ts after you modify this file!!!
@preprocessor typescript
@{%
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}
%}
text -> space:* post_request (space|new_line):* query (space|new_line):*
{%
function(data) {
	return {
		url: flatten(data[1][2]).join(''),
		query: flatten(data[3]).join('')
	}
}
%}
query -> query_prompt:? "{" new_line (letter|space|brace|new_line):+ new_line "}"
query_prompt -> "query" (space word):? space:*
post_request -> "post"i space:+ url
url -> protocol domain (null|path) fragment
domain -> (word "."):+ word "/"
path -> (fragment "/"):+
fragment -> (letter|digit):+
protocol -> ("http"|"https") "://"
brace -> "{"|"}"
new_line -> "\n"
space -> " "
word -> letter:+
letter -> [a-zA-z]
digit -> [0-9]

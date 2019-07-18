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
query_prompt -> "query" (space word):? (space:* "(" space:* query_variable space:* ":" space:* variable space:* ")" space:*):? space:*
query_variable -> "$" variable
post_request -> "post"i space:+ url
url -> protocol domain (null|path) fragment
domain -> (word "."):+ word "/"
path -> (fragment "/"):+
fragment -> (letter|digit):+
protocol -> ("http"|"https") "://"
brace -> "{"|"}"
new_line -> "\n"
space -> " "
variable -> piece|(piece ("_"|null)):+
piece -> (letter):+ (digit|letter):*
word -> letter:+
number -> integer | float
float -> integer "." integer
integer -> digit:+
letter -> [a-zA-z]
digit -> [0-9]

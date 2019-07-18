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
text -> (space|new_line):* post_request (space|new_line):* query (space|new_line):*
{%
function(data) {
	return {
		url: flatten(data[1][2]).join(''),
		query: flatten(data[3]).join('')
	}
}
%}
query -> query_prompt query_body | query_body
query_body -> space:* "{" new_line query_content:+ new_line "}"
query_content -> letter|space|brace|new_line|"("|")"|"$"|":"
query_prompt -> "query" (space:+ word):? spaces ("(" spaces query_variable spaces (":" spaces query_argument spaces ):? ")"):?
query_variable -> "$" variable
query_argument -> variable (space:* "=" space:* default_value):?
default_value -> number | variable
post_request -> "post"i space:+ url
url -> protocol domain (null|path) fragment
domain -> (word "."):+ word "/"
path -> (fragment "/"):+
fragment -> (letter|digit):+
protocol -> ("http"|"https") "://"
brace -> "{"|"}"
new_line -> "\n"
spaces -> space:*
space -> " "
variable -> piece|(piece ("_"|null)):+
piece -> (letter):+ (digit|letter):*
word -> letter:+
number -> integer | float
float -> integer "." integer
integer -> digit:+
letter -> [a-zA-z]
digit -> [0-9]

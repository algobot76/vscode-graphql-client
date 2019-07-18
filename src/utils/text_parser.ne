# Make use you have already installed nearley as a global package.
# If not, run `npm install -g nearley`.
# Don't forget to run `nearleyc text_parser.ne -o textParser.ts` after you modify this file!!!
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

# Text
text -> empty post_request empty query empty
{%
function(data) {
	return {
		url: flatten(data[1][2]).join(''),
		query: flatten(data[3]).join('')
	}
}
%}

# Query
query -> query_prompt query_body | query_body
query_body -> _ l_brace new_line query_content:+ new_line r_brace
query_content -> letter|space|brace|paren|new_line|"$"|":"
query_prompt -> "query" (space:+ word):? _ (l_paren _ query_variable _ (":" _ query_argument _ ):? r_paren):?
query_variable -> "$" js_variable
query_argument -> js_variable (_ "=" _ default_value):?
default_value -> number | js_variable

# URL
post_request -> "post"i space:+ url
url -> protocol domain (null|path) fragment
domain -> (word "."):+ word "/"
path -> (fragment "/"):+
fragment -> (letter|digit):+
protocol -> ("http"|"https") "://"

# Primitives
paren -> l_paren|r_paren
l_paren -> "("
r_paren -> ")"
brace -> l_brace|r_brace
l_brace -> "{"
r_brace -> "}"
new_line -> "\n"
empty -> (space|new_line):*
_ -> space:*
space -> " "
js_variable -> js_variable_part|(js_variable_part ("_"|null)):+
js_variable_part -> (letter):+ (digit|letter):*
word -> letter:+
number -> integer | float
float -> integer "." integer
integer -> digit:+
letter -> [a-zA-z]
digit -> [0-9]

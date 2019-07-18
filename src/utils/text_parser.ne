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
text -> space:* post_request (space|new_line):* query
{% function(data) {
	return {
		url: flatten(data[1][2]).join(''),
		query: flatten(data[3]).join('')
	}
} %}
query -> "{" new_line (letter|space|brace|new_line):+ new_line "}"
post_request -> "post"i space:+ url
url -> word "." word "." word
brace -> "{"|"}"
new_line -> "\n"
space -> " "
word -> letter:+
letter -> [a-zA-z]

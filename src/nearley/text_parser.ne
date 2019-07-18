text -> space:* post_request (space|new_line):* query
query -> "{" new_line (letter|space|brace|new_line):+ new_line "}"
post_request -> "post"i space:+ url
url -> word "." word "." word
brace -> "{"|"}"
new_line -> "\n"
space -> " "
word -> letter:+
letter -> [a-zA-z]

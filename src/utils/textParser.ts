// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

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

export interface Token { value: any; [key: string]: any };

export interface Lexer {
  reset: (chunk: string, info: any) => void;
  next: () => Token | undefined;
  save: () => any;
  formatError: (token: Token) => string;
  has: (tokenType: string) => boolean
};

export interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any
};

export type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

export var Lexer: Lexer | undefined = undefined;

export var ParserRules: NearleyRule[] = [
    {"name": "text$ebnf$1", "symbols": []},
    {"name": "text$ebnf$1", "symbols": ["text$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "text$ebnf$2", "symbols": []},
    {"name": "text$ebnf$2$subexpression$1", "symbols": ["space"]},
    {"name": "text$ebnf$2$subexpression$1", "symbols": ["new_line"]},
    {"name": "text$ebnf$2", "symbols": ["text$ebnf$2", "text$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "text", "symbols": ["text$ebnf$1", "post_request", "text$ebnf$2", "query"], "postprocess":  function(data) {
        	return {
        		url: flatten(data[1][2]).join(''),
        		query: flatten(data[3]).join('')
        	}
        } },
    {"name": "query$ebnf$1$subexpression$1", "symbols": ["letter"]},
    {"name": "query$ebnf$1$subexpression$1", "symbols": ["space"]},
    {"name": "query$ebnf$1$subexpression$1", "symbols": ["brace"]},
    {"name": "query$ebnf$1$subexpression$1", "symbols": ["new_line"]},
    {"name": "query$ebnf$1", "symbols": ["query$ebnf$1$subexpression$1"]},
    {"name": "query$ebnf$1$subexpression$2", "symbols": ["letter"]},
    {"name": "query$ebnf$1$subexpression$2", "symbols": ["space"]},
    {"name": "query$ebnf$1$subexpression$2", "symbols": ["brace"]},
    {"name": "query$ebnf$1$subexpression$2", "symbols": ["new_line"]},
    {"name": "query$ebnf$1", "symbols": ["query$ebnf$1", "query$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "query", "symbols": [{"literal":"{"}, "new_line", "query$ebnf$1", "new_line", {"literal":"}"}]},
    {"name": "post_request$subexpression$1", "symbols": [/[pP]/, /[oO]/, /[sS]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "post_request$ebnf$1", "symbols": ["space"]},
    {"name": "post_request$ebnf$1", "symbols": ["post_request$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "post_request", "symbols": ["post_request$subexpression$1", "post_request$ebnf$1", "url"]},
    {"name": "url", "symbols": ["word", {"literal":"."}, "word", {"literal":"."}, "word"]},
    {"name": "brace", "symbols": [{"literal":"{"}]},
    {"name": "brace", "symbols": [{"literal":"}"}]},
    {"name": "new_line", "symbols": [{"literal":"\n"}]},
    {"name": "space", "symbols": [{"literal":" "}]},
    {"name": "word$ebnf$1", "symbols": ["letter"]},
    {"name": "word$ebnf$1", "symbols": ["word$ebnf$1", "letter"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "word", "symbols": ["word$ebnf$1"]},
    {"name": "letter", "symbols": [/[a-zA-z]/]}
];

export var ParserStart: string = "text";

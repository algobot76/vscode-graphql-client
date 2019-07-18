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
    {"name": "text$ebnf$3", "symbols": []},
    {"name": "text$ebnf$3$subexpression$1", "symbols": ["space"]},
    {"name": "text$ebnf$3$subexpression$1", "symbols": ["new_line"]},
    {"name": "text$ebnf$3", "symbols": ["text$ebnf$3", "text$ebnf$3$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "text", "symbols": ["text$ebnf$1", "post_request", "text$ebnf$2", "query", "text$ebnf$3"], "postprocess": 
        function(data) {
        	return {
        		url: flatten(data[1][2]).join(''),
        		query: flatten(data[3]).join('')
        	}
        }
        },
    {"name": "query", "symbols": ["query_prompt", "query_body"]},
    {"name": "query", "symbols": ["query_body"]},
    {"name": "query_body$ebnf$1", "symbols": []},
    {"name": "query_body$ebnf$1", "symbols": ["query_body$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "query_body$ebnf$2", "symbols": ["query_content"]},
    {"name": "query_body$ebnf$2", "symbols": ["query_body$ebnf$2", "query_content"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "query_body", "symbols": ["query_body$ebnf$1", {"literal":"{"}, "new_line", "query_body$ebnf$2", "new_line", {"literal":"}"}]},
    {"name": "query_content", "symbols": ["letter"]},
    {"name": "query_content", "symbols": ["space"]},
    {"name": "query_content", "symbols": ["brace"]},
    {"name": "query_content", "symbols": ["new_line"]},
    {"name": "query_content", "symbols": [{"literal":"("}]},
    {"name": "query_content", "symbols": [{"literal":")"}]},
    {"name": "query_content", "symbols": [{"literal":"$"}]},
    {"name": "query_content", "symbols": [{"literal":":"}]},
    {"name": "query_prompt$string$1", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"e"}, {"literal":"r"}, {"literal":"y"}], "postprocess": (d) => d.join('')},
    {"name": "query_prompt$ebnf$1$subexpression$1$ebnf$1", "symbols": ["space"]},
    {"name": "query_prompt$ebnf$1$subexpression$1$ebnf$1", "symbols": ["query_prompt$ebnf$1$subexpression$1$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "query_prompt$ebnf$1$subexpression$1", "symbols": ["query_prompt$ebnf$1$subexpression$1$ebnf$1", "word"]},
    {"name": "query_prompt$ebnf$1", "symbols": ["query_prompt$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "query_prompt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "query_prompt$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":":"}, "spaces", "query_argument", "spaces"]},
    {"name": "query_prompt$ebnf$2$subexpression$1$ebnf$1", "symbols": ["query_prompt$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "query_prompt$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "query_prompt$ebnf$2$subexpression$1", "symbols": [{"literal":"("}, "spaces", "query_variable", "spaces", "query_prompt$ebnf$2$subexpression$1$ebnf$1", {"literal":")"}]},
    {"name": "query_prompt$ebnf$2", "symbols": ["query_prompt$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "query_prompt$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "query_prompt", "symbols": ["query_prompt$string$1", "query_prompt$ebnf$1", "spaces", "query_prompt$ebnf$2"]},
    {"name": "query_variable", "symbols": [{"literal":"$"}, "variable"]},
    {"name": "query_argument$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "query_argument$ebnf$1$subexpression$1$ebnf$1", "symbols": ["query_argument$ebnf$1$subexpression$1$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "query_argument$ebnf$1$subexpression$1$ebnf$2", "symbols": []},
    {"name": "query_argument$ebnf$1$subexpression$1$ebnf$2", "symbols": ["query_argument$ebnf$1$subexpression$1$ebnf$2", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "query_argument$ebnf$1$subexpression$1", "symbols": ["query_argument$ebnf$1$subexpression$1$ebnf$1", {"literal":"="}, "query_argument$ebnf$1$subexpression$1$ebnf$2", "default_value"]},
    {"name": "query_argument$ebnf$1", "symbols": ["query_argument$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "query_argument$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "query_argument", "symbols": ["variable", "query_argument$ebnf$1"]},
    {"name": "default_value", "symbols": ["number"]},
    {"name": "default_value", "symbols": ["variable"]},
    {"name": "post_request$subexpression$1", "symbols": [/[pP]/, /[oO]/, /[sS]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "post_request$ebnf$1", "symbols": ["space"]},
    {"name": "post_request$ebnf$1", "symbols": ["post_request$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "post_request", "symbols": ["post_request$subexpression$1", "post_request$ebnf$1", "url"]},
    {"name": "url$subexpression$1", "symbols": []},
    {"name": "url$subexpression$1", "symbols": ["path"]},
    {"name": "url", "symbols": ["protocol", "domain", "url$subexpression$1", "fragment"]},
    {"name": "domain$ebnf$1$subexpression$1", "symbols": ["word", {"literal":"."}]},
    {"name": "domain$ebnf$1", "symbols": ["domain$ebnf$1$subexpression$1"]},
    {"name": "domain$ebnf$1$subexpression$2", "symbols": ["word", {"literal":"."}]},
    {"name": "domain$ebnf$1", "symbols": ["domain$ebnf$1", "domain$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "domain", "symbols": ["domain$ebnf$1", "word", {"literal":"/"}]},
    {"name": "path$ebnf$1$subexpression$1", "symbols": ["fragment", {"literal":"/"}]},
    {"name": "path$ebnf$1", "symbols": ["path$ebnf$1$subexpression$1"]},
    {"name": "path$ebnf$1$subexpression$2", "symbols": ["fragment", {"literal":"/"}]},
    {"name": "path$ebnf$1", "symbols": ["path$ebnf$1", "path$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "path", "symbols": ["path$ebnf$1"]},
    {"name": "fragment$ebnf$1$subexpression$1", "symbols": ["letter"]},
    {"name": "fragment$ebnf$1$subexpression$1", "symbols": ["digit"]},
    {"name": "fragment$ebnf$1", "symbols": ["fragment$ebnf$1$subexpression$1"]},
    {"name": "fragment$ebnf$1$subexpression$2", "symbols": ["letter"]},
    {"name": "fragment$ebnf$1$subexpression$2", "symbols": ["digit"]},
    {"name": "fragment$ebnf$1", "symbols": ["fragment$ebnf$1", "fragment$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "fragment", "symbols": ["fragment$ebnf$1"]},
    {"name": "protocol$subexpression$1$string$1", "symbols": [{"literal":"h"}, {"literal":"t"}, {"literal":"t"}, {"literal":"p"}], "postprocess": (d) => d.join('')},
    {"name": "protocol$subexpression$1", "symbols": ["protocol$subexpression$1$string$1"]},
    {"name": "protocol$subexpression$1$string$2", "symbols": [{"literal":"h"}, {"literal":"t"}, {"literal":"t"}, {"literal":"p"}, {"literal":"s"}], "postprocess": (d) => d.join('')},
    {"name": "protocol$subexpression$1", "symbols": ["protocol$subexpression$1$string$2"]},
    {"name": "protocol$string$1", "symbols": [{"literal":":"}, {"literal":"/"}, {"literal":"/"}], "postprocess": (d) => d.join('')},
    {"name": "protocol", "symbols": ["protocol$subexpression$1", "protocol$string$1"]},
    {"name": "brace", "symbols": [{"literal":"{"}]},
    {"name": "brace", "symbols": [{"literal":"}"}]},
    {"name": "new_line", "symbols": [{"literal":"\n"}]},
    {"name": "spaces$ebnf$1", "symbols": []},
    {"name": "spaces$ebnf$1", "symbols": ["spaces$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "spaces", "symbols": ["spaces$ebnf$1"]},
    {"name": "space", "symbols": [{"literal":" "}]},
    {"name": "variable", "symbols": ["piece"]},
    {"name": "variable$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"_"}]},
    {"name": "variable$ebnf$1$subexpression$1$subexpression$1", "symbols": []},
    {"name": "variable$ebnf$1$subexpression$1", "symbols": ["piece", "variable$ebnf$1$subexpression$1$subexpression$1"]},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1$subexpression$1"]},
    {"name": "variable$ebnf$1$subexpression$2$subexpression$1", "symbols": [{"literal":"_"}]},
    {"name": "variable$ebnf$1$subexpression$2$subexpression$1", "symbols": []},
    {"name": "variable$ebnf$1$subexpression$2", "symbols": ["piece", "variable$ebnf$1$subexpression$2$subexpression$1"]},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1", "variable$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "variable", "symbols": ["variable$ebnf$1"]},
    {"name": "piece$ebnf$1$subexpression$1", "symbols": ["letter"]},
    {"name": "piece$ebnf$1", "symbols": ["piece$ebnf$1$subexpression$1"]},
    {"name": "piece$ebnf$1$subexpression$2", "symbols": ["letter"]},
    {"name": "piece$ebnf$1", "symbols": ["piece$ebnf$1", "piece$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "piece$ebnf$2", "symbols": []},
    {"name": "piece$ebnf$2$subexpression$1", "symbols": ["digit"]},
    {"name": "piece$ebnf$2$subexpression$1", "symbols": ["letter"]},
    {"name": "piece$ebnf$2", "symbols": ["piece$ebnf$2", "piece$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "piece", "symbols": ["piece$ebnf$1", "piece$ebnf$2"]},
    {"name": "word$ebnf$1", "symbols": ["letter"]},
    {"name": "word$ebnf$1", "symbols": ["word$ebnf$1", "letter"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "word", "symbols": ["word$ebnf$1"]},
    {"name": "number", "symbols": ["integer"]},
    {"name": "number", "symbols": ["float"]},
    {"name": "float", "symbols": ["integer", {"literal":"."}, "integer"]},
    {"name": "integer$ebnf$1", "symbols": ["digit"]},
    {"name": "integer$ebnf$1", "symbols": ["integer$ebnf$1", "digit"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "integer", "symbols": ["integer$ebnf$1"]},
    {"name": "letter", "symbols": [/[a-zA-z]/]},
    {"name": "digit", "symbols": [/[0-9]/]}
];

export var ParserStart: string = "text";

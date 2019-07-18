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
    {"name": "text", "symbols": ["empty", "post_request", "empty", "query", "empty"], "postprocess": 
        function(data) {
        	return {
        		url: flatten(data[1][2]).join(''),
        		query: flatten(data[3]).join('')
        	}
        }
        },
    {"name": "query", "symbols": ["query_prompt", "query_body"]},
    {"name": "query", "symbols": ["query_body"]},
    {"name": "query_body$ebnf$1", "symbols": ["query_content"]},
    {"name": "query_body$ebnf$1", "symbols": ["query_body$ebnf$1", "query_content"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "query_body", "symbols": ["_", "l_brace", "new_line", "query_body$ebnf$1", "new_line", "r_brace"]},
    {"name": "query_content", "symbols": ["letter"]},
    {"name": "query_content", "symbols": ["space"]},
    {"name": "query_content", "symbols": ["brace"]},
    {"name": "query_content", "symbols": ["paren"]},
    {"name": "query_content", "symbols": ["new_line"]},
    {"name": "query_content", "symbols": [{"literal":"$"}]},
    {"name": "query_content", "symbols": [{"literal":":"}]},
    {"name": "query_prompt$string$1", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"e"}, {"literal":"r"}, {"literal":"y"}], "postprocess": (d) => d.join('')},
    {"name": "query_prompt$ebnf$1$subexpression$1$ebnf$1", "symbols": ["space"]},
    {"name": "query_prompt$ebnf$1$subexpression$1$ebnf$1", "symbols": ["query_prompt$ebnf$1$subexpression$1$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "query_prompt$ebnf$1$subexpression$1", "symbols": ["query_prompt$ebnf$1$subexpression$1$ebnf$1", "word"]},
    {"name": "query_prompt$ebnf$1", "symbols": ["query_prompt$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "query_prompt$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "query_prompt$ebnf$2$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":":"}, "_", "query_argument", "_"]},
    {"name": "query_prompt$ebnf$2$subexpression$1$ebnf$1", "symbols": ["query_prompt$ebnf$2$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "query_prompt$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "query_prompt$ebnf$2$subexpression$1", "symbols": ["l_paren", "_", "query_variable", "_", "query_prompt$ebnf$2$subexpression$1$ebnf$1", "r_paren"]},
    {"name": "query_prompt$ebnf$2", "symbols": ["query_prompt$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "query_prompt$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "query_prompt", "symbols": ["query_prompt$string$1", "query_prompt$ebnf$1", "_", "query_prompt$ebnf$2"]},
    {"name": "query_variable", "symbols": [{"literal":"$"}, "js_variable"]},
    {"name": "query_argument$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"="}, "_", "default_value"]},
    {"name": "query_argument$ebnf$1", "symbols": ["query_argument$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "query_argument$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "query_argument", "symbols": ["js_variable", "query_argument$ebnf$1"]},
    {"name": "default_value", "symbols": ["number"]},
    {"name": "default_value", "symbols": ["js_variable"]},
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
    {"name": "paren", "symbols": ["l_paren"]},
    {"name": "paren", "symbols": ["r_paren"]},
    {"name": "l_paren", "symbols": [{"literal":"("}]},
    {"name": "r_paren", "symbols": [{"literal":")"}]},
    {"name": "brace", "symbols": ["l_brace"]},
    {"name": "brace", "symbols": ["r_brace"]},
    {"name": "l_brace", "symbols": [{"literal":"{"}]},
    {"name": "r_brace", "symbols": [{"literal":"}"}]},
    {"name": "new_line", "symbols": [{"literal":"\n"}]},
    {"name": "empty$ebnf$1", "symbols": []},
    {"name": "empty$ebnf$1$subexpression$1", "symbols": ["space"]},
    {"name": "empty$ebnf$1$subexpression$1", "symbols": ["new_line"]},
    {"name": "empty$ebnf$1", "symbols": ["empty$ebnf$1", "empty$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "empty", "symbols": ["empty$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "space"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "space", "symbols": [{"literal":" "}]},
    {"name": "js_variable", "symbols": ["js_variable_part"]},
    {"name": "js_variable$ebnf$1$subexpression$1$subexpression$1", "symbols": [{"literal":"_"}]},
    {"name": "js_variable$ebnf$1$subexpression$1$subexpression$1", "symbols": []},
    {"name": "js_variable$ebnf$1$subexpression$1", "symbols": ["js_variable_part", "js_variable$ebnf$1$subexpression$1$subexpression$1"]},
    {"name": "js_variable$ebnf$1", "symbols": ["js_variable$ebnf$1$subexpression$1"]},
    {"name": "js_variable$ebnf$1$subexpression$2$subexpression$1", "symbols": [{"literal":"_"}]},
    {"name": "js_variable$ebnf$1$subexpression$2$subexpression$1", "symbols": []},
    {"name": "js_variable$ebnf$1$subexpression$2", "symbols": ["js_variable_part", "js_variable$ebnf$1$subexpression$2$subexpression$1"]},
    {"name": "js_variable$ebnf$1", "symbols": ["js_variable$ebnf$1", "js_variable$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "js_variable", "symbols": ["js_variable$ebnf$1"]},
    {"name": "js_variable_part$ebnf$1$subexpression$1", "symbols": ["letter"]},
    {"name": "js_variable_part$ebnf$1", "symbols": ["js_variable_part$ebnf$1$subexpression$1"]},
    {"name": "js_variable_part$ebnf$1$subexpression$2", "symbols": ["letter"]},
    {"name": "js_variable_part$ebnf$1", "symbols": ["js_variable_part$ebnf$1", "js_variable_part$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "js_variable_part$ebnf$2", "symbols": []},
    {"name": "js_variable_part$ebnf$2$subexpression$1", "symbols": ["digit"]},
    {"name": "js_variable_part$ebnf$2$subexpression$1", "symbols": ["letter"]},
    {"name": "js_variable_part$ebnf$2", "symbols": ["js_variable_part$ebnf$2", "js_variable_part$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "js_variable_part", "symbols": ["js_variable_part$ebnf$1", "js_variable_part$ebnf$2"]},
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

import { EOL } from 'os';
import { GraphqlRequest } from './models/GraphqlRequest';
import { GraphQLError } from 'graphql';
var parser = require('graphql/language/parser');

export class Parser {
    public static parse(text: String): GraphqlRequest {
        // Break text into multiple lines
        let lines: string[] = text.split(EOL);
        let idx = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '') {
                if (i === lines.length - 1) {
                    idx = i;
                    break;
                }
                if (lines[i + 1] !== '') {
                    idx = i;
                    break;
                }
            }
        }
        lines = lines.splice(idx + 1);
        if (lines.length === 0) {
            throw Error('Selected text cannot be empty');
        }

        // Get api from text
        let api;
        try {
            api = this.getApi(lines[0]);
        } catch (err) {
            throw new Error(err.message);
        }

        // Get Query from Request

        // ['{', '  hero', '}']
        
        let query;
        try {
            query = this.getQuery(lines.slice(1));
        }
    }

    private static getApi(line: string): string {
        // `line` has the format of `POST anAPI`
        // e.g. `POST https://spotify-graphql-server.herokuapp.com/graphql`
        line = line.trim();
        let firstWord = line.slice(0, 4);
        if (firstWord.toUpperCase() !== 'POST') {
            throw new Error('The first line must start with \'Post\'');
        }
        line = line.slice(5);
        line = line.trimLeft();
        if (line === '') {
            throw new Error('API must be specified');
        }
        return line;
    }

    // POST mushroom.egg
    // {
    //     k {}
    // }

    // API: mushroom.egg
    // QUERY: { k {} }
    private static getQuery(lines: string[]) : string {
        // `query` has the format of `Graphql Query`
        //  return the query from the Graphql Request
        //  TODO
        if (lines.length === 0) {
            throw new Error('Query must be specified');
        }
        // Concatenate lines
        let query = lines.join(EOL);
        // Use builtin parser to parse query
        try {
            parser.parse(query);
        } catch(err) {
            // Be  A N G E R Y (perhaps depending on error type)
            if (err instanceof GraphQLError) {
                throw err;
            } else {
                throw err;
            }
        }
        return query;
    }

    private static ValidateQuery (query: any) {
        // `query` has to be validated to ensure it is a correct query
        // `appropriate error handling should be implemented for different validation 
        //  several helpers will be needed as we validate it for diffrent secnarios
        // TODO
    }

    private static ValidateMutationQuery (query:any) {
        // `mutation` has to be validated to ensure it is a correct query
        // `appropriate eroor handling should be implemented for different validation
        //  several helpers will be needed as we validate it for different secnarios
        // TODO
    }
}

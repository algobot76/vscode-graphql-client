import { EOL } from 'os';
import { GraphqlRequest } from './models/GraphqlRequest';
import { GraphQLError } from 'graphql';
import { parse as gqlParse } from 'graphql/language';

export class Parser {
    public static parse(text: String): GraphqlRequest {


        let linesWithVariables: string[] = text.split('variables:');
        let api;
        let query;
        let variables;


        console.log("Lines before filter", linesWithVariables);

        // Break text into multiple lines
        // let lines: string[] = text.split(EOL);
        //  lines = lines.map(line => line.trim()).filter(line => line.length > 0);
        //  console.log("Lines after filter: ", lines);
        if (linesWithVariables.length === 0) {
            throw Error('Selected text cannot be empty');
        }


        if (linesWithVariables.length === 1) {
            // Get api from text
            // Break text into multiple lines
            let lines: string[] = text.split(EOL);
            lines = lines.map(line => line.trim()).filter(line => line.length > 0);
            console.log("Lines after filter: ", lines);

        try {
            api = this.getApi(lines[0]);
            } catch (err) {
                throw new Error(err.message);
            }
            // Get Query from Text       
            try {
                query = this.getQuery(lines.slice(1));
            } catch (err) {
                throw new Error(err.message);
            }
            // requires those two parameters
            return new GraphqlRequest(api, query);
            // parer has returned a good request 
        }

        if (linesWithVariables.length === 2) {
        // Get Api from Text 
           
         
        // Get Query     from Text 
        // Get Variables from Text
         
        // requires three parameters
        // parer has returned a good request 
           
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

    private static getQuery(lines: string[]): string {
        // `query` has the format of `Graphql Query`
        //  return the query from the Graphql Request
        if (lines.length === 0) {
            throw new Error('Query must be specified');
        }
        // Concatenate lines
        let query = lines.join(EOL);
        // Use builtin parser to parse query
        try {
            // build in parser for graphql 
            // it will validate the query 
            // if there is an we will catch it 
            gqlParse(query);


        } catch (err) {
            // Be  A N G E R Y (perhaps depending on error type)
            if (err instanceof GraphQLError) {
                throw err;
            } else {
                throw err;
            }
        }

        // return query as a string 
        return query;
    }

    private static getVariables(lines: string[]): string {
        // `query` has the format of `Graphql Query` and query has a variable obj
        if (lines.length === 0) {
            throw new Error('Query needs to be specified');
        }

        //  pass it into the graphql parser to see if generates any errors

        return 'a';
    }
}

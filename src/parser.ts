import { EOL } from 'os';
import { GraphqlRequest } from './models/GraphqlRequest';
import { GraphQLError } from 'graphql';
import { parse as gqlParse } from 'graphql/language';

export class Parser {
    public static parse(text: String): GraphqlRequest {
        let linesWithVariables: string[] = text.trim().split('variables:');
        let api;
        let query;
        let variables;

        // Break text into multiple lines
        if (linesWithVariables.length === 0) {
            throw Error('Selected text cannot be empty');
        }
        let lines: string[] = linesWithVariables[0].split(EOL);
        lines = lines.map(line => line.trim()).filter(line => line.length > 0);

        // Get api from text
        try {
            api = this.getApi(lines[0]);
        } catch (err) {
            throw new Error(err.message);
        }

        // Get Query from Text
        try {
            query = this.getQuery(lines);
        } catch (err) {
            throw new Error(err.message);
        }
        if (linesWithVariables.length === 2) {
            let variableLine: string[] = linesWithVariables[1].split(EOL);
            variableLine = variableLine.map(line => line.trim()).filter(line => line.length > 0);
            variables = this.getVariables(variableLine);
            return new GraphqlRequest(api, query, variables);
        }
        else {
            return new GraphqlRequest(api, query);
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
        let urlLink = line.slice(5);
        urlLink.trimLeft();

        if (urlLink === '') {
            throw new Error('API must be specified');
        }

        let EntireAPILink = line.split('\n');
        let Link = EntireAPILink[0];
        return Link;

    }

    private static getQuery(lines: string[]): string {
        // `query` has the format of `Graphql Query`
        //  return the query from the Graphql Request
        if (lines.length === 0) {
            throw new Error('Query must be specified');
        }

        // Concatenate lines
        let query = lines.join(EOL);
        let newQuery = query.split('\n');
        let returnQuery = newQuery.slice(1);
        let newReturnQuery = returnQuery.join(EOL);
        // Use builtin parser to parse query
        try {
            // build in parser for graphql
            // it will validate the query
            // if there is an we will catch it
             gqlParse(newReturnQuery);
        } catch (err) {
            // Be  A N G E R Y (perhaps depending on error type)
            if (err instanceof GraphQLError) {
                throw err;
            } else {
                throw err;
            }
        }
        // return query as a string
        return newReturnQuery;
    }

    private static getVariables(lines: string[]): string {
        // string is pre-processed
        /// all we need is
        if (lines.length === 0) {
            throw new Error('Query needs to be specified');
        }

        let variable = lines.join(EOL);
        return JSON.parse(variable);
    }
}

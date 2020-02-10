import {
    GraphqlRequest,
    HeaderObject,
    VariablesObject
} from './models/GraphqlRequest';
import { parse as gqlParse } from 'graphql/language';
import { EOL } from 'os';

export class Parser {
    public static parse(text: string): GraphqlRequest {
        if (text.trim().length === 0) {
            throw Error('Selected text cannot be empty');
        }

        let [head, query, tmpVars] = text.trim().split(EOL + EOL);

        let [api, ...tmpHeader] = head.trim().split(EOL);
        this.validateAPI(api);
        const header = this.parseHeader(tmpHeader);
        this.validateQuery(query);
        const variables = this.getVariables(tmpVars);

        return new GraphqlRequest(api, header, query, variables);
    }

    private static validateAPI(api: string): void {
        // api should start with a GET or POST request method
        // followed by a space
        let [method, url] = api.split(' ');

        if (!['GET', 'POST'].includes(method.toUpperCase())) {
            throw new Error('Invalid request method');
        }

        if (url.trim().length === 0) {
            throw new Error('No endpoint url');
        }
    }

    private static parseHeader(header: string[]): HeaderObject {
        if (header.length === 0) return {};
        let tmp = header.reduce((result: HeaderObject, current) => {
            let [key, value] = current.trim().split(':');
            if (!value) {
                throw new Error('Ivalid header');
            }
            result[key] = value.trim();
            return result;
        }, {});
        return tmp;
    }

    private static validateQuery(query: string): void {
        try {
            gqlParse(query.trim());
        } catch (err) {
            throw err;
        }
    }

    private static getVariables(tmpVars: string): VariablesObject {
        if (tmpVars.trim().length === 0) return {};
        if (!tmpVars.match(/^ *variables *:/)) {
            throw new Error('Invalid variables syntax');
        }

        tmpVars = tmpVars
            .split(':')
            .filter((v, index) => index > 0)
            .join(':');
        try {
            return JSON.parse(tmpVars.trim());
        } catch (err) {
            throw err;
        }
    }
}

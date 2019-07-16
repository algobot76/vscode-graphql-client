import { EOL } from 'os';
import { GraphqlRequest } from './models/GraphqlRequest';

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
}

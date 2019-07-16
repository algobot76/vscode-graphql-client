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
    }
}

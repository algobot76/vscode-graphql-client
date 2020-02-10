export class GraphqlRequest {
    constructor(
        public api: APIObject,
        public header: HeaderObject,
        public query: string,
        public variables: VariablesObject
    ) {}
}

export interface HeaderObject {
    [key: string]: string;
}

export interface VariablesObject {
    [key: string]: string;
}

export interface APIObject {
    method: string;
    url: string;
}

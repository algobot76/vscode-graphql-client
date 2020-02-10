export class GraphqlRequest {
    constructor(
        readonly api: string,
        readonly header: HeaderObject,
        readonly query: string,
        readonly variables: VariablesObject
    ) {}
}

export interface HeaderObject {
    [key: string]: string;
}

export interface VariablesObject {
    [key: string]: string;
}

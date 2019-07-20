export class GraphqlRequest {
    api: string;
    query: string;
    variables: any;

    constructor(api: string, query: string, variables = {}) {
        this.api = api;
        this.query = query;
        this.variables = variables;
    }
}

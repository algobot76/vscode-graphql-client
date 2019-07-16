export class GraphqlRequest {
    api: string;
    query: string;

    constructor(api: string, query: string) {
        this.api = api;
        this.query = query;
    }
}

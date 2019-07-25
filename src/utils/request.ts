import { request } from 'graphql-request';
import * as _ from 'lodash';
import { GraphqlRequest } from '../models/GraphqlRequest';
import { GraphqlResponse } from '../models/GraphqlResponse';

export const getResponse = (gplRequest: GraphqlRequest): Promise<GraphqlResponse> => {
    return new Promise((resolve, reject) => {
        const endpoint = gplRequest.api;
        const query = gplRequest.query;
        const variables = gplRequest.variables;
        (_.isEmpty(variables) ? request(endpoint, query) : request(endpoint, query, variables))
            .then(data => {
                resolve(new GraphqlResponse(data));
            })
            .catch(err => {
                reject(err);
            });
    });
};

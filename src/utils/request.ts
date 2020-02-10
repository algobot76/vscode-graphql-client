import { GraphQLClient } from 'graphql-request';
import * as _ from 'lodash';
import { GraphqlRequest } from '../models/GraphqlRequest';
import { GraphqlResponse } from '../models/GraphqlResponse';

export const getResponse = (
    gplRequest: GraphqlRequest
): Promise<GraphqlResponse> => {
    return new Promise((resolve, reject) => {
        const { api, header: headers, query, variables } = gplRequest;
        const client = new GraphQLClient(
            api.url,
            _.isEmpty(variables) ? { headers } : undefined
        );

        (_.isEmpty(variables)
            ? client.request(query)
            : client.request(query, variables)
        )
            .then(data => {
                resolve(new GraphqlResponse(data));
            })
            .catch(err => {
                reject(err);
            });
    });
};

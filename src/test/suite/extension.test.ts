import * as assert from 'assert';
import { before } from 'mocha';
import { Parser } from '../../parser';
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { assertScalarType } from 'graphql';
import { format } from 'graphql-formatter';

// import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start all tests.');
	});


	test('simple query', () => {
		let simpleQuery =
			`POST test.url
	query Hero($episode: Episode, $withFriends: Boolean!) {
    hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}`;

		let Query = `query Hero($episode: Episode, $withFriends: Boolean!) {
		hero(episode: $episode) {
		name
		friends @include(if: $withFriends) {
		  name
		}
	  }
	}`;


		let result = Parser.parse(simpleQuery);
		let resultApi = result.api;
		let resultQuery = result.query;

		let expectQuery = format(Query);
		let actualQuery = format(resultQuery);

		assert.equal('POST test.url', resultApi);
		assert.equal(expectQuery, actualQuery);
	});


	test('query with variables', () => {
		let queryWithVariables = `POST test.url
	query Hero($episode: Episode, $withFriends: Boolean!) {
	  hero(episode: $episode) {
		name
		friends @include(if: $withFriends) {
		  name
		}
	  }
	}
	variables: 
	{"episode": "JEDI","withFriends": false}`;

		let Query = `query Hero($episode: Episode, $withFriends: Boolean!) {
			hero(episode: $episode) {
			name
			friends @include(if: $withFriends) {
			  name
			}
		  }
		}`;
		let result = Parser.parse(queryWithVariables);
		let variables = `{"episode": "JEDI","withFriends": false}`;

		let expectQuery = format(Query);
		let actualQuery = format(result.query);

		assert.equal('POST test.url', result.api);

		assert.equal(expectQuery, actualQuery);
		let jsonVar = JSON.parse(variables);
		let jsonString1 = JSON.stringify(jsonVar);
		let jsonString2 = JSON.stringify(result.variables);
		assert.equal(jsonString1, jsonString2);
	});


	test('query with with nested variables obj', () => {
		let queryWithNestedVariables = `
			POST test.url
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
variables: 
{
	"ep": "JEDI",
	"review": {
	  "stars": 5,
	  "commentary": "This is a great movie!"
	}
  }`;
		let variables = `{
	"ep": "JEDI",
	"review": {
	  "stars": 5,
	  "commentary": "This is a great movie!"
	}
  }`;


		let Query = `query Hero($episode: Episode, $withFriends: Boolean!) {
	hero(episode: $episode) {
	name
	friends @include(if: $withFriends) {
	  name
	}
  }
}`;
		let result = Parser.parse(queryWithNestedVariables);
		assert.equal('POST test.url', result.api);
		let expectQuery = format (Query);
		let actualQuery = format (result.query);

		let jsonVar = JSON.parse(variables);
		let jsonString1 = JSON.stringify(jsonVar);
		let jsonString2 = JSON.stringify(result.variables);
		assert.equal(jsonString1, jsonString2);
		assert.equal (expectQuery,actualQuery);
	});


	test('simple query test', () => {
		let request = `
		POST test.url
		{
			hero {
			  name
			  # Queries can have comments!
			  friends {
				name
			  }
			}
		  }`;

		let query = `{
			hero {
			  name
			  # Queries can have comments!
			  friends {
				name
			  }
			}
		  }`;

		let result = Parser.parse (request);
		assert.equal ('POST test.url', result.api);
		
		let expectQuery = format (query);
		let actualQuery = format (result.query);

		assert.equal(expectQuery,actualQuery);
		  

	
	});
	



	test('test with arguements', () => {
	 
		let request = `
		POST test.url
		{
			human(id: "1000") {
			  name
			  height(unit: FOOT)
			}
		  }
		`;

		let query = `
		{
			human(id: "1000") {
			  name
			  height(unit: FOOT)
			}
		  }
		`;

		let result = Parser.parse (request);
		assert.equal ('POST test.url', result.api);
		
		let expectQuery = format (query);
		let actualQuery = format (result.query);

		assert.equal(expectQuery,actualQuery);


	
	});
	
	

});

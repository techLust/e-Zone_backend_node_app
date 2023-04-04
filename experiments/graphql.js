const app = require('express')();
const graphql = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql');


//Creating graphql schema
const schema = buildSchema(`
    type Query {
        hello: String,
    }
`)

//The root provides the resolver function for each API endpoints.
const root = {
    hello: () => {
        return 'Hello graphql';
    }
}

//Creating graphql server
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log('Graphql server connected')
const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query{
        hello : String,
        nodejs : Int
    }
`);


const root = {
    hello : () => 'hello world',
    nodejs : () => 20
}

const app = express();
app.use('/graphql', graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true //GUI가 생김
}));

app.listen( 4000, () =>{
    console.log("running server port 4000");
})

//http://localhost:4000/graphql?query={hello} 
// 'hello world' 응답 들어옴.
// {
//     "data" : {
//         "hello" : "hello world"
//     }
// }

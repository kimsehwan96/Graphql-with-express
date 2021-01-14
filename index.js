const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql');

const schema = buildSchema(`

    input ProductInput {
        name : String
        price : Int
        description : String
    }

    type Product {
        id : ID!
        name : String
        price : Int
        description : String
    }

    type Query{
        getProduct( id : ID! ) : Product
    }

    type Mutation{
        addProduct( input : ProductInput ) : Product
        updateProduct( id : ID!, input : ProductInput! ) : Product
        deleteProduct( id : ID! ) : String
    }
`);


//below lines are mock data
const products = [{
    id : 1,
    name : '첫번째 제품',
    price : 5000,
    description : "그래프큐엘 테스트 ㅎㅎ"
},{
    id : 2,
    name : '두번째 제품',
    price : 1000,
    description : '두번째제품 테스트에용'
}]

const root = {
    getProduct : ({id}) => products.find( product => product.id === parseInt(id)),
    addProduct : ({ input }) => {
        input.id = parseInt(products.length + 1)
        products.push(input); //들어온 데이터 id auto increment 적용해서 너어줌. 현재 mock데이터라서 그럼
        return root.getProduct({id : input.id }) //응답
    },
    updateProduct : ({id, input}) => {
        const index = products.findIndex( product => product.id === parseInt(id))
        products[index] = {
            id : parseInt(id),
            ...input
        }
        return products[index];
    },
    deleteProduct : ({id}) => {
        const index = products.findIndex( product => product.id === parseInt(id));
        products.slice(index , 1);
        return "remove success";
    }
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

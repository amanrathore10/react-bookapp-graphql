const express = require('express');
const GraphQLHTTP = require('express-graphql');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema');
app.use(cors());

mongoose.connect('mongodb://user:user1234@ds223015.mlab.com:23015/react-graphql',
    {
    // sets how many times to try reconnecting
        reconnectTries: 864000,
        // sets the delay between every retry (milliseconds)
        reconnectInterval: 1000,
        useNewUrlParser: true 
});
mongoose.connection.once('open',function(err){
console.log('Connected to database');
});
app.use('/graphql',GraphQLHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('listening to port' );
});
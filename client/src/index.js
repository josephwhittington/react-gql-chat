import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import App from "./App";

import store from "./store";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
    document.getElementById("root")
);

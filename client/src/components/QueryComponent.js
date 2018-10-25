import React, { Component } from "react";
import { Query } from "react-apollo";

import { QUERY_TOTAL_USER_COUNT } from "../gql";

class QueryComponent extends Component {
    render() {
        return (
            <div>
                <Query query={QUERY_TOTAL_USER_COUNT}>
                    {({ loading, data, error }) => {
                        var r = null;
                        if (loading) {
                            console.log("loading");
                            r = "loading";
                        } else if (data) {
                            console.log(data);
                            r = `data loaded: ${data.totalUserCount}`;
                        } else if (error) {
                            r = error;
                            console.log(error);
                        }
                        return r;
                    }}
                </Query>
                <p>Thing</p>
            </div>
        );
    }
}

export default QueryComponent;

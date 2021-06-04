import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
    useEffect(() => {
        axios
            .get("isUserAuth")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return <h2>You are not logged in!</h2>;
}

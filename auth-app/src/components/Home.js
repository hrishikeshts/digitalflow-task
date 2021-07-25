import React from "react";

export default function Home({ status, data }) {
    if (status) {
        return (
            <>
                <h2>Hello {data.name}, you are logged in!</h2>
                <h3>Your username is </h3>
                <h4>{data.username}</h4>
                <h3>Your email address is </h3>
                <h4>{data.email}</h4>
                <h3>Your postal address is </h3>
                <h4>{data.address}</h4>
                <h3>And your mobile number is </h3>
                <h4>{data.mobile}</h4>
            </>
        );
    } else {
        return <h2>Hello user, you are not logged in!</h2>;
    }
}

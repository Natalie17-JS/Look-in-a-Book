import { gql } from "@apollo/client";

export const GET_BOOKS = gql `
    query getBooks {
        getBooks {
            id
            title
            annotation
            author
            createdAt
        }
    }
`
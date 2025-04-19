import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
    query GetAllPosts{
        getAllPosts {
            id
            title
            content
            publishStatus
            category
            author {
                id
                username
            }
        }
    }
`

export const GET_POST_BY_ID = gql`
    query GetPostById($id: String!) {
    getPostById(id: $id) {
        id
        title
        content
        publishStatus
        category
        author{
            id
            username
        }
    }
    }
`
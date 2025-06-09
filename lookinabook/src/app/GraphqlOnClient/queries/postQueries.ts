import { gql } from "@apollo/client";


export const GET_ALL_POSTS = gql`
  query GetAllPosts($sortBy: PostSortOption) {
    getAllPosts(sortBy: $sortBy) {
      id
      title
      content
      publishStatus
      category
      createdAt
      author {
        id
        username
      }
      comments {
        id
        content
        author {
          id
          username
        }
      }
      likesCount
      commentsCount
      
    }
  }
`;


export const GET_AUTHOR_POSTS = gql`
    query GetAuthorPosts{
        getAuthorPosts {
            id
            title
            content
            publishStatus
            category
            author {
                id
                username
            }
                comments {
                    id
                    content
                    author {
                        id
                        username
                    }
                }
        }
    }
`

export const GET_POSTS_DRAFTS = gql`
    query GetPostDrafts{
        getPostDrafts {
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
        likesCount
        likedByCurrentUser
        commentsCount
        author{
            id
            username
        }
            comments {
                    id
                    content
                    author {
                        id
                        username
                    }
                }
    }
    }
`

export const GET_AUTHOR_POST_BY_ID = gql`
    query GetAuthorPostById($id: String!) {
    getAuthorPostById(id: $id) {
        id
        title
        content
        publishStatus
        category
        likesCount
        likedByCurrentUser
        commentsCount
        author{
            id
            username
        }
            comments {
                    id
                    content
                    author {
                        id
                        username
                    }
                }
    }
    }
`
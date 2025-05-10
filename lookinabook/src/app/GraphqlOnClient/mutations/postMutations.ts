import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation CreatePost( 
    $title: String!, 
    $content: String!, 
    $image: String,
    $category: PostCategory!,
    $publishStatus: PStatus!){
    createPost(
    title: $title,
    content: $content,
    image: $image,
    publishStatus: $publishStatus
    category: $category
    ){
        id
        title
        image
        content
        category
        publishStatus
        createdAt
    }
  }
`

export const EDIT_POST = gql`
    mutation EditPost( 
    $id: String!,
    $title: String, 
    $content: String, 
    $image: String,
    $category: PostCategory,
    $publishStatus: PStatus){
    editPost(
    id: $id,
    title: $title,
    content: $content,
    image: $image,
    publishStatus: $publishStatus
    category: $category
    ){
        id
        title
        image
        content
        category
        publishStatus
        
    }
  }
`


export const PUBLISH_POST = gql`
  mutation PublishPost($id: String!) {
    publishPost(id: $id) {
      id
      title
      image
      content
      publishStatus
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: String!){
        deletePost(id: $id){
        message
        }
    }
`
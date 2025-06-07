import { gql } from "@apollo/client";

export const LIKE = gql`
mutation Like($type: LikeType!, $bookId: Int, $postId: String) {
  like(type: $type, bookId: $bookId, postId: $postId)
}
`

export const UNLIKE = gql`
mutation Unlike($type: LikeType!, $bookId: Int, $postId: String) {
  unlike(type: $type, bookId: $bookId, postId: $postId)
}
`
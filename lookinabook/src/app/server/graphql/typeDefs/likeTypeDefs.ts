export const likeTypeDefs = `
# Enum для типа лайков
enum LikeType {
  COVER
  PLOT
  WRITING_STYLE
  POST
}

# Тип результата для summary
type LikeSummary {
  type: LikeType
  count: Int
}

type Query {
  # Кол-во лайков поста
  postLikeCount(postId: String!): Int!

  # Кол-во лайков за обложку книги
  bookCoverLikeCount(bookId: Int!): Int!

  # Кол-во лайков за сюжет книги
  bookPlotLikeCount(bookId: Int!): Int!

  # Кол-во лайков за стиль книги
  bookWritingStyleLikeCount(bookId: Int!): Int!

  # Суммарно по типам лайков книги
  bookLikeSummary(bookId: Int!): [LikeSummary!]!
}

type Mutation {
  # Поставить лайк (можно передать либо bookId, либо postId)
  like(type: LikeType!, bookId: Int, postId: String): Boolean!

  # Убрать лайк
  unlike(type: LikeType!, bookId: Int, postId: String): Boolean!
}

`
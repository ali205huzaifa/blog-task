import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!, $author_id: uuid!) {
    insert_posts_one(
      object: { title: $title, body: $body, author_id: $author_id }
    ) {
      id
      title
    }
  }
`;

import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($limit: Int!, $offset: Int!) {
    posts(limit: $limit, offset: $offset, order_by: { created_at: desc }) {
      id
      title
      body
      created_at
      author_id
    }
    posts_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: uuid!) {
    posts_by_pk(id: $id) {
      id
      title
      body
      created_at
      author_id
    }
  }
`;

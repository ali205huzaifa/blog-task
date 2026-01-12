export interface BlogPost {
  id: string;
  title: string;
  body: string;
  created_at: string;
  author: {
    email: string;
  };
}

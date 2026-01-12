# 🎉 Blog Feature - Complete Implementation

## 📖 Overview

This repository contains a fully functional Blog feature implemented in **Next.js 15.5.9** with **React 19.2.1**, using **Supabase Auth**, **PostgreSQL**, and **Apollo Client** for GraphQL data fetching.

The feature is secure, production-ready, and includes:

- Blog listing with pagination
- Blog creation (protected route)
- Individual blog details
- Authentication & MFA support
- Proper UX/UI with error handling and notifications

---

## Add .env varaibles

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_GRAPHQL_URL=

### Start the Development Server

```bash
cd /blog-task
pnpm dev
```

Server will run on: **http://localhost:3000**

### Test the Blog Feature

1. **View Blog**: Go to http://localhost:3001/blog
2. **Try Create** (not logged in): Click "Create Post" → Auto-redirect to login
3. **Create Post** (logged in):
   - Fill in title (min 3 chars)
   - Fill in content (min 10 chars)
   - Click "Publish"
   - See success toast and redirect

---

### Features Implemented

✅ **Blog List** - Paginated view of all posts  
✅ **Create Post** - Secure form with validation  
✅ **Post Detail** - Full post view with metadata  
✅ **Authentication** - Login required for creating posts  
✅ **Authorization** - Route protection via middleware  
✅ **Pagination** - 5 posts per page with navigation  
✅ **Error Handling** - Comprehensive error messages  
✅ **User Feedback** - Toast notifications  
✅ **Responsive Design** - Mobile-friendly UI  
✅ **MFA Support** - Multi-factor authentication check

### Security Implemented

✅ **Route Protection** - Middleware-based authentication  
✅ **Session Validation** - JWT verification  
✅ **MFA Check** - Multi-factor authentication support  
✅ **User Association** - Posts linked to authenticated user  
✅ **CSRF Protection** - Built-in Next.js protection  
✅ **Input Validation** - Zod schema validation

---

### Authentication Flow

```
User Access /blog/create
       ↓
Middleware checks session
       ↓
Is user authenticated?
├─ NO → Redirect to /auth/sign-in?next=/blog/create
└─ YES → Check MFA requirement
         ├─ Needs MFA → Redirect to MFA
         └─ MFA OK → Allow access
```

### Protected Routes

| Route          | Access          | Requires       |
| -------------- | --------------- | -------------- |
| `/blog`        | Public Read     | None           |
| `/blog/[id]`   | Public Read     | None           |
| `/blog/create` | Protected Write | Authentication |

---

## 🧪 Testing Scenarios

### Scenario 1: Unauthenticated User

1. Go to `/blog` (✅ Can view)
2. Click "Create Post" (✅ Redirected to login)
3. Log in (✅ Auto-redirect to create form)

### Scenario 2: Creating a Post

1. Go to `/blog/create` while logged in
2. Leave title empty (✅ Shows error)
3. Type title "Test"
4. Leave body empty (✅ Shows error)
5. Type body "This is a test post content"
6. Click "Publish" (✅ Shows loading, success toast, redirect)

### Scenario 3: Viewing Posts

1. Go to `/blog` (✅ Shows all posts)
2. Click on a post (✅ Goes to detail page)
3. Click "Back to Blog" (✅ Returns to list)

### Scenario 4: Pagination

1. If more than 5 posts exist
2. Page numbers appear at bottom (✅ Can click)
3. Posts filtered by page (✅ Shows 5 posts per page)

---

### Data Flow

```
Component
    ↓
Apollo Query/Mutation
    ↓
GraphQL API (Supabase)
    ↓
PostgreSQL Database
    ↓
Return to Component
    ↓
Render & Notify User
```

---

## 🛠️ Technology Stack

| Layer         | Technology                |
| ------------- | ------------------------- |
| Framework     | Next.js 15.5.9            |
| Runtime       | React 19.2.1              |
| GraphQL       | Apollo Client 4.0.12      |
| Auth          | Supabase (JWT)            |
| Database      | PostgreSQL (via Supabase) |
| Forms         | React Hook Form + Zod     |
| Styling       | Tailwind CSS              |
| Icons         | Lucide React              |
| Notifications | Sonner                    |
| Dates         | dayjs                     |

---

## 🚀 Deployment & Build for Production

```bash
NEXT_PUBLIC_CI=true pnpm build
```

### Pre-deployment Checklist

- [ ] Update NEXT_PUBLIC_SITE_URL to HTTPS domain
- [ ] Verify Supabase RLS policies
- [ ] Test create post flow
- [ ] Test pagination with many posts
- [ ] Verify error handling
- [ ] Load test GraphQL endpoint
- [ ] Set up monitoring

---

## 📞 Support & Troubleshooting

### Common Issues

**"No QueryClient set" error**

- ✅ Component is inside RootProviders
- Solution: Check provider wrapping

**"No Apollo Client" error**

- ✅ ApolloClientProvider is in RootProviders
- Solution: Verify root-providers.tsx includes Apollo provider

**Posts not showing**

- ✅ Check GraphQL endpoint URL
- ✅ Verify Supabase anon key
- ✅ Check database has posts
- Solution: Check browser console for API errors

**Can't create post**

- ✅ Verify you're logged in
- ✅ Check title is min 3 chars
- ✅ Check body is min 10 chars
- ✅ Check GraphQL endpoint
- Solution: Check browser console, GraphQL playground

**Redirect loop on /blog/create**

- ✅ Verify authentication is working
- ✅ Check JWT token in cookies
- Solution: Log out and log back in

---

## 📚 Additional Resources

### Documentation Files

- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Project Repository

- **Workspace**: `/blog-task`
- **Dev Server**: `http://localhost:3000`
- **Build Command**: `NEXT_PUBLIC_CI=true pnpm build`
- **Start Command**: `pnpm dev`

---

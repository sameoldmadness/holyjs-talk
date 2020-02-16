# Prisma example

## Getting started

```
npm install
npm run dev
```

## Example queries

Create user with batches

```graphql
mutation {
	createOneUser(data: {
    name: "my user 2",
    batches: {
      create: [
        {
          tasks: {
            create: [
              { isCompleted: true },
              { isCompleted: true },
            ]
          }
        }
      ]
    }
  }) {
    id
  }
}
```

Fetch users

```graphql
{
  users{
    name
    areAllTasksCompleted
  }
}
```

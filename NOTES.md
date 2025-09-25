# Prisma ORM

## Instantiation

pnpm install prisma tsx --save-dev & pnpm install @prisma/client
pnpm dlx prisma init --db --output ../src/app/generated/prisma

## Initial Migration

pnpm dlx prisma migrate dev --name init

## Schema

### Updating

pnpm dlx prisma migrate dev --name [name]

### Formatting

pnpm prisma format

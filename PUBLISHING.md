# Publishing the Sanitized Portfolio Repository

This release is intentionally separate from the recovered private repository.

## Recommended GitHub repository

`client-service-portal-demo`

## Important

Create a **new empty public repository**. Do not:

- change the original private repository to public;
- import the original repository history;
- use GitHub's fork function;
- copy the original `.git` directory;
- initialize the new repository from the old repository.

The goal is fresh Git history containing only the sanitized release.

## GitHub UI

1. Create a new repository.
2. Name it `client-service-portal-demo`.
3. Set visibility to **Public**.
4. Leave README, `.gitignore`, and license initialization unchecked because this
   release already contains all three.
5. Create the repository.

After that repository exists, the connected GitHub workflow can publish the
reviewed files into it.

## Local command-line alternative

If publishing manually from this folder:

```bash
git init
git branch -M main
git add .
git commit -m "Initial sanitized portfolio release"
git remote add origin <NEW_PUBLIC_REPOSITORY_REMOTE>
git push -u origin main
```

Never point this folder at the recovered private repository remote.

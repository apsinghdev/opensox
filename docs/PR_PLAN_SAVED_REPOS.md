# Pull Request Plan: Saved Repos Feature

## PR Title
```
feat: Saved Projects — local persistence + optional DB sync
```

## Description

This PR implements a **Saved Repos** feature that allows users to save repositories from the OSS Projects list with persistence across page reloads (localStorage) and optional cross-device sync (database backend with feature flag).

### Features
- ✅ Save/unsave repositories with star icon toggle
- ✅ Persist saved repos in localStorage
- ✅ View all saved repos in dedicated side panel
- ✅ Export/import saved repos as JSON
- ✅ Optional database sync across devices (feature flag)
- ✅ Conflict resolution for cross-device sync
- ✅ Maximum 100 saved repos per user

### Changes Summary
- **Frontend**: Zustand store, SaveToggle component, SavedProjectsPanel component
- **Backend**: Database migration, service layer, tRPC API endpoints
- **Shared**: Type definitions for SavedRepo
- **Docs**: CHANGELOG, feature documentation

---

## Commit Strategy

This PR is broken down into **10 small, logical commits** for easy review and safe deployment:

### Commit 1: Shared Types
```bash
git add packages/shared/types/savedRepos.ts
git add packages/shared/types/index.ts
git commit -m "feat(types): add SavedRepo shared types

- Create SavedRepo type definition
- Add SavedReposAction and SavedReposUpdateInput types
- Export from shared package index"
```

### Commit 2: Zustand Store
```bash
git add apps/web/src/store/useSavedProjectsStore.ts
git commit -m "feat(store): add useSavedProjectsStore with localStorage

- Create Zustand store with persist middleware
- Implement actions: add, remove, toggle, clear, setAll, isSaved
- Configure localStorage persistence with key 'oss_saved_repos_v1'
- Add duplicate prevention logic"
```

### Commit 3: SaveToggle Component
```bash
git add apps/web/src/components/dashboard/SaveToggle.tsx
git commit -m "feat(ui): add SaveToggle component

- Create star icon toggle button for each repo row
- Implement filled/outline star states
- Prevent event propagation to row click
- Add accessibility attributes (ARIA labels)"
```

### Commit 4: SavedProjectsPanel Component
```bash
git add apps/web/src/components/dashboard/SavedProjectsPanel.tsx
git commit -m "feat(ui): add SavedProjectsPanel component

- Create side panel for managing saved repos
- Implement export to JSON functionality
- Implement import from JSON functionality
- Add clear all with confirmation (3-second timeout)
- Add empty state and list view
- Include responsive design"
```

### Commit 5: Integrate into ProjectsContainer
```bash
git add apps/web/src/components/dashboard/ProjectsContainer.tsx
git commit -m "feat(ui): integrate saved repos into ProjectsContainer

- Add 'Save' column as first column in table
- Render SaveToggle component in each row
- Add 'Saved Projects' button with count badge in header
- Add SavedProjectsPanel component
- Manage panel open/close state"
```

### Commit 6: Database Migration
```bash
git add apps/api/prisma/schema.prisma
git commit -m "feat(db): add saved_repos column to User model

- Add saved_repos JSONB column with default '[]'
- Non-breaking change (additive only)
- Supports up to 100 repos per user"
```

### Commit 7: Saved Repos Service
```bash
git add apps/api/src/services/savedRepos.service.ts
git commit -m "feat(api): add saved repos service layer

- Create getSavedRepos function
- Create mergeSavedRepos with conflict resolution (newer savedAt wins)
- Create updateSavedRepos with add/remove/replace actions
- Enforce maximum 100 repos limit
- Add validation and error handling"
```

### Commit 8: tRPC API Endpoints
```bash
git add apps/api/src/routers/user.ts
git commit -m "feat(api): add saved repos tRPC endpoints

- Add getSavedRepos query (protected, feature flag)
- Add updateSavedRepos mutation (protected, feature flag)
- Implement merge logic for sync
- Add Zod validation schemas
- Feature flag: FEATURE_SAVED_REPOS_DB"
```

### Commit 9: Documentation
```bash
git add CHANGELOG.md
git add docs/SAVED_REPOS.md
git commit -m "docs: add saved repos documentation

- Create CHANGELOG entry with feature details
- Create comprehensive feature documentation
- Include usage guide, API reference, architecture
- Add troubleshooting and rollout strategy"
```

### Commit 10: Build and Final Touches
```bash
git add packages/shared/dist/*
git commit -m "build: compile shared package types

- Build shared package with TypeScript
- Generate type declarations
- Ensure frontend can import types"
```

---

## Testing Checklist

### Manual Testing
- [ ] Save repos with star icon
- [ ] Verify localStorage persistence after reload
- [ ] Open SavedProjectsPanel
- [ ] Export saved repos to JSON
- [ ] Import saved repos from JSON
- [ ] Clear all saved repos
- [ ] Test on mobile/responsive
- [ ] Test with 100 repos (limit)

### Database Sync (Feature Flag Enabled)
- [ ] Enable `FEATURE_SAVED_REPOS_DB=true`
- [ ] Run migration
- [ ] Save repos and verify in database
- [ ] Test cross-device sync
- [ ] Test conflict resolution
- [ ] Verify merge logic

### Edge Cases
- [ ] Import invalid JSON file
- [ ] Try to save more than 100 repos
- [ ] Test with empty saved repos list
- [ ] Test with no internet (localStorage only)
- [ ] Test with feature flag disabled

---

## Deployment Plan

### Phase 1: Client-Only (Week 1)
1. Deploy commits 1-5 (frontend only)
2. No database changes
3. Monitor for issues
4. Rollback: Revert frontend deployment

### Phase 2: Database Backend (Week 2)
1. Deploy commits 6-8 (backend)
2. Run migration in production
3. Keep feature flag OFF initially
4. Monitor database performance
5. Rollback: Set feature flag to false

### Phase 3: Gradual Rollout (Week 3)
1. Enable feature flag for 10% of users
2. Monitor errors and performance
3. Gradually increase to 50%, then 100%
4. Rollback: Disable feature flag

---

## Review Checklist

### Code Quality
- [ ] TypeScript types are correct
- [ ] No `any` types (except where necessary)
- [ ] Error handling is comprehensive
- [ ] Code follows existing patterns
- [ ] No console.log statements
- [ ] Proper null/undefined checks

### Performance
- [ ] LocalStorage operations are efficient
- [ ] No unnecessary re-renders
- [ ] Database queries are optimized
- [ ] JSONB column is properly indexed
- [ ] API payloads are reasonable size

### Security
- [ ] API endpoints are protected (authentication)
- [ ] Input validation with Zod schemas
- [ ] No SQL injection risks (Prisma ORM)
- [ ] No XSS risks (DOMPurify if needed)
- [ ] Feature flag prevents unauthorized access

### UX
- [ ] UI is intuitive and responsive
- [ ] Loading states are handled
- [ ] Error messages are user-friendly
- [ ] Accessibility (ARIA labels, keyboard nav)
- [ ] Mobile experience is good

### Documentation
- [ ] CHANGELOG is updated
- [ ] Feature documentation is comprehensive
- [ ] API endpoints are documented
- [ ] Environment variables are documented
- [ ] Migration steps are clear

---

## Breaking Changes

**None.** This is a purely additive feature.

---

## Migration Required

Yes, if enabling database sync:

```bash
cd apps/api
npx prisma migrate deploy
```

This adds the `saved_repos` JSONB column to the `User` table with a default value of `[]`.

---

## Environment Variables

Add to `apps/api/.env` (optional):

```bash
FEATURE_SAVED_REPOS_DB=true  # Enable database sync (default: disabled)
```

---

## Rollback Plan

### Frontend Rollback
```bash
git revert <commit-hash-of-commit-5>
git revert <commit-hash-of-commit-4>
git revert <commit-hash-of-commit-3>
git revert <commit-hash-of-commit-2>
git revert <commit-hash-of-commit-1>
```

### Backend Rollback
```bash
# Set feature flag to false
FEATURE_SAVED_REPOS_DB=false

# Or revert commits
git revert <commit-hash-of-commit-8>
git revert <commit-hash-of-commit-7>
git revert <commit-hash-of-commit-6>
```

**Note**: Database column can remain (no harm), or remove with migration:
```sql
ALTER TABLE "User" DROP COLUMN "saved_repos";
```

---

## Success Metrics

- **Adoption**: % of users who save at least 1 repo
- **Engagement**: Average number of saved repos per user
- **Retention**: % of users who return to saved repos
- **Export**: % of users who export saved repos
- **Sync**: % of users who enable database sync (if available)

---

## Post-Deployment Monitoring

### Metrics to Watch
- LocalStorage errors (quota exceeded)
- API response times (getSavedRepos, updateSavedRepos)
- Database query performance (JSONB operations)
- Error rates (import failures, sync conflicts)
- User feedback (support tickets, bug reports)

### Alerts to Set Up
- API error rate > 1%
- API response time > 500ms
- Database query time > 100ms
- LocalStorage quota errors

---

## Questions for Reviewers

1. Should we add analytics tracking for saved repos?
2. Should we add a "Recently Saved" section on dashboard?
3. Should we implement folders/tags in this PR or later?
4. Should we add a limit warning when approaching 100 repos?
5. Should we add a "Share saved repos" feature?

---

## Related Issues

- Closes #219

---

## Screenshots

> Add screenshots after manual testing:
> 1. Projects table with Save column
> 2. SavedProjectsPanel open
> 3. Export/Import functionality
> 4. Mobile responsive view

---

## Reviewers

@apsinghdev @[other-maintainers]

---

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Manual testing completed
- [ ] Ready for review

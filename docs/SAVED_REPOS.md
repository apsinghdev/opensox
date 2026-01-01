# Saved Repos Feature

## Overview

The Saved Repos feature allows users to save repositories from the OSS Projects list and persist their selections across page reloads (localStorage) and optionally across devices (database sync with feature flag).

## Features

### Client-Side (Always Available)
- ✅ Save/unsave repositories with star icon
- ✅ Persist saved repos in localStorage (`oss_saved_repos_v1`)
- ✅ View all saved repos in dedicated panel
- ✅ Export saved repos to JSON file
- ✅ Import saved repos from JSON file
- ✅ Clear all saved repos with confirmation
- ✅ Maximum 100 saved repos per user

### Server-Side (Optional - Feature Flag)
- 🔒 Sync saved repos across devices
- 🔒 Merge local and server repos with conflict resolution
- 🔒 Store saved repos in database (JSONB column)
- 🔒 Protected API endpoints (authentication required)

## Usage

### For End Users

1. **Save a Repository**
   - Navigate to `/dashboard/projects`
   - Click "Find projects" to search
   - Click the ⭐ star icon on any project to save it
   - Star turns yellow when saved

2. **View Saved Repositories**
   - Click "Saved Projects" button in header (shows count badge)
   - Side panel opens with all saved repos
   - Click on repo name to open in new tab
   - Hover over repo to see remove button

3. **Export Saved Repos**
   - Open Saved Projects panel
   - Click "Export" button
   - JSON file downloads with format: `saved-repos-YYYY-MM-DD.json`

4. **Import Saved Repos**
   - Open Saved Projects panel
   - Click "Import" button
   - Select previously exported JSON file
   - Repos are restored from file

5. **Clear All Saved Repos**
   - Open Saved Projects panel
   - Click "Clear All" button
   - Click again to confirm (3-second timeout)
   - All saved repos are removed

### For Developers

#### Environment Variables

Add to `apps/api/.env`:

```bash
# Optional: Enable database sync for saved repos
FEATURE_SAVED_REPOS_DB=true  # Default: not set (disabled)
```

#### Database Migration

If enabling database sync, run migration:

```bash
cd apps/api
npx prisma migrate dev --name add_saved_repos
npx prisma generate
```

This adds the `saved_repos` JSONB column to the `User` table.

#### API Endpoints (tRPC)

**Get Saved Repos** (Protected)
```typescript
const savedRepos = await trpc.user.getSavedRepos.query();
// Returns: SavedRepo[]
```

**Update Saved Repos** (Protected)
```typescript
// Add repos
await trpc.user.updateSavedRepos.mutate({
  action: 'add',
  repos: [
    {
      id: 'repo-123',
      name: 'awesome-project',
      url: 'https://github.com/user/awesome-project',
      language: 'TypeScript',
      popularity: 'high',
      savedAt: new Date().toISOString(),
    }
  ]
});

// Remove repos
await trpc.user.updateSavedRepos.mutate({
  action: 'remove',
  repos: [{ id: 'repo-123', ... }]
});

// Sync with merge (resolves conflicts)
await trpc.user.updateSavedRepos.mutate({
  action: 'replace',
  repos: [],
  localRepos: clientSavedRepos  // Will merge with server repos
});
```

#### Type Definitions

```typescript
import { SavedRepo, SavedReposAction } from '@opensox/shared';

type SavedRepo = {
  id: string;
  name: string;
  url: string;
  language?: string;
  popularity?: 'low' | 'medium' | 'high';
  competitionScore?: number;
  savedAt: string; // ISO timestamp
  meta?: Record<string, any>;
};

type SavedReposAction = 'add' | 'remove' | 'replace';
```

## Architecture

### Frontend
- **Store**: `apps/web/src/store/useSavedProjectsStore.ts` (Zustand + persist)
- **Components**:
  - `apps/web/src/components/dashboard/SaveToggle.tsx`
  - `apps/web/src/components/dashboard/SavedProjectsPanel.tsx`
  - `apps/web/src/components/dashboard/ProjectsContainer.tsx` (modified)

### Backend
- **Schema**: `apps/api/prisma/schema.prisma` (User.saved_repos)
- **Service**: `apps/api/src/services/savedRepos.service.ts`
- **Router**: `apps/api/src/routers/user.ts` (getSavedRepos, updateSavedRepos)

### Shared
- **Types**: `packages/shared/types/savedRepos.ts`

## Conflict Resolution

When syncing across devices, conflicts are resolved using the `savedAt` timestamp:

1. User saves repo A on Device 1 at 10:00 AM
2. User saves repo A on Device 2 at 10:05 AM (different metadata)
3. When syncing, the version from 10:05 AM wins (newer timestamp)
4. Both devices end up with the same repo A (10:05 AM version)

## Limits

- **Maximum saved repos**: 100 per user
- **LocalStorage size**: ~50KB for 100 repos (well within 5MB limit)
- **Export file size**: ~10-20KB for 100 repos

## Rollout Strategy

### Phase 1: Client-Only (Current)
- Deploy frontend with localStorage
- No database changes required
- Low risk, easy rollback
- Users can save repos locally

### Phase 2: Database Backend (Optional)
- Deploy migration (adds column)
- Deploy API endpoints (feature flag OFF)
- Monitor for issues
- No user-facing changes yet

### Phase 3: Gradual Rollout (Optional)
- Enable feature flag for 10% of users
- Monitor performance and errors
- Gradually increase to 100%
- Full cross-device sync available

## Troubleshooting

### Saved repos not persisting
- Check browser localStorage is enabled
- Check for localStorage quota errors in console
- Try export/import as backup

### Database sync not working
- Verify `FEATURE_SAVED_REPOS_DB=true` in `.env`
- Check API server restarted after env change
- Verify migration ran successfully
- Check user is authenticated

### Import fails
- Ensure JSON file is valid format
- Check file contains array of SavedRepo objects
- Verify all required fields present (id, name, url, savedAt)

## Future Enhancements

- [ ] Folders/tags for organizing saved repos
- [ ] Notes/comments on saved repos
- [ ] Share saved repos with other users
- [ ] Saved repos analytics (most saved, trending)
- [ ] Browser extension for saving from GitHub directly

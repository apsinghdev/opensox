# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added - Saved Repos Feature

#### Frontend
- **Zustand Store**: Created `useSavedProjectsStore` with localStorage persistence
  - Stores saved repositories with key `oss_saved_repos_v1`
  - Actions: `addProject`, `removeProject`, `toggleProject`, `clearAllSaved`, `setAll`, `isSaved`
  - Automatic persistence across page reloads
  
- **UI Components**:
  - `SaveToggle`: Star icon button in project rows to save/unsave repositories
  - `SavedProjectsPanel`: Side panel for managing saved repos
    - Export saved repos to JSON file
    - Import saved repos from JSON file
    - Clear all saved repos with confirmation
    - View all saved repos with metadata
  
- **Projects Table**: Added "Save" column as first column in OSS Projects table
- **Header Button**: Added "Saved Projects" button with count badge in projects page header

#### Backend
- **Database**: Added `saved_repos` JSONB column to `User` model (default: `[]`)
- **Service Layer**: Created `savedReposService` with:
  - `getSavedRepos`: Retrieve user's saved repos
  - `mergeSavedRepos`: Merge local and server repos with conflict resolution
  - `updateSavedRepos`: Update saved repos with add/remove/replace actions
  - Maximum 100 saved repos per user enforcement
  
- **API Endpoints** (tRPC):
  - `user.getSavedRepos`: Get user's saved repos (protected, feature flag: `FEATURE_SAVED_REPOS_DB`)
  - `user.updateSavedRepos`: Update saved repos with merge logic (protected, feature flag: `FEATURE_SAVED_REPOS_DB`)
  - Conflict resolution: Newer `savedAt` timestamp wins

#### Shared Types
- Created `SavedRepo` type definition in `@opensox/shared`
- Created `SavedReposAction` and `SavedReposUpdateInput` types

### Configuration
- **Feature Flag**: `FEATURE_SAVED_REPOS_DB` - Enable/disable database sync (default: disabled)
  - When disabled: Client-only mode with localStorage
  - When enabled: Full sync across devices with merge logic

### Migration
- Migration file: `add_saved_repos` - Adds `saved_repos` JSONB column to User table

---

## How to Use

### For Users
1. Navigate to `/dashboard/projects`
2. Click "Find projects" to search for repositories
3. Click the star icon on any project to save it
4. Click "Saved Projects" button to view/manage saved repos
5. Export/import saved repos as JSON for backup

### For Developers
1. **Client-only mode** (default): Works out of the box with localStorage
2. **Database sync mode**: Set `FEATURE_SAVED_REPOS_DB=true` in `apps/api/.env`
3. Run migration: `cd apps/api && npx prisma migrate dev`
4. Restart API server

### API Usage (when feature flag enabled)
```typescript
// Get saved repos
const savedRepos = await trpc.user.getSavedRepos.query();

// Add repos
await trpc.user.updateSavedRepos.mutate({
  action: 'add',
  repos: [{ id: '123', name: 'repo', url: 'https://...', savedAt: new Date().toISOString() }]
});

// Sync with merge
await trpc.user.updateSavedRepos.mutate({
  action: 'replace',
  repos: serverRepos,
  localRepos: clientRepos // Will merge and resolve conflicts
});
```

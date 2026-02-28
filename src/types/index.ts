import type {
  users,
  communities,
  announcements,
  announcementReactions,
  ruckLogs,
  ruckKudos,
  workouts,
  patches,
  memberPatches,
} from '@/db/schema'

export type User = typeof users.$inferSelect
export type Community = typeof communities.$inferSelect
export type Announcement = typeof announcements.$inferSelect
export type AnnouncementReaction = typeof announcementReactions.$inferSelect
export type RuckLog = typeof ruckLogs.$inferSelect
export type RuckKudo = typeof ruckKudos.$inferSelect
export type Workout = typeof workouts.$inferSelect
export type Patch = typeof patches.$inferSelect
export type MemberPatch = typeof memberPatches.$inferSelect

export type UserRole = 'owner' | 'member'

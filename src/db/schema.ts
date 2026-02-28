import { sqliteTable, text, integer, real, unique } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('member'),
  community_id: text('community_id'),
  onboarding_complete: integer('onboarding_complete').notNull().default(0),
  first_login_complete: integer('first_login_complete').notNull().default(0),
  created_at: text('created_at').default(sql`(current_timestamp)`),
})

export const communities = sqliteTable('communities', {
  id: text('id').primaryKey(),
  owner_id: text('owner_id').notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  tagline: text('tagline'),
  logo_url: text('logo_url'),
  banner_url: text('banner_url'),
  onboarding_complete: integer('onboarding_complete').notNull().default(0),
  shopify_product_id: text('shopify_product_id'),
  created_at: text('created_at').default(sql`(current_timestamp)`),
})

export const announcements = sqliteTable('announcements', {
  id: text('id').primaryKey(),
  community_id: text('community_id').notNull(),
  owner_id: text('owner_id').notNull(),
  body: text('body').notNull(),
  image_url: text('image_url'),
  pinned: integer('pinned').notNull().default(0),
  deleted: integer('deleted').notNull().default(0),
  created_at: text('created_at').default(sql`(current_timestamp)`),
})

export const announcementReactions = sqliteTable(
  'announcement_reactions',
  {
    id: text('id').primaryKey(),
    announcement_id: text('announcement_id').notNull(),
    user_id: text('user_id').notNull(),
    emoji: text('emoji').notNull(),
    created_at: text('created_at').notNull(),
  },
  (t) => ({
    uniqueReaction: unique('unique_announcement_reaction').on(
      t.announcement_id,
      t.user_id,
      t.emoji,
    ),
  }),
)

export const ruckLogs = sqliteTable('ruck_logs', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull(),
  community_id: text('community_id').notNull(),
  date: text('date').notNull(),
  distance_miles: real('distance_miles').notNull(),
  duration_minutes: integer('duration_minutes').notNull(),
  weight_lbs: real('weight_lbs').notNull(),
  notes: text('notes'),
  photo_url: text('photo_url'),
  created_at: text('created_at').default(sql`(current_timestamp)`),
})

export const ruckKudos = sqliteTable(
  'ruck_kudos',
  {
    id: text('id').primaryKey(),
    ruck_log_id: text('ruck_log_id').notNull(),
    user_id: text('user_id').notNull(),
    created_at: text('created_at').notNull(),
  },
  (t) => ({
    uniqueKudo: unique('unique_ruck_kudo').on(t.ruck_log_id, t.user_id),
  }),
)

export const workouts = sqliteTable('workouts', {
  id: text('id').primaryKey(),
  community_id: text('community_id').notNull(),
  content: text('content').notNull(),
  is_active: integer('is_active').notNull().default(1),
  created_at: text('created_at').notNull(),
})

export const patches = sqliteTable('patches', {
  id: text('id').primaryKey(),
  community_id: text('community_id').notNull(),
  month: integer('month').notNull(),
  year: integer('year').notNull(),
  image_url: text('image_url'),
  created_at: text('created_at').notNull(),
})

export const memberPatches = sqliteTable('member_patches', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull(),
  patch_id: text('patch_id').notNull(),
  earned_at: text('earned_at').notNull(),
})

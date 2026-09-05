import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const studySessions = pgTable('study_sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  dayKey: text('day_key').notNull(),
  durationSeconds: integer('duration_seconds').notNull().default(0),
  date: text('date').notNull(), // YYYY-MM-DD
  createdAt: timestamp('created_at').defaultNow(),
});

export const checklistItems = pgTable('checklist_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  taskKey: text('task_key').notNull(),
  completed: boolean('completed').notNull().default(false),
  completedAt: timestamp('completed_at'),
});

export const practiceSubmissions = pgTable('practice_submissions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  topicTitle: text('topic_title').notNull(),
  submissionText: text('submission_text').notNull(),
  overallScore: text('overall_score'),
  feedbackJson: text('feedback_json'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(studySessions),
  checklists: many(checklistItems),
  submissions: many(practiceSubmissions),
}));

export const studySessionsRelations = relations(studySessions, ({ one }) => ({
  user: one(users, {
    fields: [studySessions.userId],
    references: [users.id],
  }),
}));

export const checklistItemsRelations = relations(checklistItems, ({ one }) => ({
  user: one(users, {
    fields: [checklistItems.userId],
    references: [users.id],
  }),
}));

export const practiceSubmissionsRelations = relations(practiceSubmissions, ({ one }) => ({
  user: one(users, {
    fields: [practiceSubmissions.userId],
    references: [users.id],
  }),
}));

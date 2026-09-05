import { db } from './index.ts';
import { users, studySessions, checklistItems, practiceSubmissions } from './schema.ts';
import { eq, and, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, displayName?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(displayName ? { displayName } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database getOrCreateUser failed:", error);
    throw new Error("Database user synchronization failed.", { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const rows = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return rows[0] || null;
  } catch (error) {
    console.error("Database getUserByUid failed:", error);
    throw new Error("Database query failed.", { cause: error });
  }
}

export async function logStudySession(uid: string, dayKey: string, durationSeconds: number, date: string) {
  try {
    const user = await getUserByUid(uid);
    if (!user) throw new Error("User not found");

    const result = await db.insert(studySessions)
      .values({
        userId: user.id,
        dayKey,
        durationSeconds,
        date,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database logStudySession failed:", error);
    throw new Error("Database query failed.", { cause: error });
  }
}

export async function getUserStudySessions(uid: string) {
  try {
    const user = await getUserByUid(uid);
    if (!user) return [];

    return await db.select()
      .from(studySessions)
      .where(eq(studySessions.userId, user.id))
      .orderBy(desc(studySessions.createdAt));
  } catch (error) {
    console.error("Database getUserStudySessions failed:", error);
    throw new Error("Database query failed.", { cause: error });
  }
}

export async function setChecklistStatus(uid: string, taskKey: string, completed: boolean) {
  try {
    const user = await getUserByUid(uid);
    if (!user) throw new Error("User not found");

    // Check if exists
    const existing = await db.select()
      .from(checklistItems)
      .where(and(eq(checklistItems.userId, user.id), eq(checklistItems.taskKey, taskKey)))
      .limit(1);

    if (existing.length > 0) {
      const updated = await db.update(checklistItems)
        .set({
          completed,
          completedAt: completed ? new Date() : null,
        })
        .where(eq(checklistItems.id, existing[0].id))
        .returning();
      return updated[0];
    } else {
      const inserted = await db.insert(checklistItems)
        .values({
          userId: user.id,
          taskKey,
          completed,
          completedAt: completed ? new Date() : null,
        })
        .returning();
      return inserted[0];
    }
  } catch (error) {
    console.error("Database setChecklistStatus failed:", error);
    throw new Error("Database query failed.", { cause: error });
  }
}

export async function getUserChecklist(uid: string) {
  try {
    const user = await getUserByUid(uid);
    if (!user) return [];

    return await db.select()
      .from(checklistItems)
      .where(eq(checklistItems.userId, user.id));
  } catch (error) {
    console.error("Database getUserChecklist failed:", error);
    throw new Error("Database query failed.", { cause: error });
  }
}

export async function savePracticeSubmission(
  uid: string,
  topicTitle: string,
  submissionText: string,
  overallScore?: string,
  feedbackJson?: string
) {
  try {
    const user = await getUserByUid(uid);
    if (!user) throw new Error("User not found");

    const result = await db.insert(practiceSubmissions)
      .values({
        userId: user.id,
        topicTitle,
        submissionText,
        overallScore: overallScore || null,
        feedbackJson: feedbackJson || null,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database savePracticeSubmission failed:", error);
    throw new Error("Database query failed.", { cause: error });
  }
}

export async function getUserPracticeSubmissions(uid: string) {
  try {
    const user = await getUserByUid(uid);
    if (!user) return [];

    return await db.select()
      .from(practiceSubmissions)
      .where(eq(practiceSubmissions.userId, user.id))
      .orderBy(desc(practiceSubmissions.createdAt));
  } catch (error) {
    console.error("Database getUserPracticeSubmissions failed:", error);
    throw new Error("Database query failed.", { cause: error });
  }
}

# Firestore Security Specification for SEO Ustaad

## 1. Data Invariants
1. A student's data (/users/{userId}) and subcollections (/sessions, /checklist, /submissions) can only be accessed or modified by that authenticated student (`request.auth.uid == userId`).
2. Sub-collection documents must enforce relational integrity: `userId` field in the document must match the path variable `{userId}` and `request.auth.uid`.
3. Identity spoofing is strictly prohibited: users cannot set an author UID or user ID other than their own authenticated UID.
4. Input validation and size limits must be enforced on all string properties to guard against Denial of Wallet and resource exhaustion.
5. All timestamps must validate against `request.time` on writes.

## 2. The Dirty Dozen Payloads (Designed to Fail)
1. **Ghost Field User Profile**: Attempt to inject `role: "admin"` into `/users/{userId}`. (Expected: REJECTED)
2. **Identity Spoofing**: User A attempts to write a session to `/users/{userB}/sessions/{sessionId}`. (Expected: REJECTED)
3. **Mismatched UID Invariant**: User writes to `/users/{userId}/sessions/{sessionId}` where payload `userId != userId`. (Expected: REJECTED)
4. **Oversized Field Denial of Wallet**: Injecting 50KB string into `dayKey` or `taskKey`. (Expected: REJECTED)
5. **Junk ID Path Injection**: Injecting non-alphanumeric or 200+ char document IDs into `{sessionId}`. (Expected: REJECTED)
6. **Unauthenticated Read**: Attempting to read `/users/{userId}` without signing in. (Expected: REJECTED)
7. **Cross-User Listing Attack**: User A attempts to list items under `/users/{userB}/submissions`. (Expected: REJECTED)
8. **Invalid Score Injection**: Submitting an arbitrary 500-char string for `overallScore`. (Expected: REJECTED)
9. **Fake Timestamp Tampering**: Passing a client timestamp 10 years in the future instead of `request.time`. (Expected: REJECTED)
10. **Immutable Field Mutation**: Trying to change `createdAt` or `userId` in an update to a study session. (Expected: REJECTED)
11. **Type Confusion Attack**: Supplying an array or integer where a boolean `completed` flag is required. (Expected: REJECTED)
12. **Blanket Collection Scrape**: Attempting to query the root `/users` collection without user filter. (Expected: REJECTED)

import { relations, type Table, type AnyColumn } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, pgEnum, integer } from "drizzle-orm/pg-core";

const rolesEnum = pgEnum("roles", ["student", "supervisor", "admin"])
const visibilityEnum = pgEnum("visibility", ["public", "private"])
const termStatusEnum = pgEnum("term_status", ["upcoming", "active", "completed"])
const groupStatusEnum = pgEnum("group_status", ["forming", "bidding", "active", "completed"])
const milestoneStatusEnum = pgEnum("milestone_status", ["pending", "in_progress", "completed"])
const submissionStatusEnum = pgEnum("submission_status", ["pending", "in_progress", "completed"])
const bidStatusEnum = pgEnum("bid_status", ["pending", "accepted", "rejected"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: rolesEnum().default("student"),
  group_id: text("group_id").references(() => projectGroup.id, { onDelete: "set null" }),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user as unknown as Table, ({ many }) => ({
  sessions: many(session as unknown as Table),
  accounts: many(account as unknown as Table),
}));


export const sessionRelations = relations(session as unknown as Table, ({ one }) => ({
  user: one(user as unknown as Table, {
    fields: [session.userId as unknown as AnyColumn],
    references: [user.id as unknown as AnyColumn],
  }),
}));

export const accountRelations = relations(account as unknown as Table, ({ one }) => ({
  user: one(user as unknown as Table, {
    fields: [account.userId as unknown as AnyColumn],
    references: [user.id as unknown as AnyColumn],
  }),
}));

export const academicTerm = pgTable("academic_term", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  isActive: boolean("is_active").default(false).notNull(),
  status: termStatusEnum().default("upcoming").notNull(),
  max_group_size: integer("max_group_size").default(10).notNull(),
});

export const projectGroup = pgTable("project_group", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  term_id: text("term_id").references(() => academicTerm.id, { onDelete: "cascade" }),
  visibility: visibilityEnum().default("public").notNull(),
  status: groupStatusEnum().default("forming").notNull(),
  invite_code: text("invite_code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const project = pgTable("project", {
  id: text("id").primaryKey(),
  group_id: text("group_id").references(() => projectGroup.id, { onDelete: "cascade" }),
  supervisor_id: text("supervisor_id").references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  abstract: text("abstract").notNull(),
  repository_url: text("repository_url").notNull(),
  final_grade: integer("final_grade"),
});

export const projectRelations = relations(project as unknown as Table, ({ one }) => ({
  group: one(projectGroup as unknown as Table, {
    fields: [project.group_id as unknown as AnyColumn],
    references: [projectGroup.id as unknown as AnyColumn],
  }),
  supervisor: one(user as unknown as Table, {
    fields: [project.supervisor_id as unknown as AnyColumn],
    references: [user.id as unknown as AnyColumn],
  }),
}));

export const milestone = pgTable("milestone", {
  id: text("id").primaryKey(),
  project_id: text("project_id").references(() => project.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  due_date: timestamp("due_date").notNull(),
  status: milestoneStatusEnum().default("pending").notNull(),
});

export const submission = pgTable("submission", {
  id: text("id").primaryKey(),
  milestone_id: text("milestone_id").references(() => milestone.id, { onDelete: "cascade" }),
  submitted_by: text("submitted_by").references(() => user.id, { onDelete: "cascade" }),
  file_url: text("file_url").notNull(),
  version_number: integer("version_number").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  status: submissionStatusEnum().default("pending").notNull(),
});


export const submissionRelations = relations(submission as unknown as Table, ({ one }) => ({
  milestone: one(milestone as unknown as Table, {
    fields: [submission.milestone_id as unknown as AnyColumn],
    references: [milestone.id as unknown as AnyColumn],
  }),
  submitted_by: one(user as unknown as Table, {
    fields: [submission.submitted_by as unknown as AnyColumn],
    references: [user.id as unknown as AnyColumn],
  }),
}));
export const supervisorBid = pgTable("supervisor_bid", {
  id: text("id").primaryKey(),
  group_id: text("group_id")
    .notNull()
    .references(() => projectGroup.id, { onDelete: "cascade" }),
  supervisor_id: text("supervisor_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  ranking: integer("ranking").notNull(), 
  is_approved: boolean("is_approved").default(false), 
  status: bidStatusEnum().default("pending").notNull(),
  supervisor_feedback: text("supervisor_feedback"), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projectGroupRelations = relations(projectGroup as unknown as Table, ({ one, many }) => ({
  term: one(academicTerm as unknown as Table, {
    fields: [projectGroup.term_id as unknown as AnyColumn],
    references: [academicTerm.id as unknown as AnyColumn],
  }),
  members: many(user as unknown as Table),         
  bids: many(supervisorBid as unknown as Table),    
  project: one(project as unknown as Table),        
}));



export const supervisorBidRelations = relations(supervisorBid as unknown as Table, ({ one }) => ({
  group: one(projectGroup as unknown as Table, {
    fields: [supervisorBid.group_id as unknown as AnyColumn],
    references: [projectGroup.id as unknown as AnyColumn],
  }),
  supervisor: one(user as unknown as Table, {
    fields: [supervisorBid.supervisor_id as unknown as AnyColumn],
    references: [user.id as unknown as AnyColumn],
  }),
}));

from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "aravts" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(100),
    "description" TEXT,
    "user_father_id" INT,
    "responsible_user_id" INT,
    "is_draft" BOOL NOT NULL  DEFAULT True,
    "telegram_chat_link" VARCHAR(100),
    "aravt_father_id" INT REFERENCES "aravts" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "config" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "key" VARCHAR(255) NOT NULL UNIQUE,
    "value" VARCHAR(255) NOT NULL,
    "comment" VARCHAR(500)
);
CREATE TABLE IF NOT EXISTS "pending_users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "password_hash" VARCHAR(128),
    "city" VARCHAR(50),
    "date_of_birth" DATE,
    "full_name" VARCHAR(100),
    "token" VARCHAR(128) NOT NULL UNIQUE
);
CREATE TABLE IF NOT EXISTS "tasks" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(3000),
    "link" VARCHAR(1000),
    "reward" INT NOT NULL,
    "defenition_of_done" JSONB NOT NULL,
    "responsible_users" JSONB NOT NULL,
    "date_time" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "aravt_id" INT NOT NULL REFERENCES "aravts" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "username" VARCHAR(100) NOT NULL,
    "role_" VARCHAR(12) NOT NULL  DEFAULT 'User',
    "email" VARCHAR(100),
    "password_hash" VARCHAR(128),
    "city" VARCHAR(50),
    "date_of_birth" DATE,
    "full_name" VARCHAR(100),
    "is_deleted" BOOL NOT NULL  DEFAULT False,
    "is_active" BOOL NOT NULL  DEFAULT False,
    "refered_by_id" INT   DEFAULT 1,
    "able_to_create_aravt" BOOL NOT NULL  DEFAULT False,
    "able_to_create_tasks" BOOL NOT NULL  DEFAULT False,
    "is_leader_of_aravt" BOOL NOT NULL  DEFAULT False,
    "rating" INT   DEFAULT 0,
    "aravt_id" INT REFERENCES "aravts" ("id") ON DELETE CASCADE
);
COMMENT ON COLUMN "users"."role_" IS 'SuperAdmin: Super Admin\nAravtLeader: Aravt Leader\nUser: User';
CREATE TABLE IF NOT EXISTS "applications_for_membership" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "text" JSONB NOT NULL,
    "date_time" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "aravt_id" INT NOT NULL REFERENCES "aravts" ("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "log_" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "query" VARCHAR(500) NOT NULL,
    "date_time" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "action" VARCHAR(100) NOT NULL,
    "user_id" INT NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "sessions" (
    "id" UUID NOT NULL  PRIMARY KEY,
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "user_id" INT NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);
CREATE TABLE IF NOT EXISTS "subscriptions" (
    "subscribed_id" INT NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "subscriber_id" INT NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
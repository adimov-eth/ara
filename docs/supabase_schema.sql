CREATE TABLE public.aerich (
    id bigint primary key generated always as identity,
    version text NOT NULL,
    app text NOT NULL,
    content jsonb NOT NULL
) TABLESPACE pg_default;

CREATE TABLE public.applications_for_membership (
    id bigint primary key generated always as identity,
    text jsonb NOT NULL,
    date_time timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    aravt_id bigint NOT NULL,
    user_id bigint NOT NULL,
    CONSTRAINT applications_for_membership_aravt_id_fkey FOREIGN KEY (aravt_id) REFERENCES public.aravts(id) ON DELETE CASCADE,
    CONSTRAINT applications_for_membership_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.aravts (
    id bigint primary key generated always as identity,
    name text NULL,
    description text NULL,
    user_father_id bigint NULL,
    responsible_user_id bigint NULL,
    is_draft boolean NOT NULL DEFAULT true,
    telegram_chat_link text NULL,
    aravt_father_id bigint NULL,
    CONSTRAINT aravts_aravt_father_id_fkey FOREIGN KEY (aravt_father_id) REFERENCES public.aravts(id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.businesses (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    description text NULL,
    link text NULL,
    fundings jsonb NULL,
    logo text NULL,
    "Status" text NOT NULL DEFAULT 'Not Posted',
    location text NULL,
    aravt_id bigint NOT NULL,
    CONSTRAINT businesses_aravt_id_fkey FOREIGN KEY (aravt_id) REFERENCES public.aravts(id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.config (
    id bigint primary key generated always as identity,
    key text NOT NULL,
    value text NOT NULL,
    comment text NULL,
    CONSTRAINT config_key_key UNIQUE (key)
) TABLESPACE pg_default;

CREATE TABLE public.log_ (
    id bigint primary key generated always as identity,
    query text NOT NULL,
    date_time timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    action text NOT NULL,
    user_id bigint NOT NULL,
    CONSTRAINT log__user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.offers (
    id bigint primary key generated always as identity,
    name text NOT NULL,
    description text NULL,
    is_limited boolean NOT NULL DEFAULT false,
    count_left integer NULL,
    duration integer NULL,
    price integer NOT NULL DEFAULT 100,
    assets jsonb NULL,
    business_id bigint NOT NULL,
    CONSTRAINT offers_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.pending_users (
    id bigint primary key generated always as identity,
    username text NOT NULL,
    email text NULL,
    password_hash text NULL,
    city text NULL,
    date_of_birth timestamp with time zone NULL,
    full_name text NULL,
    token text NOT NULL,
    CONSTRAINT pending_users_token_key UNIQUE (token)
) TABLESPACE pg_default;

CREATE TABLE public.sessions (
    id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at timestamp with time zone NOT NULL,
    user_id bigint NOT NULL,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.subscriptions (
    subscribed_id bigint NOT NULL,
    subscriber_id bigint NOT NULL,
    CONSTRAINT subscriptions_subscribed_id_fkey FOREIGN KEY (subscribed_id) REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT subscriptions_subscriber_id_fkey FOREIGN KEY (subscriber_id) REFERENCES public.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;


CREATE TABLE public.tasks (
    id bigint primary key generated always as identity,
    title text NOT NULL,
    description text NULL,
    link text NULL,
    reward integer NOT NULL,
    defenition_of_done jsonb NOT NULL,
    responsible_users jsonb NULL,
    date_time timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    aravt_id bigint NOT NULL,
    is_global boolean NOT NULL DEFAULT false,
    is_done boolean NOT NULL DEFAULT false,
    CONSTRAINT tasks_aravt_id_fkey FOREIGN KEY (aravt_id) REFERENCES public.aravts(id) ON DELETE CASCADE
) TABLESPACE pg_default;

CREATE TABLE public.users (
    id bigint primary key generated always as identity,
    username text NOT NULL,
    role_ text NOT NULL DEFAULT


'User',
    email text NULL,
    password_hash text NULL,
    city text NULL,
    date_of_birth timestamp with time zone NULL,
    full_name text NULL,
    is_deleted boolean NOT NULL DEFAULT false,
    is_active boolean NOT NULL DEFAULT false,
    refered_by_id bigint NULL DEFAULT 1,
    able_to_create_aravt boolean NOT NULL DEFAULT false,
    able_to_create_tasks boolean NOT NULL DEFAULT false,
    is_leader_of_aravt boolean NOT NULL DEFAULT false,
    rating integer NULL DEFAULT 0,
    aravt_id bigint NULL,
    CONSTRAINT users_aravt_id_fkey FOREIGN KEY (aravt_id) REFERENCES public.aravts(id) ON DELETE CASCADE
) TABLESPACE pg_default;
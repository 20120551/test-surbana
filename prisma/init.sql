-- Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create table for Location model
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building VARCHAR NOT NULL,
  location_name VARCHAR NOT NULL,
  location_number VARCHAR NOT NULL,
  area INTEGER NOT NULL,
  parent_ids JSONB DEFAULT '[]'
);

CREATE INDEX idx_parent_ids ON locations USING GIN (parent_ids);
-- Indexes and constraints (if any)
-- Note: Additional constraints or indexes that may be implied by your Prisma schema can be added here

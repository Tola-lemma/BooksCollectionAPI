const alterUserTable = `ALTER TABLE users
  DROP CONSTRAINT users_role_check,
  ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'user', 'superadmin'))`;
  module.exports = alterUserTable
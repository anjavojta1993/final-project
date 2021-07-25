exports.up = async function up(sql) {
  await sql`
CREATE TABLE favorites (
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
			therapist_id integer REFERENCES therapists (id) ON DELETE CASCADE,
			PRIMARY KEY (user_id, therapist_id)
    )
  `;
};

// This is the description of the REVERSE
// of the change to the database

exports.down = async function down(sql) {
  await sql`
    DROP TABLE favorites
  `;
};

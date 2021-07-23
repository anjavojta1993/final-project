// This is the description of the change
// to the database

exports.up = async function up(sql) {
  await sql`
CREATE TABLE therapists_specializations(
  PRIMARY KEY (specialization_id, therapist_id),
      specialization_id integer REFERENCES specializations (id),
			therapist_id integer REFERENCES therapists (id)

    )
  `;
};

// This is the description of the REVERSE
// of the change to the database

exports.down = async function down(sql) {
  await sql`
    DROP TABLE therapists_specializations
  `;
};

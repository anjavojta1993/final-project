const specializations = [
  {
    specialization_name: 'ADHD',
  },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO specializations ${sql(
      specializations,
      'specialization_name',
      // user_id
    )}
  `;
};

exports.down = async function down(sql) {
  await sql`
      DELETE FROM
        specializations
    `;
};

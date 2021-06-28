const users = [
  {
    first_name: 'Elliott',
    last_name: 'Page',
    email: 'elliot@example.com',
    password_hash: '',
  },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO users ${sql(
      users,
      'first_name',
      'last_name',
      'email',
      'password_hash',
    )}
  `;
};

exports.down = async function down(sql) {
  await sql`
      DELETE FROM
        users
    `;
};

const therapists = [
  {
    display_name: 'Dr. Elliott Page',
    cost_per_hour: '120',
    website_url: 'https://www.test.at',
    video_url: 'https://www.test.at',
    address_street: 'Teststraße',
    address_number: '2',
    state: 'Vienna',
    zip_code: '1120',
    // user_id: figure out how to do it --> do it with email and find email in users table
  },
];

exports.up = async function up(sql) {
  // do the query here // const id = sql`
  await sql`
    INSERT INTO therapists ${sql(
      therapists,
      'display_name',
      'cost_per_hour:',
      'website_url',
      'video_url',
      'address_street',
      'address_number',
      'state',
      'zip_code',
      // user_id
    )}
  `;
};

exports.down = async function down(sql) {
  await sql`
      DELETE FROM
        therapists
    `;
};

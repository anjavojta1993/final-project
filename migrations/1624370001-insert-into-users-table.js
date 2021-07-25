const users = [
  {
    first_name: 'Christoph',
    last_name: 'Gruber',
    email: 'christoph.gruber@example.com',
    password_hash: '498D7E080BAFD06B9D64832A3091F0C302E9A3B',
  },
  {
    first_name: 'Eva',
    last_name: 'Wender',
    email: 'eva.wender@example.com',
    password_hash: '498D7E080BAFD06B9D648323091F0C302E9AE3B',
  },
  {
    first_name: 'Sophie',
    last_name: 'Hauser',
    email: 'sophie.hauser@example.com',
    password_hash: '498D7E080BAFD0B9D64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Robert',
    last_name: 'Dichtel',
    email: 'robert.dichtel@example.com',
    password_hash: '498D7E080BAFD06BD64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Lisa',
    last_name: 'Laus',
    email: 'lisa.laus@example.com',
    password_hash: '498D7E080BAFD06B9D64832A3091F0C02E9AE3B',
  },
  {
    first_name: 'Hermann',
    last_name: 'Stein',
    email: 'hermann.stein@example.com',
    password_hash: '498D7E08BAFD06B9D64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Raina',
    last_name: 'Fels',
    email: 'raina.fels@example.com',
    password_hash: '4987E080BAFD06B9D64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Konstantin',
    last_name: 'Held',
    email: 'konstantin.held@example.com',
    password_hash: '498D7E080BAFD069D64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Charlotte',
    last_name: 'Hendrik',
    email: 'charlotte.hendrik@example.com',
    password_hash: '498D7E0BAFD06B9D64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Peter',
    last_name: 'Pane',
    email: 'peter.pane@example.com',
    password_hash: '498D7E080BAFD06B64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Sandra',
    last_name: 'Huber',
    email: 'sandra.huber@example.com',
    password_hash: '498D7E080BAFD06B9D64833091F0C302E9AE3B',
  },
  {
    first_name: 'Roberto',
    last_name: 'Dicio',
    email: 'roberto.dicio@example.com',
    password_hash: '498D7E080BAFD06B9D64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Lydia',
    last_name: 'Amsel',
    email: 'lydia.amsel@example.com',
    password_hash: '498D7E080BAFD06B9D64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Max',
    last_name: 'Feuer',
    email: 'max.feuer@example.com',
    password_hash: '498D7E080BAFD06B9D64832A3091F0C302E9AE3B',
  },
  {
    first_name: 'Michelle',
    last_name: 'Orth',
    email: 'michelle.orth@example.com',
    password_hash: '498D7E080BAFD06B9D64832A3091F0C302E9AE3B',
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
  for (const user of users) {
    await sql`
DELETE FROM
	users
	WHERE
	first_name = ${user.first_name} AND
	last_name = ${user.last_name}
	`;
	}
};

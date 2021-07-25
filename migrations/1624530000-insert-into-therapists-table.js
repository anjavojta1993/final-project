const therapists = [
  {
    company_name: 'Christoph Gruber',
    cost_per_hour: '90',
    website_url: 'https://www.example.com/christophgruber',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1627054961/zo17jymaggn7chnetlfx.mp4',
    address_street: 'Liechtensteinstraße',
    address_number: '2',
    zip_code: '1090',
    region: 'Vienna',
    user_id: 1,
  },
  {
    company_name: 'Eva Wender',
    cost_per_hour: '80',
    website_url: 'https://www.example.com/evawender',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1627120845/txqohdrw0xbdfw0x7eie.mp4',
    address_street: 'Alserbachstraße',
    address_number: '10',
    zip_code: '1090',
    region: 'Vienna',
    user_id: 2,
  },
  {
    company_name: "Sophie's Mindful Zone",
    cost_per_hour: '100',
    website_url: 'https://www.example.com/sophiehauser',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1626613775/auidvtowxultgwl5p0ii.mp4',
    address_street: 'Pramergasse',
    address_number: '5',
    zip_code: '1090',
    region: 'Vienna',
    user_id: 3,
  },
  {
    company_name: 'Robert Dichtel',
    cost_per_hour: '90',
    website_url: 'https://www.example.com/robertdichtel',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1626613361/yzh5n6gytat1741wiuxr.mp4',
    address_street: 'Nußdorferstraße',
    address_number: '20',
    zip_code: '1090',
    region: 'Vienna',
    user_id: 4,
  },
  {
    company_name: 'Lisa Laus',
    cost_per_hour: '80',
    website_url: 'https://www.example.com/lisalaus',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1627120845/txqohdrw0xbdfw0x7eie.mp4',
    address_street: 'Praterstraße',
    address_number: '10',
    zip_code: '1020',
    region: 'Vienna',
    user_id: 5,
  },
  {
    company_name: 'Hermann Stein',
    cost_per_hour: '80',
    website_url: 'https://www.example.com/hermannstein',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1627054961/zo17jymaggn7chnetlfx.mp4',
    address_street: 'Nestroyplatz',
    address_number: '2',
    zip_code: '1020',
    region: 'Vienna',
    user_id: 6,
  },
  {
    company_name: 'Raina Fels',
    cost_per_hour: '100',
    website_url: 'https://www.example.com/rainafels',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1626613775/auidvtowxultgwl5p0ii.mp4',
    address_street: 'Gartenweg',
    address_number: '5',
    zip_code: '1020',
    region: 'Vienna',
    user_id: 7,
  },
  {
    company_name: 'Konstantin Held',
    cost_per_hour: '90',
    website_url: 'https://www.example.com/konstantinheld',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1626613361/yzh5n6gytat1741wiuxr.mp4',
    address_street: 'Teststraße',
    address_number: '20',
    zip_code: '1020',
    region: 'Vienna',
    user_id: 8,
  },
  {
    company_name: "Charlotte's Mind Praxis",
    cost_per_hour: '80',
    website_url: 'https://www.example.com/charlottehendrik',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1627120845/txqohdrw0xbdfw0x7eie.mp4',
    address_street: 'Feuerweg',
    address_number: '10',
    zip_code: '1020',
    region: 'Vienna',
    user_id: 9,
  },
  {
    company_name: "Peter's Bliss Therapy",
    cost_per_hour: '90',
    website_url: 'https://www.example.com/peterpane',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1627054961/zo17jymaggn7chnetlfx.mp4',
    address_street: 'Halleinweg',
    address_number: '2',
    zip_code: '1050',
    region: 'Vienna',
    user_id: 10,
  },
  {
    company_name: 'Sandra Huber',
    cost_per_hour: '100',
    website_url: 'https://www.example.com/sandrahuber',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1626613775/auidvtowxultgwl5p0ii.mp4',
    address_street: 'Himmelgasse',
    address_number: '5',
    zip_code: '1050',
    region: 'Vienna',
    user_id: 11,
  },
  {
    company_name: 'Roberto Dicio',
    cost_per_hour: '90',
    website_url: 'https://www.example.com/robertdichtel',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1626613361/yzh5n6gytat1741wiuxr.mp4',
    address_street: 'Bausteinstraße',
    address_number: '20',
    zip_code: '1050',
    region: 'Vienna',
    user_id: 12,
  },
  {
    company_name: 'Lydia Amsel',
    cost_per_hour: '80',
    website_url: 'https://www.example.com/lydiaamsel',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1627120845/txqohdrw0xbdfw0x7eie.mp4',
    address_street: 'Teeweg',
    address_number: '10',
    zip_code: '1050',
    region: 'Vienna',
    user_id: 13,
  },
  {
    company_name: 'Max Feuer',
    cost_per_hour: '90',
    website_url: 'https://www.example.com/maxfeuer',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1627054961/zo17jymaggn7chnetlfx.mp4',
    address_street: 'Feuerweg',
    address_number: '2',
    zip_code: '1050',
    region: 'Vienna',
    user_id: 14,
  },
  {
    company_name: 'Michelle Orth',
    cost_per_hour: '100',
    website_url: 'https://www.example.com/michelleorth',
    video_url:
      'https://res.cloudinary.com/finalprojectease/video/upload/v1626613775/auidvtowxultgwl5p0ii.mp4',
    address_street: 'Berggasse',
    address_number: '5',
    zip_code: '1090',
    region: 'Vienna',
    user_id: 15,
  },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO therapists ${sql(
    therapists,
    'company_name',
    'cost_per_hour ',
    'website_url',
    'video_url',
    'address_street',
    'address_number',
    'zip_code',
    'region',
    'user_id',
  )}
	`;
};

exports.down = async function down(sql) {
  for (const therapist of therapists) {
    await sql`
DELETE FROM
	therapists
  WHERE
  company_name = ${therapist.company_name} AND
  cost_per_hour = ${therapist.cost_per_hour} AND
  website_url = ${therapist.website_url} AND
  video_url = ${therapist.video_url} AND
  address_street = ${therapist.address_street} AND
  address_number = ${therapist.address_number} AND
  zip_code = ${therapist.zip_code} AND
  region = ${therapist.region} AND
  user_id = ${therapist.user_id}
  `;
  }
};

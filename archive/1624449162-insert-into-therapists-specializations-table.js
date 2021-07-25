const therapistSpecializations = [
  { specialization_id: 2, therapist_id: 1 },
  { specialization_id: 14, therapist_id: 1 },
  { specialization_id: 52, therapist_id: 1 },
  { specialization_id: 2, therapist_id: 2 },
  { specialization_id: 14, therapist_id: 2 },
  { specialization_id: 52, therapist_id: 2 },
  { specialization_id: 2, therapist_id: 3 },
  { specialization_id: 52, therapist_id: 3 },
  { specialization_id: 2, therapist_id: 4 },
  { specialization_id: 22, therapist_id: 4 },
  { specialization_id: 2, therapist_id: 5 },
  { specialization_id: 8, therapist_id: 5 },
  { specialization_id: 14, therapist_id: 5 },
  { specialization_id: 5, therapist_id: 5 },
  { specialization_id: 2, therapist_id: 6 },
  { specialization_id: 8, therapist_id: 6 },
  { specialization_id: 5, therapist_id: 7 },
  { specialization_id: 2, therapist_id: 7 },
  { specialization_id: 8, therapist_id: 7 },
  { specialization_id: 5, therapist_id: 8 },
  { specialization_id: 2, therapist_id: 8 },
  { specialization_id: 8, therapist_id: 8 },
  { specialization_id: 8, therapist_id: 9 },
  { specialization_id: 2, therapist_id: 10 },
  { specialization_id: 5, therapist_id: 10 },
  { specialization_id: 14, therapist_id: 10 },
  { specialization_id: 44, therapist_id: 11 },
  { specialization_id: 55, therapist_id: 11 },
  { specialization_id: 57, therapist_id: 11 },
  { specialization_id: 44, therapist_id: 12 },
  { specialization_id: 55, therapist_id: 12 },
  { specialization_id: 57, therapist_id: 12 },
  { specialization_id: 44, therapist_id: 13 },
  { specialization_id: 55, therapist_id: 13 },
  { specialization_id: 44, therapist_id: 14 },
  { specialization_id: 13, therapist_id: 14 },
  { specialization_id: 44, therapist_id: 15 },
  { specialization_id: 13, therapist_id: 15 },
  { specialization_id: 55, therapist_id: 15 },
  { specialization_id: 57, therapist_id: 15 },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO therapists_specializations ${sql(
      therapistSpecializations,
      'specialization_id',
      'therapist_id',
    )}
  `;
};

exports.down = async function down(sql) {
  for (const ther of therapistSpecializations) {
    await sql`
      DELETE FROM
			therapists_specializations
      WHERE
        therapist_id = ${ther.therapist_id} AND
        specialization_id = ${ther.specialization_id}
    `;
  }
};

const specializations = [
  { specialization_name: 'ADHD' },
  { specialization_name: 'Addictions' },
  { specialization_name: 'Alzheimers' },
  { specialization_name: 'Anger Management' },
  { specialization_name: 'Anxiety/Fears' },
  { specialization_name: "Autism and Asperger's" },
  { specialization_name: 'Bipolar Disorder' },
  { specialization_name: 'Body Image' },
  { specialization_name: 'Borderline Personality Disorder' },
  { specialization_name: 'Career Counseling' },
  { specialization_name: 'Child/Adolescent Issues' },
  { specialization_name: 'Chronic Pain/Illness' },
  { specialization_name: 'Codependency' },
  { specialization_name: 'Depression' },
  { specialization_name: 'Dissociative Disorders' },
  { specialization_name: 'Divorce' },
  { specialization_name: 'Domestic Abuse/Violence' },
  { specialization_name: 'Eating Disorders' },
  { specialization_name: 'Elderly Persons Disorders' },
  { specialization_name: 'Emotional Abuse' },
  { specialization_name: 'Forgiveness' },
  { specialization_name: 'Gambling' },
  { specialization_name: 'HIV/AIDS' },
  { specialization_name: 'Hypnotherapy' },
  { specialization_name: 'Impulse Control Disorders' },
  { specialization_name: 'Infertility/Adoption' },
  { specialization_name: 'Infidelity' },
  { specialization_name: 'LGBTQ+ Issues' },
  { specialization_name: 'Life Coaching' },
  { specialization_name: 'Loss/Grief' },
  { specialization_name: 'Narcissism' },
  { specialization_name: 'Medication Management Therapy' },
  { specialization_name: "Men's Issues" },
  { specialization_name: 'Obesity' },
  { specialization_name: 'OCD' },
  { specialization_name: 'Parenting' },
  { specialization_name: 'Personality Disorders' },
  { specialization_name: 'Postpartum Depression' },
  { specialization_name: 'Psychosis' },
  { specialization_name: 'Relationship/Marriage Counseling' },
  { specialization_name: 'Schizophrenia' },
  { specialization_name: 'Self Esteem' },
  { specialization_name: 'Sex Therapy' },
  { specialization_name: 'Sexual Abuse' },
  { specialization_name: 'Sleep Disorder' },
  { specialization_name: 'Social Anxiety' },
  { specialization_name: 'Social Isolation' },
  { specialization_name: 'Spiritualiy' },
  { specialization_name: 'Sports Psychology' },
  { specialization_name: 'Stopping Smoking' },
  { specialization_name: 'Stress' },
  { specialization_name: 'Substance Abuse' },
  { specialization_name: 'Suicidal Thoughts' },
  { specialization_name: 'Thinking Disorders' },
  { specialization_name: 'Trauma and PTSD' },
  { specialization_name: 'Weight Loss' },
  { specialization_name: "Women's issues" },
];

exports.up = async function up(sql) {
  await sql`
    INSERT INTO specializations ${sql(specializations, 'specialization_name')}
  `;
};

exports.down = async function down(sql) {
  await sql`
      DELETE FROM
        specializations

    `;
};

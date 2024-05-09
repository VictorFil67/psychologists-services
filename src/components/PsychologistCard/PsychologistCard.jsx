export const PsychologistCard = ({
  // about,
  avatar_url,
  // experience,
  // initial_consultation,
  // license,
  name,
  // price_per_hour,
  // rating,
  // id,
  // reviews,
  // specialization,
}) => {
  console.log(avatar_url);
  return (
    <>
      <img src={avatar_url} alt={name} />
    </>
  );
};

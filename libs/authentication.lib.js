export const getSession = async () => {
  const session = await getSession();
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return session;
};
//   );

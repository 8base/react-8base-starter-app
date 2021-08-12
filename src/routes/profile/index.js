import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY } from 'shared/graphql';

export const Profile = () => {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  return (
    <>
      <h1>Welcome Profile!</h1>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h1>{data?.user?.email}</h1>
          <ul>
            <li>ID: {data?.user?.id}</li>
            <li>
              Name: {data?.user?.firstName} {data?.user?.lastName}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getSubjectsId } from '../api/getSubjectsId';

const useUserInfo = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);
      setUserInfo(null);
      const data = await getSubjectsId(id);

      setUserInfo(data);
    } catch (err) {
      setError(err.message);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return {
    userInfo,
    loading,
    error,
  };
};

export default useUserInfo;

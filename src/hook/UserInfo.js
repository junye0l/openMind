import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubject } from '../api/Question';

const useUserInfo = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);

      setError(null);
      setUserInfo(null);
      console.log('API 호출 시작...');

      const data = await getSubject(id);

      console.log('API 호출 성공, 받은 데이터:', data);

      setUserInfo(data);
    } catch (err) {
      console.error('사용자 정보 가져오기 실패:', err.message);
      setError(err.message);
      setUserInfo(null);
    } finally {
      setLoading(false);
      console.log('API 호출 완료');
    }
  };

  useEffect(() => {
    if (id) {
      console.log(`새로운 사용자 ID로 데이터 요청: ${id}`);
      fetchUserInfo();
    }
  }, [id]);

  return {
    userInfo,
    loading,
    error,
    refetch: fetchUserInfo,
  };
};

export default useUserInfo;

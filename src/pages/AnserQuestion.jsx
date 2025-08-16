import QuestionFeedList from '../components/question/QuestionFeedList';
import Headers from '../components/question/Headers';
import FloatingButton from '../components/question/FloatingButton';
import useUserInfo from '../hook/UserInfo';

function AnswerQuestion() {
  const { userInfo, loading, error, refetch } = useUserInfo();

  if (loading) {
    return (
      <div className="loading">
        <p>사용자 정보를 불러오는 중...</p>
        {/* 여기에 스피너 컴포넌트 추가 가능 */}
      </div>
    );
  }

  // 3. 에러 발생 시 표시할 UI
  if (error) {
    return (
      <div className="error">
        <p>에러: {error}</p>
        <button onClick={refetch}>다시 시도</button>
      </div>
    );
  }

  if (!userInfo) {
    return <div>사용자 정보가 없습니다.</div>;
  }

  return (
    <div className=" bg-gs-20 flex flex-col items-center">
      <Headers userInfo={userInfo} />
      <QuestionFeedList />
      <FloatingButton />
    </div>
  );
}

export default AnswerQuestion;

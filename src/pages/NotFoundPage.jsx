import ErrorImg from '../assets/images/Error-img.svg?react';
import NotFoundButtons from '../components/NotFound/NotFoundButton';

export default function NotFoundPage() {
  return (
    <>
      <main className="flex flex-col justify-center items-center h-screen px-4 bg-gs-20 border-bn-40 overflow-hidden gap-12">
        <div className="w-full max-w-2xl h-96 flex items-center justify-center">
          <ErrorImg style={{ width: '700px', height: '600px', opacity: 1 }} />
        </div>

        <div className="flex flex-col justify-center items-center gap-6">
          <p className="text-3xl font-semibold text-gray-700 text-center">
            페이지를 찾을 수 없습니다
          </p>

          <p className="text-gray-500 text-center max-w-md text-lg">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <NotFoundButtons />
      </main>
    </>
  );
}

function SkeletonCard() {
  return (
    <>
      <section className="bg-gs-10 max-w-[684px] w-full rounded-[16px]  p-[32px] max-sm:p-[24px] mt-[20px] flex flex-col items-start gap-[32px] max-sm:gap-[24px] shadow-[0_4px_4px_rgba(140, 140, 140, 0.25)]">
        <div className="w-[76px] h-[26px] rounded-full bg-gs-30 animate-pulse" />
        <div className="flex flex-col gap-[4px]">
          <div className="w-[68px] h-[18px] bg-gs-30 animate-pulse rounded-full" />{' '}
          <div className="w-full h-[24px] bg-gs-30 animate-pulse rounded-full" />
        </div>
        <div className="flex gap-[12px] w-full">
          <div className="w-[48px] h-[48px] max-sm:w-[32px] max-sm:h-[32px] bg-gs-30 animate-pulse rounded-full" />
          <div className="flex flex-col flex-1 gap-[4px]">
            <div className="flex items-center gap-[12px] ">
              <div className="w-[100px] max-sm:w-[78px] h-[24px] max-sm:h-[18px] rounded-full bg-gs-30 animate-pulse" />
              <div className="w-[33px] h-[18px] rounded-full bg-gs-30 animate-pulse" />
            </div>
            <div className="w-full h-[21px] rounded-full bg-gs-30 animate-pulse" />
            <div className="w-full h-[21px] rounded-full bg-gs-30 animate-pulse" />
          </div>
        </div>
        <div className="border-t-gs-30 border-t-[1px] w-full pt-[24px] flex gap-[32px] animate-pulse">
          <div className="w-[77px] h-[18px] rounded-full bg-gs-30 animate-pulse" />
          <div className="w-[77px] h-[18px] rounded-full bg-gs-30 animate-pulse" />
        </div>
      </section>
    </>
  );
}

export default SkeletonCard;

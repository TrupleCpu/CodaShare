
const SkeletonDashboard = ({ count }: any) => {
  
  const defaultNumber = Array(count).fill(0);

  return (
   <>
   {defaultNumber.map((index) => (
       <div key={index} className="flex w-[100%] items-center gap-2">
       <div className="h-9 w rounded-full skeleton w-[25%]"></div>
       <div className="w-[75%] flex flex-col gap-2 items-center">
       <div className="skeleton w-[100%] h-2"></div>
       <div className="skeleton w-[100%] h-2"></div>
       </div>
     </div>
   ))}
   </>
  )
}

export default SkeletonDashboard
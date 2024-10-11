import Image from "next/image";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-slate-900" >
      <Image src="/download 2.png" alt="image" height={249} width={271} className=' absolute z-10 left-20 top-20'/>
        <Image src="/download.png" alt="image" height={230} width={138} className=' absolute z-9 top-24 left-96' />
    </div>
  )
}

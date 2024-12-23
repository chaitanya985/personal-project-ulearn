'use client'

import axios from "axios"
import { SafeUser,safeCourse } from "../types"
import Button from "../(components)/Button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"

interface CourseCardProps {
    data:safeCourse;
    currentUser:SafeUser | null
}

export default function MyCourseClient({data}:CourseCardProps) {

    const router = useRouter();
    const [isLoading,setIsLoading] = useState(false)

    const onDelete = (e:FormEvent) => {
        setIsLoading(true)
        e.preventDefault();
    
        axios.delete(`/api/course/${data.id}`)
        .then(() => {
          toast.success("Deleted successfully")
          router.refresh();
        })
        .catch((error) => {
          throw new Error(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
      }
    
  return (
    <div className="w-[300px] h-[300px">
        <div>
            <Image src={data.imageSrc} alt="Image" width={200} height={200} className="
              object-cover 
              group-hover:scale-110 
              transition
              h-[250px]
              w-[300px]
              border-[4px] border-gray-500
            "/>
        </div>


        <div  className="flex flex-col items-start gap-1 border-gray-500">
            <div className="font-light flex items-center gap-8">
                <span>{data.name}</span>
            </div>


            <div className="w-full gap-2 flex">
                <Button type='submit' label="Delete" onClick={onDelete}/>
                <Button type='button' label="Update" onClick={() => router.push(`/mycourses/${data.id}`)}/>

            </div>


        </div>

    </div>
  )
}
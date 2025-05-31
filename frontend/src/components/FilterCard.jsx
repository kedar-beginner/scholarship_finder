import React, { useEffect, useState } from 'react'
import { RadioGroup } from './ui/radio-group'
import { Label } from './ui/label'
import { RadioGroupItem } from './ui/radio-group'
import { useDispatch } from 'react-redux'
import { setsearchQuery } from '@/redux/scholarshipSlice'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'

const filterData =[ 
    {
        filterType:"Cources",
        array:["B.tech","BSC","MBA","M.tech","MBBS","B.COM","BA","PHD"]
    },
    {
        filterType:"GPA",
        array:["10-9","9-8","8-7","7-6"]
    }
    ,
    {
        filterType:"AMOUNT",
        array:["0-50 k","50 k-1 lakh","1 lakh to 1.5 lakh","1.5 lakh to 2 lakh"]
    },
]

const location=[
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar",
  "Chandigarh",
  "Dadr and Nagar Haveli ",
  "and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
]

function FilterCard() {
    const dispatch =useDispatch();
    const [selectedValue,setSelectedValue]=useState('');
    const changeHandeler =(value)=>{
            setSelectedValue(value);
    }
    useEffect(()=>{
           dispatch(setsearchQuery(selectedValue));
    },[selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded-md'> 
          <h1 className='font-bold text-lg'>Filter Scholarship</h1>
        <hr className='mt-3 py-1'/> 
        <Button onClick={()=> navigate(`/description/${scholarship?._id}`)} variant="outline" className="bg-zinc-700 hover:bg-zinc-800 text-white">For you</Button>
       
         <RadioGroup value={selectedValue} onValueChange={changeHandeler}>
            {
                filterData.map((data,index)=>(
                    <div className='font-bold text-lg'>
                        <h1>{data.filterType}</h1>{
                            data.array.map((item,idx)=>{
                                const itemId=`id${index}-${idx}`
                                    return (
                                        <div className='flex item-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId}/>
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                ))
            }
        </RadioGroup>
            <h1 className='font-bold '>Location</h1>
         {
                            // onValueChange={selectChangeHandeler}
                            location.length>0 && (
                                <Select >
                                    <SelectTrigger className="w-50%">
                                        <SelectValue placeholder={'Select A location'}/>  
                                    </SelectTrigger>
                                    <SelectContent className="z-[9999] absolute" position="popper" side="bottom"   >
                                        <SelectGroup>
                                            {
                                                location.map((city)=>{
                                                    return(
                                                        <SelectItem value={city.toLowerCase()}>
                                                        {city}
                                                    </SelectItem>
                                                )} )
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
        }
    </div>
  )
}

export default FilterCard

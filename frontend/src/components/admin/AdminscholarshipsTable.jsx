 
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminscholarshipsTable() {
    const navigate =useNavigate(); 
    const {allAdminscholarships,searchscholarshipByText} =useSelector(store=>store.scholarship)
    const [filterscholarships ,setFilterscholarship]= useState(allAdminscholarships);
    useEffect(()=>{ 
           const filteredscholarship = allAdminscholarships?.length>=0 && allAdminscholarships.filter((scholarship)=>{
                if(!searchscholarshipByText){
                    return true;
                }
               return scholarship?.title.toLowerCase().includes(searchscholarshipByText.toLowerCase()) ||scholarship?.company?.name.toLowerCase().includes(searchscholarshipByText.toLowerCase());
           });
           setFilterscholarship(filteredscholarship);
    },[allAdminscholarships,searchscholarshipByText]);

  return (
    <div>
        <Table>
            <TableCaption>A list of your recent posted Scholarship</TableCaption>
            <TableHeader>
                 <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Role</TableHead> 
                    <TableHead className="text-right">Action</TableHead>
                 </TableRow>
            </TableHeader>
            <TableBody>
                {
                    filterscholarships?.length<=0?<span>You haven't posted any scholarship yet.</span>:(
                        <>
                        {
                            filterscholarships?.map((scholarship)=>(
                                
                                    <tr> 
                                        <TableCell>
                                            {scholarship?.company?.name}
                                        </TableCell>
                                        <TableCell>
                                        {scholarship?.title}
                                        </TableCell>
                                    <TableCell className="text-right cursor-pointer"> 
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                             <PopoverContent className="w-32">
                                                {/* <div onClick={()=>navigate(`/admin/comapanies/${scholarship?._id}`)} className='flex items-cente gap-2 w-fit cursor-pointer' >
                                                    <Edit2 className='w-4'/>
                                                    <span>Edit</span>
                                                </div> */}
                                                <div onClick={()=>navigate(`/admin/scholarships/${scholarship?._id}/applicants`)} className='flex items-cente gap-2 w-fit cursor-pointer mt-2' >
                                                    <Eye/>
                                                    <span>Applicant</span>
                                                </div>
                                            </PopoverContent> 
                                        </Popover>
                                   </TableCell>
                             </tr>
                                
                            ))
                        }
                             
                        </>
                    )
                }
               
            </TableBody>
        </Table>
    </div>
  )
}

export default AdminscholarshipsTable;

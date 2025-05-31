import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
 
const shortListingStatus=["Accepted","Rejected"];

function ApplicantsTable() {
    const {applicants} =useSelector(store=>store.application);
    
  return (
    <div>
          <Table>
            <TableCaption>
                 A list of your recent applied user
            </TableCaption>
            <TableHeader>
                   <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact</TableHead> 
                      <TableHead>Date</TableHead> 
                   </TableRow> 
            </TableHeader>
             <TableBody>
                {
                       applicants && applicants?.applications?.map((item)=>(
                        <tr key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                        </tr>
                       ))
                }
                        
                </TableBody>
          </Table>
    </div>
  )
}

export default ApplicantsTable

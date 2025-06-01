import { Table, TableHead } from './ui/table'
import React, { useState } from 'react'
import { TableBody, TableCaption, TableCell, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function AppiledscholarshipTable() {
  const {allAppliedscholarships} =useSelector(store=>store.scholarship);
  const [checkedRows, setCheckedRows] = useState({}); // { [id]: true/false }

const handleCheckboxChange = (id) => (event) => {
  setCheckedRows((prev) => ({
    ...prev,
    [id]: event.target.checked,
  }));
};
  return (
    <div>
           <Table>
              <TableCaption> A list of your Applied schoarship</TableCaption>
              <TableHeader>
                   <TableRow>
                     <TableHead>Date</TableHead>
                     <TableHead>scholarship name</TableHead>
                     <TableHead>Amount</TableHead>
                     <TableHead>Received</TableHead>
                   </TableRow>
              </TableHeader>
              <TableBody>
                  {
                   allAppliedscholarships.length<=0 ?<span>You haven't Applied for any schoarship yet.</span> :allAppliedscholarships.map((appliedscholarship)=>(
                        <TableRow key={appliedscholarship._id}>
                            <TableCell>{appliedscholarship?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{appliedscholarship?.scholarship?.title}</TableCell> 
                            <TableCell>{appliedscholarship?.scholarship?.amount}</TableCell>
                           <TableCell>
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={checkedRows[appliedscholarship?._id] || false}
                                      onChange={handleCheckboxChange(appliedscholarship?._id)}
                                      className="accent-purple-600"
                                    />
                                    <span>yes</span>
                                  </label>
                          </TableCell>
                        </TableRow>
                    ))
                  }
              </TableBody>
           </Table>
    </div>
  )
}

export default AppiledscholarshipTable

import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";  
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    special_c: user?.special_c?.map((cat) => cat) || [], 
    family_i:user.family_i || "",
    GPA:user.GPA || "",
    course:user.course ||" ",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("bio", input.bio);
      formData.append("special_c", input.special_c);
      formData.append("course", input.course);
      formData.append("GPA", input.GPA);
      formData.append("family_i", input.family_i);
      
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="absolute transform -translate-x-1/2 bg-white shadow-lg z-50 sm:max-w-[425px] p-6"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <Input id="fullname" name="fullname" type="text" value={input.fullname} className="col-span-3" onChange={changeEventHandler} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-sm font-medium text-right">
                Email
              </Label>
              <Input id="email" name="email" type="email" value={input.email} className="col-span-3" disabled />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-sm font-medium text-right">
                Phone Number
              </Label>
              <Input id="phoneNumber" name="phoneNumber" type="text" value={input.phoneNumber} className="col-span-3" onChange={changeEventHandler} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-sm font-medium text-right">
                Bio
              </Label>
              <Input id="bio" name="bio" value={input.bio} className="col-span-3" onChange={changeEventHandler} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="special_c" className="text-sm font-medium text-right">
                Special category
              </Label>
              <Input id="special_c" name="special_c" value={input.special_c} className="col-span-3" onChange={changeEventHandler} />
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="family_i" className="text-sm font-medium text-right">
                Family Income
              </Label>
              <Input id="family_i" name="family_i" value={input.family_i} className="col-span-3" onChange={changeEventHandler} />
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-sm font-medium text-right">
                Course
              </Label>
              <Input id="course" name="course" value={input.course} className="col-span-3" onChange={changeEventHandler} />
            </div>

             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="GPA" className="text-sm font-medium text-right">
                   GPA
              </Label>
              <Input id="GPA" name="GPA" value={input.GPA} className="col-span-3" onChange={changeEventHandler} />
            </div>
 
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-[#6A38C2] hover:bg-[#695292]">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;

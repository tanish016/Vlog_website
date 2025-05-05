import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Globe } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

const Account = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: "",
        username: "",
        website: "www.xyz.com",
        bio: "Product designer and developer based in New York.",
        image: null,
    });

    const [form, setForm] = useState(profile);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get('/api/account', { withCredentials: true });
                setProfile(response.data);
                setForm(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAccount();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setImageFile(files[0]); // Store the selected image file
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    };

    // Function to handle image upload before submitting the form
    const handleImageUpload = async () => {
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);

            try {
                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });
                setForm({ ...form, image: response.data.imageUrl });
                alert('Image uploaded successfully');
            } catch (error) {
                console.error(error);
                alert('Failed to upload image');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageFile) {
            await handleImageUpload();
        }
        try {
            const response = await axios.put('/api/account', form, { withCredentials: true });
            setProfile(response.data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className='container w-11/12 mx-auto my-8'>
            <h1 className='text-3xl font-bold mb-6'>Account Settings</h1>

            <div className='flex items-center gap-4 mb-8'>
                <Avatar className='h-20 w-20'>
                    <AvatarImage src={form.image || profile.image} alt={form.name || profile.name} />
                    <AvatarFallback>{ profile.name}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className='text-xl font-semibold'>{form.name || profile.name}</h2>
                    <p className='text-sm text-muted-foreground'>{form.username || profile.username}</p>
                    <p className='text-muted-foreground'>{form.email || profile.email}</p>
                    <h2 className='text-muted-foreground font-bold hover:text-[#331919fc]'>Role: {form.role || profile.role}</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your profile information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <Label htmlFor="name" className='font-bold'>Full Name</Label>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <Input id="name" name="name" value={form.name} onChange={handleChange} />
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-3 mt-3">
                            <Label htmlFor="email" className='font-bold'>Email</Label>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <Input id="email" name="email" value={form.email} disabled />
                            </div>
                            <p className="text-sm text-muted-foreground cursor-default hover:font-bold">Your email cannot be changed.</p>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-3 mt-4">
                            <Label htmlFor="username" className='font-bold'>Username</Label>
                            <Input id="username" name="username" value={form.username} disabled />
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-3 mt-4">
                            <Label htmlFor="website" className='font-bold'>Website</Label>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <Input id="website" name="website" value={form.website} onChange={handleChange} />
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-3 mt-4">
                            <Label htmlFor="bio" className='font-bold'>Bio</Label>
                            <Textarea id="bio" name="bio" value={form.bio} rows={3} onChange={handleChange} />
                            <p className="text-sm text-muted-foreground">Brief description for your profile.</p>
                        </div>
                        <Separator className="my-4" />

                        <div className='mt-4'>
                            <h1 className='text-sm font-bold text-muted-foreground mb-2 underline'>Upload your Profile Picture</h1>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='w-1/4'>Upload</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Upload Profile picture</DialogTitle>
                                        <DialogDescription>
                                            Upload your profile picture here.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Input className="col-span-3" type='file' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" onClick={handleImageUpload}>Upload Image</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-evenly">
                        <Button variant="outline" type="submit">
                            Update
                        </Button>
                        <Button variant="outline" type="button" onClick={() => setForm(profile)}>
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </form>

            <Separator className="my-8" />

            <div className='flex justify-center items-center'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Change Password</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="oldpassword" className="text-right">
                                    Old:
                                </Label>
                                <Input id="oldpassword" placeholder='old password' className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="newpassword" className="text-right">
                                    New:
                                </Label>
                                <Input id="newpassword" placeholder='new password' className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Update Password</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Account;

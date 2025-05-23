import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import cn from "classnames";
import { Heart, Share2, MessageSquare } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  image: string | null;
}

interface FormState {
  title: string;
  content: string;
  image: File | null;
}

const OpenBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog>({
    _id: "",
    title: "",
    content: "",
    date: "",
    author: "",
    image: null,
  });

  const [user, setUser] = useState({
    username: "",
    role: "",
  });

  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blog/${id}`, { withCredentials: true });
      alert("Blog deleted successfully");
      navigate("/blog");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const ProfileForm = ({ className }: React.ComponentProps<"form">) => {
    const [form, setForm] = useState<FormState>({
      title: blog.title,
      content: blog.content,
      image: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(blog.image);

    useEffect(() => {
      setForm({
        title: blog.title,
        content: blog.content,
        image: null,
      });
      setImagePreview(blog.image);
    }, [blog]);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          setImageError("Image size should be less than 1MB");
          return;
        }
        setImageError(null);
        setForm((prev) => ({ ...prev, image: file }));

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        if (form.image) {
          formData.append("image", form.image);
        }

        await axios.put(`/api/blog/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        alert("Blog updated successfully!");
        setOpen(false);
        setBlog({ 
          ...blog, 
          title: form.title, 
          content: form.content, 
          image: form.image ? URL.createObjectURL(form.image) : blog.image 
        });
      } catch (error) {
        console.error("Error updating blog:", error);
        alert("Failed to update blog");
      }
    };

    return (
      <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={blog.author} disabled />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full h-39"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image">Image</Label>
          <Input type="file" id="image" name="image" onChange={handleImageChange} />
          {imageError && <p className="text-red-500">{imageError}</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <Button type="submit">Save changes</Button>
      </form>
    );
  };

  if (!blog.title) {
    return <p>Loading...</p>;
  }

  const canEditOrDelete =
    user.role === "admin" || blog.author === user.username;

  return (
    <div className="container mx-auto p-4 cursor-default">
      <Card>
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription>Author: {blog.author}</CardDescription>
        </CardHeader>
        <CardContent>
          {blog.content}
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}
        </CardContent>
        <CardFooter>{new Date(blog.date).toLocaleDateString()}</CardFooter>
        {canEditOrDelete && (
          <div className="flex justify-center space-x-9 p-4">
            <Button
              onClick={handleDelete}
              className="w-1/9 border-2 shadow-2xl shadow-black"
              variant="outline"
            >
              Delete
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit blog</DialogTitle>
                  <DialogDescription>
                    Make changes to your blog here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <ProfileForm />
              </DialogContent>
            </Dialog>
          </div>
        )}
        <div className="flex gap-6 justify-end items-center mr-4">
          <Heart />
          <MessageSquare />
          <Share2 />
        </div>
      </Card>
    </div>
  );
};

export default OpenBlog;
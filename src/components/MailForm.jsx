"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  description: yup.string().required("Description is required"),
});

const MailForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [file, setFile] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("description", data.description);
    if (file) {
      formData.append("file", file);
    }

    const response = await fetch("/api/email", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toast.success("Email sent successfully!");
      router.push("/thank-you");
    } else {
      console.log("Error sending email");
      toast.error("Error sending email. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {errors.file && (
                <Typography color="error">{errors.file.message}</Typography>
              )}
            </>
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MailForm;

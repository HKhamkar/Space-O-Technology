import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const description = formData.get("description");
    const file = formData.get("file");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email || process.env.ADMIN_EMAIL,
      subject: "New Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}`,
      attachments: file
        ? [
            {
              filename: file.name,
              content: Buffer.from(await file.arrayBuffer()),
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error sending email" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

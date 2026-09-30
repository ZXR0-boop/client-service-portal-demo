import nodemailer from "nodemailer";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function requireMailConfig() {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_TO"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing mail configuration: ${missing.join(", ")}`);
  }
}

export async function POST(request) {
  try {
    requireMailConfig();
    const body = await request.json();

    const {
      formType,
      company = "",
      contact = "",
      email = "",
      subject = "",
      requestType = "",
      details = "",
      inquiryType = "",
      message = "",
      name = "",
      rating = "",
      feedback = "",
    } = body;

    if (!["service", "general", "feedback"].includes(formType)) {
      return Response.json({ ok: false, error: "Unsupported form type." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let mailSubject = "";
    let text = "";
    let html = "";

    if (formType === "service") {
      if (!isValidEmail(email)) {
        return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
      }

      mailSubject = `Service Request - ${company || subject || "Portal Submission"}`;
      text = `New Service Request

Company: ${company}
Contact: ${contact}
Customer Email: ${email}
Request Type: ${requestType}
Subject: ${subject}

Details:
${details}`;

      html = `
        <h2>New Service Request</h2>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Customer Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Request Type:</strong> ${escapeHtml(requestType)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Details:</strong></p>
        <p>${escapeHtml(details).replace(/\n/g, "<br />")}</p>`;
    }

    if (formType === "general") {
      if (!isValidEmail(email)) {
        return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
      }

      mailSubject = `General Inquiry - ${subject || inquiryType || "Portal Submission"}`;
      text = `New General Inquiry

Company: ${company}
Contact: ${contact}
Customer Email: ${email}
Inquiry Type: ${inquiryType}
Subject: ${subject}

Message:
${message}`;

      html = `
        <h2>New General Inquiry</h2>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Customer Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Inquiry Type:</strong> ${escapeHtml(inquiryType)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`;
    }

    if (formType === "feedback") {
      mailSubject = `Portal Feedback - ${subject || "Submission"}`;
      text = `New Feedback

Name: ${name}
Company: ${company}
Rating: ${rating}
Subject: ${subject}

Feedback:
${feedback}`;

      html = `
        <h2>Customer Feedback</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Rating:</strong> ${escapeHtml(rating)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Feedback:</strong></p>
        <p>${escapeHtml(feedback).replace(/\n/g, "<br />")}</p>`;
    }

    await transporter.sendMail({
      from: `Client Portal Demo <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: mailSubject,
      text,
      html,
    });

    return Response.json({ ok: true, message: "Submission sent successfully." });
  } catch (error) {
    console.error("CONTACT API ERROR:", error?.message || error);
    return Response.json({ ok: false, error: "Failed to send submission." }, { status: 500 });
  }
}

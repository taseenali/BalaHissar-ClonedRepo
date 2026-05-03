import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { fullName, phone, enquiryType, guests, preferredDate, message } = body;

        // 1. Validation
        if (!fullName || !phone || !enquiryType) {
            return NextResponse.json(
                { error: 'Missing required fields: fullName, phone, and enquiryType are required.' },
                { status: 400 }
            );
        }

        // 2. Setup Nodemailer (Microsoft 365)
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false,
            },
        });

        // 3. Construct Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Internal notification only
            subject: `New Enquiry - Bala Hissar Website: ${enquiryType}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #C5A059; border-radius: 20px; background-color: #0B1C2C; color: #F5F5F5;">
                    <h1 style="color: #C5A059; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px; text-align: center; border-bottom: 1px solid rgba(197,160,89,0.2); padding-bottom: 20px;">
                        New Website Enquiry
                    </h1>
                    
                    <div style="margin-bottom: 25px;">
                        <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 5px;">Full Name</p>
                        <p style="font-size: 16px; margin: 0; color: #FFFFFF;">${fullName}</p>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 5px;">Phone Number</p>
                        <p style="font-size: 16px; margin: 0; color: #FFFFFF;">${phone}</p>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 5px;">Enquiry Type</p>
                        <p style="font-size: 16px; margin: 0; color: #FFFFFF;">${enquiryType}</p>
                    </div>

                    <div style="display: flex; gap: 40px; margin-bottom: 25px;">
                        <div style="flex: 1;">
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 5px;">Expected Guests</p>
                            <p style="font-size: 16px; margin: 0; color: #FFFFFF;">${guests || 'Not specified'}</p>
                        </div>
                        <div style="flex: 1;">
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 5px;">Preferred Date</p>
                            <p style="font-size: 16px; margin: 0; color: #FFFFFF;">${preferredDate || 'Not specified'}</p>
                        </div>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(197,160,89,0.1);">
                        <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 10px;">Message / Additional Details</p>
                        <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #accent; background-color: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">
                            ${message || 'No additional details provided.'}
                        </p>
                    </div>

                    <div style="margin-top: 40px; text-align: center;">
                        <p style="font-size: 12px; color: #CFCFCF; opacity: 0.5;">
                            This enquiry was submitted via the contact form on mybalahissar.co.uk
                        </p>
                    </div>
                </div>
            `,
        };

        // 4. Send Email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Enquiry sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Email API Error:', error);
        return NextResponse.json(
            { error: 'Failed to send enquiry. Please try again later.' },
            { status: 500 }
        );
    }
}

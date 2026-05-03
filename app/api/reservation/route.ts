import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function getBradfordInfo() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const getPart = (type: string) => parts.find(p => p.type === type)?.value || '0';
    
    const dateStr = `${getPart('year')}-${getPart('month').toString().padStart(2, '0')}-${getPart('day').toString().padStart(2, '0')}`;
    const hour = parseInt(getPart('hour'));
    
    return { dateStr, hour };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, date, rawDate, time, guests, termsAccepted, notes } = body;

        // 1. Validation
        if (!name || !phone || !email || !date || !rawDate || !time || !guests || !termsAccepted) {
            return NextResponse.json({ success: false, error: 'All required fields must be provided' }, { status: 400 });
        }

        const { dateStr: todayStr, hour: currentHour } = getBradfordInfo();
        const isToday = rawDate === todayStr;

        // 2. Booking Rules (Bradford UK Time)
        const isBreakfastTime = (t: string) => {
            const h = parseInt(t.split(':')[0]);
            const isAM = t.includes('AM');
            const isPM = t.includes('PM');
            if (isAM && h >= 10 && h < 12) return true;
            if (isPM && (h === 12 || h < 3)) return true; // 12 PM, 1 PM, 2 PM
            return false;
        };

        if (isToday && isBreakfastTime(time)) {
            return NextResponse.json({ success: false, error: 'Breakfast bookings must be made at least 1 day in advance.' }, { status: 400 });
        }

        if (isToday && currentHour >= 16) {
            return NextResponse.json({ success: false, error: 'Same-day dinner bookings are only available until 4:00 PM.' }, { status: 400 });
        }

        // 3. Setup Nodemailer (Microsoft 365)
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

        const bradfordTimestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });

        // 4. Internal Notification (To Restaurant)
        const restaurantMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Table Booking - Bala Hissar',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #C5A059; border-radius: 20px; background-color: #0B1C2C; color: #F5F5F5;">
                    <h1 style="color: #C5A059; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px; text-align: center; border-bottom: 1px solid rgba(197,160,89,0.2); padding-bottom: 20px;">
                        New Table Booking
                    </h1>
                    
                    <div style="grid-template-cols: 1fr 1fr; display: grid; gap: 20px; margin-bottom: 30px;">
                        <div>
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 5px;">Customer Name</p>
                            <p style="font-size: 16px; margin: 0; color: #FFFFFF;">${name}</p>
                        </div>
                        <div>
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 5px;">Phone Number</p>
                            <p style="font-size: 16px; margin: 0; color: #FFFFFF;">+${phone}</p>
                        </div>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 5px;">Email Address</p>
                        <p style="font-size: 16px; margin: 0; color: #FFFFFF;">${email}</p>
                    </div>

                    <div style="background-color: rgba(197,160,89,0.05); border: 1px solid rgba(197,160,89,0.1); border-radius: 15px; padding: 25px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 30px;">
                        <div>
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; color: #C5A059; margin-bottom: 5px;">Date</p>
                            <p style="font-size: 14px; margin: 0; color: #FFFFFF; font-weight: bold;">${date}</p>
                        </div>
                        <div>
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; color: #C5A059; margin-bottom: 5px;">Time</p>
                            <p style="font-size: 14px; margin: 0; color: #FFFFFF; font-weight: bold;">${time}</p>
                        </div>
                        <div>
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; color: #C5A059; margin-bottom: 5px;">Guests</p>
                            <p style="font-size: 14px; margin: 0; color: #FFFFFF; font-weight: bold;">${guests}</p>
                        </div>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(197,160,89,0.1);">
                        <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #C5A059; font-weight: bold; margin-bottom: 10px;">Additional Notes</p>
                        <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #CFCFCF; background-color: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">
                            ${notes || 'No notes provided.'}
                        </p>
                    </div>

                    <div style="margin-top: 30px; text-align: center; font-size: 11px; color: #CFCFCF; opacity: 0.5;">
                        <p>Legal Consent: Accepted | Timestamp: ${bradfordTimestamp}</p>
                        <p style="margin-top: 10px;">mybalahissar.co.uk Booking System</p>
                    </div>
                </div>
            `,
        };

        // 5. Customer Confirmation Email
        const customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Booking Request - Bala Hissar',
            text: `Hi ${name},

Thank you for your booking request at Bala Hissar.

Your request has been received and is currently being processed.

A member of our team will contact you shortly to confirm your booking.

We look forward to welcoming you.

Bala Hissar Restaurant`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #C5A059; border-radius: 20px; background-color: #0B1C2C; color: #F5F5F5;">
                    <div style="text-align: center; margin-bottom: 30px;">
                         <h1 style="color: #C5A059; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Bala Hissar</h1>
                         <p style="color: #accent; font-style: italic;">Heritage & Flavor</p>
                    </div>

                    <p style="font-size: 16px; line-height: 1.6; color: #FFFFFF;">Hi ${name},</p>
                    <p style="font-size: 16px; line-height: 1.6; color: #FFFFFF;">Thank you for your booking request at Bala Hissar.</p>
                    <p style="font-size: 16px; line-height: 1.6; color: #FFFFFF;">Your request has been received and is currently being processed.</p>

                    <div style="background-color: rgba(197,160,89,0.05); border: 1px solid rgba(197,160,89,0.1); border-radius: 15px; padding: 25px; margin: 30px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                        <div>
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; color: #C5A059; margin-bottom: 5px;">Date</p>
                            <p style="font-size: 13px; margin: 0; color: #FFFFFF; font-weight: bold;">${date}</p>
                        </div>
                        <div>
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; color: #C5A059; margin-bottom: 5px;">Time</p>
                            <p style="font-size: 13px; margin: 0; color: #FFFFFF; font-weight: bold;">${time}</p>
                        </div>
                        <div>
                            <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; color: #C5A059; margin-bottom: 5px;">Guests</p>
                            <p style="font-size: 13px; margin: 0; color: #FFFFFF; font-weight: bold;">${guests}</p>
                        </div>
                    </div>

                    <p style="font-size: 16px; line-height: 1.6; color: #FFFFFF;">A member of our team will contact you shortly to confirm your booking.</p>
                    
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(197,160,89,0.2); text-align: center;">
                        <p style="font-size: 16px; line-height: 1.6; color: #FFFFFF; font-weight: bold;">We look forward to welcoming you.</p>
                        <p style="font-size: 14px; line-height: 1.6; color: #C5A059; margin-top: 10px;">Bala Hissar Restaurant</p>
                    </div>
                </div>
            `,
        };

        // 6. Send both emails
        await Promise.all([
            transporter.sendMail(restaurantMailOptions),
            transporter.sendMail(customerMailOptions)
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Reservation Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to process reservation. Please try again.' }, { status: 500 });
    }
}

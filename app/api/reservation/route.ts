import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, date, time, guests, notes } = body;

        // Ensure variables are present
        if (!name || !phone || !date || !time || !guests) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const message = `
📅 New Reservation – Bala Hissar

👤 Name: ${name}
📞 Phone: +${phone}
${email ? `📧 Email: ${email}` : ""}

🗓 Date: ${date}
⏰ Time: ${time}
👥 Guests: ${guests}

📝 Notes: ${notes || "None"}
`;

        const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
        const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

        if (!accessToken || !phoneId) {
            console.error('WhatsApp API credentials missing.');
            return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
        }

        const response = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: '441274780951', // The Bala Hissar restaurant number
                type: 'text',
                text: {
                    body: message.trim()
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('WhatsApp API Error:', data);
            return NextResponse.json({ success: false, error: data.error?.message || 'Failed to send WhatsApp message' }, { status: response.status });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Reservation Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

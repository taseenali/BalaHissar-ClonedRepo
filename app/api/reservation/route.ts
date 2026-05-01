import { NextResponse } from 'next/server';

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
        const { name, phone, email, date, rawDate, time, guests, termsAccepted } = body;

        // Ensure variables are present
        if (!name || !phone || !date || !rawDate || !time || !guests || !termsAccepted) {
            return NextResponse.json({ success: false, error: 'Consent to Privacy Policy and Terms is required' }, { status: 400 });
        }

        const { dateStr: todayStr, hour: currentHour } = getBradfordInfo();
        const isToday = rawDate === todayStr;

        // 1. Breakfast Rule: NEVER same day
        const isBreakfastTime = (t: string) => {
            const h = parseInt(t.split(':')[0]);
            const isAM = t.includes('AM');
            const isPM = t.includes('PM');
            // Breakfast is roughly 10 AM to 2 PM (14:00)
            if (isAM && h >= 10 && h < 12) return true;
            if (isPM && (h === 12 || h < 3)) return true; // 12 PM, 1 PM, 2 PM
            return false;
        };

        if (isToday && isBreakfastTime(time)) {
            return NextResponse.json({ success: false, error: 'Breakfast bookings must be made at least 1 day in advance.' }, { status: 400 });
        }

        // 2. Dinner Rule: Same day only before 4 PM
        if (isToday && currentHour >= 16) {
            return NextResponse.json({ success: false, error: 'Same-day dinner bookings are only available until 4:00 PM.' }, { status: 400 });
        }

        const message = `
📅 New Reservation – Bala Hissar

👤 Name: ${name}
📞 Phone: +${phone}
${email ? `📧 Email: ${email}` : ""}

🗓 Date: ${date}
⏰ Time: ${time}
👥 Guests: ${guests}

✅ Legal Consent: Accepted
⌚ Consent Time: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
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

import { getCurrentUser } from '@/lib/session';
import { NextResponse } from 'next/server';

    interface EmailUser {
      emails: {
        username: string;
        email: string;
      }[];
      subject: string;
      body: string;
    }

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin' && user.role !== 'moderator') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {    
    const userEmails: EmailUser[] = await request.json();
    console.log('emails -', userEmails);   

    // Make POST request to email worker service
    const response = await fetch(`${process.env.EMAIL_WORKER_URL}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userEmails),
    });

    if (!response.ok) {
      throw new Error(`Email worker responded with status: ${response.status}`);
    }

    const jobs = await response.json();

    return NextResponse.json({
      message: jobs.message,
      jobsAdded: jobs.jobsAdded,
    });
  } catch (error) {
    console.error('Error queueing emails:', error);
    return NextResponse.json(
      { error: 'Failed to queue emails' },
      { status: 500 }
    );
  }
}


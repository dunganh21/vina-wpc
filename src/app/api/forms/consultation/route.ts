import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, product, phone, message } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Get environment variables
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const sheetName = process.env.GOOGLE_SHEETS_CONSULTATION_SHEET_NAME || 'Consultation';
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!spreadsheetId || !credentialsPath) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 500 }
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data for Google Sheets
    const timestamp = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });

    const values = [
      [
        timestamp,
        name,
        product || '',
        phone,
        message || '',
        'Consultation'
      ]
    ];

    // Append data to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:F`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return NextResponse.json(
      { message: 'Consultation request submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error submitting consultation request:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation request' },
      { status: 500 }
    );
  }
}
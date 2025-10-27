import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message, cartItems, totalPrice } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    // Get environment variables
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const sheetName = 'Mua hàng';

    // Only write to Google Sheets if environment variables are configured
    if (spreadsheetId && credentialsPath) {
      try {
        // Initialize Google Sheets API
        const auth = new google.auth.GoogleAuth({
          keyFile: credentialsPath,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // Prepare cart items summary with readable format
        const cartItemsDetails =
          cartItems
            .map(
              (
                item: { title: string; quantity: number; price: string },
                index: number
              ) => `${index + 1}. ${item.title} (x${item.quantity})`
            )
            .join('\n') + `\n\nTổng: ${totalPrice.toLocaleString('vi-VN')}đ`;

        // Prepare data for Google Sheets
        const timestamp = new Date().toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh',
        });

        const values = [
          [timestamp, name, phone, message || '', cartItemsDetails, 'Purchase'],
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
      } catch (sheetError) {
        // Log error but don't fail the request - still show success to user
        console.error('Error writing to Google Sheets:', sheetError);
      }
    } else {
      // Log that submission was successful but not saved to sheets
      console.log('Purchase order received (sheets not configured):', {
        name,
        phone,
        message,
        itemCount: cartItems.length,
        totalPrice,
      });
    }

    return NextResponse.json(
      { message: 'Purchase order submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting purchase order:', error);
    return NextResponse.json(
      { error: 'Failed to submit purchase order' },
      { status: 500 }
    );
  }
}

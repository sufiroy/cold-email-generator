/**
 * Email history and storage utilities
 */

export interface EmailRecord {
  id: string;
  createdAt: Date;
  senderName: string;
  prospectName: string;
  prospectCompany: string;
  emails: {
    short: string;
    medium: string;
    professional: string;
  };
  copied?: {
    short?: Date;
    medium?: Date;
    professional?: Date;
  };
}

/**
 * Get all email records from Supabase
 * This should be called from the client or server
 */
export async function getEmailHistory(userId: string): Promise<EmailRecord[]> {
  try {
    const response = await fetch(`/api/emails/history?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch email history');
    }
    const data = await response.json();
    return data.emails || [];
  } catch (error) {
    console.error('Error fetching email history:', error);
    return [];
  }
}

/**
 * Save email record to Supabase
 */
export async function saveEmailRecord(
  userId: string,
  record: Omit<EmailRecord, 'id' | 'createdAt'>
): Promise<EmailRecord | null> {
  try {
    const response = await fetch('/api/emails/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...record,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save email record');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving email record:', error);
    return null;
  }
}

/**
 * Delete an email record
 */
export async function deleteEmailRecord(recordId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/emails/${recordId}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting email record:', error);
    return false;
  }
}
// backend/src/services/email.service.ts

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private apiKey: string;
  private fromEmail: string;
  private fromName: string;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || '';
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@careerwave.com';
    this.fromName = process.env.EMAIL_FROM_NAME || 'CareerWave';
  }

  /**
   * Send an email using SendGrid API
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.apiKey) {
      console.warn('⚠️ SendGrid API key not configured. Email not sent.');
      console.log('📧 Would send email to:', options.to);
      console.log('📝 Subject:', options.subject);
      return false;
    }

    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: options.to }],
              subject: options.subject,
            },
          ],
          from: {
            email: this.fromEmail,
            name: this.fromName,
          },
          content: [
            {
              type: 'text/html',
              value: options.html,
            },
          ],
        }),
      });

      if (response.ok) {
        console.log('✅ Email sent successfully to:', options.to);
        return true;
      } else {
        const error = await response.text();
        console.error('❌ Failed to send email:', error);
        return false;
      }
    } catch (error) {
      console.error('❌ Email service error:', error);
      return false;
    }
  }

  /**
   * Send welcome email to new user
   */
  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Willkommen bei CareerWave!</h1>
            </div>
            <div class="content">
              <p>Hallo ${name},</p>
              <p>Vielen Dank für Ihre Registrierung bei CareerWave! Wir freuen uns, Sie in unserer Community begrüßen zu dürfen.</p>
              <p>Bei CareerWave können Sie:</p>
              <ul>
                <li>✅ Tausende aktuelle Stellenangebote durchsuchen</li>
                <li>✅ Sich mit einem Klick auf passende Jobs bewerben</li>
                <li>✅ Ihr Profil verwalten und optimieren</li>
                <li>✅ Benachrichtigungen über neue Jobs erhalten</li>
              </ul>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="button">Zum Dashboard</a>
              </p>
              <p>Viel Erfolg bei Ihrer Jobsuche!</p>
              <p>Ihr CareerWave Team</p>
            </div>
            <div class="footer">
              <p>© 2026 CareerWave. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Willkommen bei CareerWave! 🎉',
      html,
    });
  }

  /**
   * Send application confirmation to candidate
   */
  async sendApplicationConfirmation(
    candidateEmail: string,
    candidateName: string,
    jobTitle: string,
    companyName: string
  ): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .job-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Bewerbung eingegangen!</h1>
            </div>
            <div class="content">
              <p>Hallo ${candidateName},</p>
              <p>Ihre Bewerbung wurde erfolgreich eingereicht!</p>
              <div class="job-details">
                <h3>📋 Bewerbungsdetails</h3>
                <p><strong>Position:</strong> ${jobTitle}</p>
                <p><strong>Unternehmen:</strong> ${companyName}</p>
                <p><strong>Status:</strong> Eingegangen</p>
              </p>
              <p>Der Arbeitgeber wird Ihre Bewerbung prüfen und sich bei Interesse bei Ihnen melden.</p>
              <p>Sie können den Status Ihrer Bewerbungen jederzeit in Ihrem Dashboard einsehen.</p>
              <p>Viel Erfolg!</p>
              <p>Ihr CareerWave Team</p>
            </div>
            <div class="footer">
              <p>© 2026 CareerWave. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: candidateEmail,
      subject: `Bewerbung eingegangen: ${jobTitle}`,
      html,
    });
  }

  /**
   * Send new application notification to employer
   */
  async sendNewApplicationNotification(
    employerEmail: string,
    employerName: string,
    candidateName: string,
    jobTitle: string
  ): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .candidate-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📨 Neue Bewerbung eingegangen!</h1>
            </div>
            <div class="content">
              <p>Hallo ${employerName},</p>
              <p>Sie haben eine neue Bewerbung für Ihre Stellenanzeige erhalten!</p>
              <div class="candidate-info">
                <h3>👤 Kandidat</h3>
                <p><strong>Name:</strong> ${candidateName}</p>
                <p><strong>Position:</strong> ${jobTitle}</p>
              </div>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/employer/applications" class="button">Bewerbung ansehen</a>
              </p>
              <p>Ihr CareerWave Team</p>
            </div>
            <div class="footer">
              <p>© 2026 CareerWave. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: employerEmail,
      subject: `Neue Bewerbung: ${jobTitle}`,
      html,
    });
  }

  /**
   * Send application status update to candidate
   */
  async sendApplicationStatusUpdate(
    candidateEmail: string,
    candidateName: string,
    jobTitle: string,
    status: 'reviewing' | 'accepted' | 'rejected'
  ): Promise<boolean> {
    const statusMessages = {
      reviewing: {
        emoji: '🔍',
        title: 'Bewerbung wird geprüft',
        message: 'Ihre Bewerbung wird derzeit geprüft. Wir werden Sie bald über den weiteren Verlauf informieren.',
        color: '#f59e0b',
      },
      accepted: {
        emoji: '🎉',
        title: 'Glückwunsch! Bewerbung angenommen',
        message: 'Ihre Bewerbung wurde angenommen! Der Arbeitgeber wird sich in Kürze bei Ihnen melden, um die nächsten Schritte zu besprechen.',
        color: '#10b981',
      },
      rejected: {
        emoji: '😔',
        title: 'Bewerbung abgelehnt',
        message: 'Leider müssen wir Ihnen mitteilen, dass Ihre Bewerbung für diese Position nicht berücksichtigt werden konnte. Lassen Sie sich nicht entmutigen – neue Chancen warten auf Sie!',
        color: '#ef4444',
      },
    };

    const statusInfo = statusMessages[status];

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: ${statusInfo.color}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: ${statusInfo.color}; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${statusInfo.emoji} ${statusInfo.title}</h1>
            </div>
            <div class="content">
              <p>Hallo ${candidateName},</p>
              <p><strong>Position:</strong> ${jobTitle}</p>
              <p>${statusInfo.message}</p>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/applications" class="button">Bewerbungen ansehen</a>
              </p>
              <p>Viel Erfolg!</p>
              <p>Ihr CareerWave Team</p>
            </div>
            <div class="footer">
              <p>© 2026 CareerWave. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: candidateEmail,
      subject: `Bewerbungsstatus aktualisiert: ${jobTitle}`,
      html,
    });
  }
}

export const emailService = new EmailService();

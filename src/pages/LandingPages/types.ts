// --- Landing Page Types ---
export interface LandingPage {
  id: string;
  title: string;
  url: string;
  visits: number;
  submissions: number;
  lastChanged: string;
  status: 'active' | 'draft';
}
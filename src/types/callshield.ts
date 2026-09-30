export type CallStatus = 'Stopped' | 'Allowed' | 'Screened';
export type CallCategory = 'scam' | 'family' | 'screened_unknown' | 'service';

export interface CallRecord {
  id: string;
  phoneNumber: string;
  callerName?: string;
  category: CallCategory;
  scamType?: string;
  timestamp: string;
  timeAgo: string;
  status: CallStatus;
  riskScore: number; // 0 - 100
  warningTitle?: string;
  warningDescription?: string;
  transcriptSnippet?: string;
  carrierOrigin?: string;
  audioDuration?: string;
  targetDeviceName?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  avatarColor: string;
  isFamilyKeyVerified: boolean;
  notes?: string;
}

export interface ProtectedDevice {
  id: string;
  name: string;
  owner: string;
  relation: string;
  deviceModel: string;
  batteryLevel: number;
  isGuarding: boolean;
  todayBlockedCount: number;
  lastActive: string;
  simulatedNumber: string;
}

export interface ScamCampaign {
  id: string;
  title: string;
  threatLevel: 'Critical' | 'High' | 'Moderate';
  targetAudience: string;
  frequency: string;
  description: string;
  recommendedAction: string;
}

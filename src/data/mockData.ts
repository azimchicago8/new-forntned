import { CallRecord, FamilyMember, ProtectedDevice, ScamCampaign } from '../types/callshield';

export const INITIAL_CALLS: CallRecord[] = [
  {
    id: 'call-1',
    phoneNumber: '+1 (800) 492-7104',
    callerName: 'IRS Verification Desk (Spoofed)',
    category: 'scam',
    scamType: 'IRS Impersonation Scam',
    timestamp: 'Today, 2:41 PM',
    timeAgo: '12m ago',
    status: 'Stopped',
    riskScore: 99.4,
    warningTitle: 'DO NOT ANSWER',
    warningDescription: 'This caller is pretending to be the IRS. Hang up or ignore this call. The IRS never calls asking for money.',
    transcriptSnippet: 'Attention, this is officer John from the Internal Revenue Service Criminal Division. A federal tax lien warrant is active for your residence. Urgent payment via prepaid voucher required to avoid arrest...',
    carrierOrigin: 'Spoofed VoIP • Bandwidth.com Gateway',
    audioDuration: '0:34',
    targetDeviceName: "Mom's Phone (Eleanor)"
  },
  {
    id: 'call-2',
    phoneNumber: '+1 (888) 319-0294',
    callerName: 'Medicare Services Center',
    category: 'scam',
    scamType: 'Medicare Card & Supplement Scam',
    timestamp: 'Today, 10:15 AM',
    timeAgo: '4h ago',
    status: 'Stopped',
    riskScore: 97.2,
    warningTitle: 'MEDICARE FRAUD DETECTED',
    warningDescription: 'CallShield detected automated script attempting to extract Medicare beneficiary number and date of birth for false billing.',
    transcriptSnippet: 'This is Medicare Benefits Department regarding your new red white and blue plastic card with embedded chip. Press 1 immediately to verify your postal address and active prescription list...',
    carrierOrigin: 'Twilio Virtual SIP Trunk (Overseas Origin)',
    audioDuration: '0:48',
    targetDeviceName: "Mom's Phone (Eleanor)"
  },
  {
    id: 'call-3',
    phoneNumber: '+1 (312) 555-8921',
    callerName: 'Daughter Sarah',
    category: 'family',
    timestamp: 'Yesterday, 5:30 PM',
    timeAgo: 'Yesterday',
    status: 'Allowed',
    riskScore: 0,
    warningTitle: 'Family Key Verified',
    warningDescription: 'Cryptographic Family Key matched. Call bypasses all screening filters instantly.',
    transcriptSnippet: 'Hi Mom! Just checking in to see if you need any groceries before I drive over tomorrow afternoon.',
    carrierOrigin: 'AT&T Mobility Verified STIR/SHAKEN A',
    audioDuration: '1:45',
    targetDeviceName: "Mom's Phone (Eleanor)"
  },
  {
    id: 'call-4',
    phoneNumber: '+1 (312) 555-4019',
    callerName: 'Dr. Linda Miller (Northwestern Clinic)',
    category: 'service',
    timestamp: 'Yesterday, 11:20 AM',
    timeAgo: 'Yesterday',
    status: 'Allowed',
    riskScore: 1.5,
    warningTitle: 'Verified Healthcare Provider',
    warningDescription: 'Clinic appointment reminder matched against known safe roster.',
    transcriptSnippet: 'Hello Eleanor, this is Dr. Miller’s office confirming your routine cardiovascular follow-up scheduled for next Tuesday at 10 AM.',
    carrierOrigin: 'Northwestern Health PBX Verified',
    audioDuration: '0:28',
    targetDeviceName: "Mom's Phone (Eleanor)"
  },
  {
    id: 'call-5',
    phoneNumber: '+1 (800) 931-4190',
    callerName: 'Chase Fraud Prevention (Spoofed)',
    category: 'scam',
    scamType: 'Bank Wire Spoofing Alert',
    timestamp: 'Oct 24, 3:12 PM',
    timeAgo: '2 days ago',
    status: 'Stopped',
    riskScore: 98.9,
    warningTitle: 'BANK SPOOFING WARNING',
    warningDescription: 'Robocall impersonating Chase Fraud Department demanding one-time verification passcode.',
    transcriptSnippet: 'Chase Fraud Alert: An unauthorized wire transfer of $2,840.00 was initiated from your checking account. To stop this transaction, recite your six-digit authorization code immediately...',
    carrierOrigin: 'Unverified International Toll-Free Gateway',
    audioDuration: '0:42',
    targetDeviceName: "Dad's Phone (Robert)"
  }
];

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'Sarah Jenkins',
    relation: 'Daughter (Primary Guardian)',
    phone: '+1 (312) 555-8921',
    avatarColor: 'bg-primary text-on-primary',
    isFamilyKeyVerified: true,
    notes: 'Full administrative access to Mom & Dad’s Callshield account.'
  },
  {
    id: 'fam-2',
    name: 'Leo Jenkins',
    relation: 'Grandson',
    phone: '+1 (312) 555-3319',
    avatarColor: 'bg-secondary text-on-secondary',
    isFamilyKeyVerified: true,
    notes: 'Safe Caller Pass enabled (college student in Ann Arbor).'
  },
  {
    id: 'fam-3',
    name: 'David Jenkins',
    relation: 'Son',
    phone: '+1 (415) 555-7182',
    avatarColor: 'bg-[#7c3aed] text-white',
    isFamilyKeyVerified: true,
    notes: 'Lives in San Francisco, authorized for alert notifications.'
  },
  {
    id: 'fam-4',
    name: 'Dr. Linda Miller',
    relation: 'Primary Care Physician',
    phone: '+1 (312) 555-4019',
    avatarColor: 'bg-[#0284c7] text-white',
    isFamilyKeyVerified: true,
    notes: 'Northwestern Medicine Clinic line'
  }
];

export const INITIAL_DEVICES: ProtectedDevice[] = [
  {
    id: 'dev-1',
    name: "Mom's Phone (Eleanor)",
    owner: 'Eleanor Jenkins (Age 79)',
    relation: 'Mother',
    deviceModel: 'Apple iPhone 14 • iOS 18.2',
    batteryLevel: 84,
    isGuarding: true,
    todayBlockedCount: 1,
    lastActive: 'Just now',
    simulatedNumber: '+1 (800) 492-7104'
  },
  {
    id: 'dev-2',
    name: "Dad's Phone (Robert)",
    owner: 'Robert Jenkins (Age 82)',
    relation: 'Father',
    deviceModel: 'Google Pixel 8 • Android 15',
    batteryLevel: 91,
    isGuarding: true,
    todayBlockedCount: 0,
    lastActive: '6 mins ago',
    simulatedNumber: '+1 (800) 931-4190'
  }
];

export const SCAM_CAMPAIGNS: ScamCampaign[] = [
  {
    id: 'camp-1',
    title: 'Fake IRS & Sheriff Warrant Surge',
    threatLevel: 'Critical',
    targetAudience: 'Seniors age 65+ across IL, IN, WI',
    frequency: 'High (+42% this week)',
    description: 'Callers claim tax fraud and threaten police arrest unless back taxes are settled with Target gift cards or crypto ATMs.',
    recommendedAction: 'Keep CallShield Auto-Block enabled. IRS strictly communicates via official US Postal mail.'
  },
  {
    id: 'camp-2',
    title: 'Medicare Plastic Chip Card Replacement',
    threatLevel: 'High',
    targetAudience: 'All Medicare Part A/B cardholders',
    frequency: 'Moderate',
    description: 'Robocalls claiming Medicare is issuing new plastic chip cards to replace paper cards, demanding ID number verification.',
    recommendedAction: 'Never share Medicare ID over the phone. Medicare never cold-calls beneficiaries.'
  },
  {
    id: 'camp-3',
    title: 'AI Grandchild Voice Clone Bail Scam',
    threatLevel: 'Critical',
    targetAudience: 'Grandparents',
    frequency: 'Rising sharply',
    description: 'Bad actors clone a grandchild’s voice using social media clips, claiming they are in a car crash or jail and need wire transfer.',
    recommendedAction: 'Call the grandchild directly on their verified Family Key number to confirm safety before acting.'
  }
];

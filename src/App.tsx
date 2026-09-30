import React, { useState } from 'react';
import { CallRecord, FamilyMember, ProtectedDevice } from './types/callshield';
import { INITIAL_CALLS, INITIAL_FAMILY_MEMBERS, INITIAL_DEVICES } from './data/mockData';
import { HomeScreen } from './components/mobile/HomeScreen';
import { IncomingCallScreen } from './components/mobile/IncomingCallScreen';
import { RecentCallsScreen } from './components/mobile/RecentCallsScreen';
import { MobileShell } from './components/mobile/MobileShell';
import { WebsitePortal } from './components/website/WebsitePortal';
import { CallDetailModal } from './components/modals/CallDetailModal';
import { FamilyKeyModal } from './components/modals/FamilyKeyModal';

type ViewMode = 'website' | 'mobile' | 'split';
type MobileScreen = 'home' | 'recent' | 'incoming';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('website');
  const [mobileScreen, setMobileScreen] = useState<MobileScreen>('home');

  // Shared application state
  const [calls, setCalls] = useState<CallRecord[]>(INITIAL_CALLS);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(INITIAL_FAMILY_MEMBERS);
  const [devices, setDevices] = useState<ProtectedDevice[]>(INITIAL_DEVICES);

  // Active incoming call being simulated
  const [activeIncomingCall, setActiveIncomingCall] = useState<CallRecord>(INITIAL_CALLS[0]);

  // Selected call for detail modal
  const [selectedCallDetail, setSelectedCallDetail] = useState<CallRecord | null>(null);

  // Family Key modal
  const [showFamilyKeyModal, setShowFamilyKeyModal] = useState(false);

  // Handlers
  const handleTriggerIncomingCall = (callData?: Partial<CallRecord>) => {
    const callToSimulate: CallRecord = {
      id: `call-${Date.now()}`,
      phoneNumber: callData?.phoneNumber || '+1 (800) 492-7104',
      callerName: callData?.callerName || 'IRS Automated Verification Desk',
      category: 'scam',
      scamType: callData?.scamType || 'IRS Impersonation Scam',
      timestamp: 'Just now',
      timeAgo: 'Just now',
      status: 'Stopped',
      riskScore: callData?.riskScore || 99.4,
      warningTitle: callData?.warningTitle || 'DO NOT ANSWER',
      warningDescription:
        callData?.warningDescription ||
        'This caller is pretending to be the IRS. Hang up or ignore this call. The IRS never calls asking for money.',
      transcriptSnippet:
        callData?.transcriptSnippet ||
        'Attention, this is officer John from the Internal Revenue Service Criminal Division. A federal tax lien warrant is active for your residence. Urgent payment via prepaid voucher required to avoid arrest...',
      carrierOrigin: callData?.carrierOrigin || 'Spoofed VoIP • Bandwidth.com Gateway',
      audioDuration: '0:34',
      targetDeviceName: "Mom's Phone (Eleanor)",
    };

    setActiveIncomingCall(callToSimulate);
    setMobileScreen('incoming');
  };

  const handleDeclineAndBlock = (call: CallRecord) => {
    // Add or update in call list
    setCalls((prev) => {
      const exists = prev.some((c) => c.id === call.id);
      if (exists) {
        return prev.map((c) =>
          c.id === call.id ? { ...c, status: 'Stopped', timestamp: 'Today, 2:41 PM' } : c
        );
      }
      return [{ ...call, status: 'Stopped', timestamp: 'Just now' }, ...prev];
    });

    // Update device block count
    setDevices((prev) =>
      prev.map((d) =>
        d.id === 'dev-1' ? { ...d, todayBlockedCount: d.todayBlockedCount + 1 } : d
      )
    );

    // Return to home screen
    setMobileScreen('home');
  };

  const handleAddFamilyMember = (newMember: FamilyMember) => {
    setFamilyMembers((prev) => [newMember, ...prev]);
  };

  const recentBlockedCall = calls.find((c) => c.category === 'scam') || INITIAL_CALLS[0];

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col font-sans selection:bg-[#adc6ff]/40">
      {/* Apple-Clean View Mode Switcher Header */}
      <nav
        aria-label="View switcher"
        className="bg-white/80 backdrop-blur-md border-b border-black/[0.06] px-4 py-2 flex items-center justify-between text-[14px] z-50 sticky top-0"
      >
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#006e28] text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <span className="font-bold text-[#1c1b1b]">Callshield</span>
        </div>

        {/* View mode segmented pill (Apple style) */}
        <div className="flex items-center gap-1 p-1 bg-[#f0edec] rounded-full">
          <button
            onClick={() => setViewMode('website')}
            className={`px-3.5 py-1 rounded-full font-semibold text-[13px] flex items-center gap-1.5 transition-all ${
              viewMode === 'website'
                ? 'bg-white text-[#1c1b1b] shadow-xs'
                : 'text-[#414755] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">language</span>
            <span>Website Version</span>
          </button>

          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3.5 py-1 rounded-full font-semibold text-[13px] flex items-center gap-1.5 transition-all ${
              viewMode === 'mobile'
                ? 'bg-white text-[#1c1b1b] shadow-xs'
                : 'text-[#414755] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">smartphone</span>
            <span>Phone App View</span>
          </button>

          <button
            onClick={() => setViewMode('split')}
            className={`hidden xl:flex px-3.5 py-1 rounded-full font-semibold text-[13px] items-center gap-1.5 transition-all ${
              viewMode === 'split'
                ? 'bg-white text-[#1c1b1b] shadow-xs'
                : 'text-[#414755] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">splitscreen</span>
            <span>Side-by-Side</span>
          </button>
        </div>
      </nav>

      {/* Main Container based on view mode */}
      <div className="flex-1 flex flex-col">
        {/* MODE 1: Simplistic Apple Website Version */}
        {viewMode === 'website' && (
          <WebsitePortal
            devices={devices}
            calls={calls}
            familyMembers={familyMembers}
            onOpenCallDetail={setSelectedCallDetail}
            onTriggerIncomingCall={(callData) => {
              handleTriggerIncomingCall(callData);
              setViewMode('mobile');
            }}
            onOpenFamilyKeyModal={() => setShowFamilyKeyModal(true)}
            onSwitchToMobile={() => setViewMode('mobile')}
          />
        )}

        {/* MODE 2: Standalone Mobile Phone View */}
        {viewMode === 'mobile' && (
          <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-[#f0edec]">
            {/* Quick Screen Pill Bar */}
            <div className="mb-4 flex items-center gap-2 p-1 bg-white/70 backdrop-blur-md rounded-full shadow-xs border border-black/[0.05]">
              <button
                onClick={() => setMobileScreen('home')}
                className={`px-3.5 py-1 rounded-full text-[13px] font-semibold transition-all ${
                  mobileScreen === 'home'
                    ? 'bg-[#0058bc] text-white shadow-xs'
                    : 'text-[#414755] hover:text-[#1c1b1b]'
                }`}
              >
                Home Screen
              </button>
              <button
                onClick={() => setMobileScreen('incoming')}
                className={`px-3.5 py-1 rounded-full text-[13px] font-semibold transition-all ${
                  mobileScreen === 'incoming'
                    ? 'bg-[#bc000a] text-white shadow-xs'
                    : 'text-[#414755] hover:text-[#1c1b1b]'
                }`}
              >
                Incoming Scam Screen
              </button>
              <button
                onClick={() => setMobileScreen('recent')}
                className={`px-3.5 py-1 rounded-full text-[13px] font-semibold transition-all ${
                  mobileScreen === 'recent'
                    ? 'bg-[#0058bc] text-white shadow-xs'
                    : 'text-[#414755] hover:text-[#1c1b1b]'
                }`}
              >
                Recent Calls
              </button>
            </div>

            <MobileShell framed={true}>
              {mobileScreen === 'home' && (
                <HomeScreen
                  recentBlockedCall={recentBlockedCall}
                  onNavigateToRecent={() => setMobileScreen('recent')}
                  onTriggerIncomingCall={handleTriggerIncomingCall}
                  onOpenCallDetail={setSelectedCallDetail}
                  onOpenSettings={() => setShowFamilyKeyModal(true)}
                  todayCount={0}
                />
              )}

              {mobileScreen === 'incoming' && (
                <IncomingCallScreen
                  call={activeIncomingCall}
                  onDeclineAndBlock={handleDeclineAndBlock}
                  onDismiss={() => setMobileScreen('home')}
                />
              )}

              {mobileScreen === 'recent' && (
                <RecentCallsScreen
                  calls={calls}
                  onBackToHome={() => setMobileScreen('home')}
                  onOpenCallDetail={setSelectedCallDetail}
                  onTriggerIncomingCall={handleTriggerIncomingCall}
                />
              )}
            </MobileShell>
          </div>
        )}

        {/* MODE 3: Split View */}
        {viewMode === 'split' && (
          <div className="flex-1 flex flex-col xl:flex-row overflow-hidden bg-[#f0edec]">
            {/* Left: Ultra-Simplistic Website */}
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-50px)] border-r border-black/[0.06] bg-[#fcf9f8]">
              <WebsitePortal
                devices={devices}
                calls={calls}
                familyMembers={familyMembers}
                onOpenCallDetail={setSelectedCallDetail}
                onTriggerIncomingCall={handleTriggerIncomingCall}
                onOpenFamilyKeyModal={() => setShowFamilyKeyModal(true)}
                onSwitchToMobile={() => setViewMode('mobile')}
              />
            </div>

            {/* Right: Senior's Live Phone Simulation */}
            <div className="w-full xl:w-[460px] p-6 bg-[#ebe7e7] flex flex-col items-center justify-start shrink-0 overflow-y-auto max-h-[calc(100vh-50px)]">
              <div className="w-full max-w-[390px] mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006e28] animate-pulse" />
                  <span className="font-bold text-[14px] text-[#1c1b1b]">
                    Mom's iPhone (Live Feed)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMobileScreen('home')}
                    className={`px-2.5 py-0.5 rounded-md text-[12px] font-semibold ${
                      mobileScreen === 'home'
                        ? 'bg-[#0058bc] text-white'
                        : 'bg-white text-[#414755]'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => setMobileScreen('incoming')}
                    className={`px-2.5 py-0.5 rounded-md text-[12px] font-semibold ${
                      mobileScreen === 'incoming'
                        ? 'bg-[#bc000a] text-white'
                        : 'bg-white text-[#414755]'
                    }`}
                  >
                    Scam Alert
                  </button>
                  <button
                    onClick={() => setMobileScreen('recent')}
                    className={`px-2.5 py-0.5 rounded-md text-[12px] font-semibold ${
                      mobileScreen === 'recent'
                        ? 'bg-[#0058bc] text-white'
                        : 'bg-white text-[#414755]'
                    }`}
                  >
                    Calls
                  </button>
                </div>
              </div>

              <MobileShell framed={true}>
                {mobileScreen === 'home' && (
                  <HomeScreen
                    recentBlockedCall={recentBlockedCall}
                    onNavigateToRecent={() => setMobileScreen('recent')}
                    onTriggerIncomingCall={handleTriggerIncomingCall}
                    onOpenCallDetail={setSelectedCallDetail}
                    onOpenSettings={() => setShowFamilyKeyModal(true)}
                    todayCount={0}
                  />
                )}

                {mobileScreen === 'incoming' && (
                  <IncomingCallScreen
                    call={activeIncomingCall}
                    onDeclineAndBlock={handleDeclineAndBlock}
                    onDismiss={() => setMobileScreen('home')}
                  />
                )}

                {mobileScreen === 'recent' && (
                  <RecentCallsScreen
                    calls={calls}
                    onBackToHome={() => setMobileScreen('home')}
                    onOpenCallDetail={setSelectedCallDetail}
                    onTriggerIncomingCall={handleTriggerIncomingCall}
                  />
                )}
              </MobileShell>
            </div>
          </div>
        )}
      </div>

      {/* Call Detail Modal */}
      {selectedCallDetail && (
        <CallDetailModal
          call={selectedCallDetail}
          onClose={() => setSelectedCallDetail(null)}
          onReplayIncomingAlert={(call) => {
            handleTriggerIncomingCall(call);
            setViewMode('mobile');
          }}
        />
      )}

      {/* Family Key Safe List Modal */}
      {showFamilyKeyModal && (
        <FamilyKeyModal
          familyMembers={familyMembers}
          onAddFamilyMember={handleAddFamilyMember}
          onClose={() => setShowFamilyKeyModal(false)}
        />
      )}
    </div>
  );
}

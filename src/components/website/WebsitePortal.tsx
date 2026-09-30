import React, { useState } from 'react';
import { CallRecord, FamilyMember, ProtectedDevice } from '../../types/callshield';
import { playFriendlyRingTone, playSpeechClickSound } from '../../utils/audioEffects';

interface WebsitePortalProps {
  devices: ProtectedDevice[];
  calls: CallRecord[];
  familyMembers: FamilyMember[];
  onOpenCallDetail: (call: CallRecord) => void;
  onTriggerIncomingCall: (callData?: Partial<CallRecord>) => void;
  onOpenFamilyKeyModal: () => void;
  onSwitchToMobile: () => void;
}

export const WebsitePortal: React.FC<WebsitePortalProps> = ({
  devices,
  calls,
  familyMembers,
  onOpenCallDetail,
  onTriggerIncomingCall,
  onOpenFamilyKeyModal,
  onSwitchToMobile,
}) => {
  const [testRingActive, setTestRingActive] = useState(false);
  const [testRingMessage, setTestRingMessage] = useState<string | null>(null);

  // The latest avoided scam
  const latestScam = calls.find((c) => c.category === 'scam') || calls[0];

  const handleTestRing = () => {
    setTestRingActive(true);
    setTestRingMessage("Ringing Eleanor's phone now... Everything is working safely.");
    const stopAudio = playFriendlyRingTone(3);

    setTimeout(() => {
      setTestRingActive(false);
      setTestRingMessage("Test complete. Your phone rang successfully!");
      stopAudio();
      setTimeout(() => setTestRingMessage(null), 4000);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] flex flex-col font-sans selection:bg-[#adc6ff]/40">
      {/* Apple-Style Minimal Header */}
      <header className="sticky top-0 z-30 bg-[#fcf9f8]/90 backdrop-blur-xl border-b border-black/[0.06] px-6 md:px-12 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#006e28] flex items-center justify-center text-white shadow-xs">
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check
              </span>
            </div>
            <div>
              <span className="text-[20px] font-bold tracking-tight text-[#1c1b1b] block leading-tight">
                Callshield
              </span>
              <span className="text-[13px] text-[#414755]">Safe Phone Protection</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSwitchToMobile}
              className="px-4 py-2 bg-white hover:bg-[#f6f3f2] text-[#0058bc] text-[15px] font-semibold rounded-full border border-black/[0.08] shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[20px]">smartphone</span>
              <span>Open Phone Screen</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Single-Column Clean Content (Maximum Readability for Seniors) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10 md:py-14 flex flex-col gap-10">
        {/* Test Ring Confirmation Banner */}
        {testRingMessage && (
          <div className="p-5 rounded-2xl bg-[#6ffb85]/30 border border-[#006e28]/20 flex items-center gap-3 text-[#006e28] animate-fade-in shadow-xs">
            <span
              className="material-symbols-outlined text-[28px] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              ring_volume
            </span>
            <p className="text-[17px] font-semibold leading-normal">{testRingMessage}</p>
          </div>
        )}

        {/* Hero Reassurance - Apple Minimalist Aesthetic */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/[0.05] text-center flex flex-col items-center">
          {/* Big Green Shield Icon */}
          <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-[#6ffb85]/30 mb-6">
            <div className="absolute inset-0 rounded-full bg-[#6ffb85]/20 animate-ping opacity-30" />
            <div className="w-20 h-20 rounded-full bg-[#006e28] flex items-center justify-center shadow-sm">
              <span
                className="material-symbols-outlined text-white text-[48px]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
              >
                check
              </span>
            </div>
          </div>

          <h1 className="text-[36px] md:text-[44px] font-bold text-[#1c1b1b] tracking-tight leading-tight mb-3">
            You Are Protected
          </h1>

          <p className="text-[20px] md:text-[22px] text-[#414755] max-w-xl leading-relaxed mb-6 font-normal">
            Callshield is on and working in the background. Fake callers and scammers cannot ring your phone.
          </p>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f6f3f2] text-[15px] font-semibold text-[#006e28]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006e28] animate-pulse" />
            <span>Guarding Eleanor’s Phone 24 hours a day</span>
          </div>
        </section>

        {/* Big Card 1: Latest Blocked Scam (Plain English, Zero Technical Clutter) */}
        <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/[0.05] flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdad6]/60 flex items-center justify-center text-[#ba1a1a]">
                <span className="material-symbols-outlined text-[28px]">phone_disabled</span>
              </div>
              <div>
                <h2 className="text-[22px] md:text-[24px] font-bold text-[#1c1b1b] leading-tight">
                  Scam Call Stopped Today
                </h2>
                <span className="text-[15px] text-[#414755]">Today at 2:41 PM</span>
              </div>
            </div>

            <span className="px-3.5 py-1 rounded-full text-[14px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
              Stopped Automatically
            </span>
          </div>

          {/* Simple Large Number Box */}
          <div className="p-5 bg-[#f6f3f2] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-[13px] font-bold text-[#414755] uppercase tracking-wider mb-1">
                Blocked Phone Number
              </div>
              <div className="text-[24px] md:text-[28px] font-bold text-[#1c1b1b] tracking-wide tabular-nums">
                {latestScam.phoneNumber}
              </div>
              <div className="text-[16px] text-[#bc000a] font-semibold mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span>{latestScam.scamType || 'Fake IRS Tax Scam'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playSpeechClickSound();
                  onOpenCallDetail(latestScam);
                }}
                className="px-5 py-3 rounded-xl bg-white hover:bg-[#ebe7e7] text-[#0058bc] font-bold text-[16px] border border-black/[0.08] shadow-xs active:scale-95 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                <span>Hear What They Said</span>
              </button>

              <button
                onClick={() => {
                  onTriggerIncomingCall(latestScam);
                  onSwitchToMobile();
                }}
                className="px-4 py-3 rounded-xl bg-[#ffdad5]/50 hover:bg-[#ffdad5] text-[#bc000a] font-bold text-[15px] active:scale-95 transition-all flex items-center gap-1.5"
                title="See what this looks like on the phone"
              >
                <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
                <span>Test Alert</span>
              </button>
            </div>
          </div>

          <p className="text-[17px] text-[#414755] leading-relaxed">
            You did not have to answer or press anything. Callshield recognized the caller was pretending to be the government and blocked them quietly.
          </p>
        </section>

        {/* Big Card 2: Family Key (Who Can Call You) */}
        <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/[0.05] flex flex-col gap-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-[24px] font-bold text-[#1c1b1b] leading-tight">
                Family & Doctors Who Can Call You
              </h2>
              <p className="text-[16px] text-[#414755] mt-1">
                These people will always ring through loud and clear. They never get blocked.
              </p>
            </div>

            <button
              onClick={onOpenFamilyKeyModal}
              className="px-5 py-2.5 bg-[#006e28] hover:bg-[#005a20] text-white text-[15px] font-bold rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              <span>Add Person</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-[#f6f3f2] border border-black/[0.04] flex items-center gap-4"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-[20px] shrink-0 ${member.avatarColor}`}
                >
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[17px] text-[#1c1b1b] flex items-center gap-1.5">
                    <span>{member.name}</span>
                    <span
                      className="material-symbols-outlined text-[#006e28] text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <div className="text-[14px] text-[#414755]">{member.relation}</div>
                  <div className="text-[13px] text-[#717786] tabular-nums mt-0.5">
                    {member.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Big Card 3: Test Ring (Simple Big Button) */}
        <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg">
            <h2 className="text-[22px] font-bold text-[#1c1b1b]">
              Want to make sure your ringer is working?
            </h2>
            <p className="text-[17px] text-[#414755] leading-relaxed">
              Press this button anytime. We will send a gentle 2-second test ring to your phone so you know it works.
            </p>
          </div>

          <button
            onClick={handleTestRing}
            disabled={testRingActive}
            className="px-8 py-4 bg-[#0058bc] hover:bg-[#004ca4] text-white text-[18px] font-bold rounded-2xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[24px]">
              {testRingActive ? 'ring_volume' : 'phone_in_talk'}
            </span>
            <span>{testRingActive ? 'Ringing Now...' : 'Send Test Ring'}</span>
          </button>
        </section>

        {/* Quiet Reassurance Footer */}
        <footer className="text-center pt-4 pb-10 text-[15px] text-[#717786] space-y-1">
          <p>Managed with love by Daughter Sarah Jenkins.</p>
          <p>Questions? Call Sarah directly or tap the test ring button above.</p>
        </footer>
      </main>
    </div>
  );
};

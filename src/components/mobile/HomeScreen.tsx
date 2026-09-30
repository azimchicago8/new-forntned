import React, { useState } from 'react';
import { CallRecord } from '../../types/callshield';
import { playFriendlyRingTone, playSpeechClickSound } from '../../utils/audioEffects';

interface HomeScreenProps {
  recentBlockedCall: CallRecord;
  onNavigateToRecent: () => void;
  onTriggerIncomingCall: (callData?: Partial<CallRecord>) => void;
  onOpenCallDetail: (call: CallRecord) => void;
  onOpenSettings: () => void;
  todayCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  recentBlockedCall,
  onNavigateToRecent,
  onTriggerIncomingCall,
  onOpenCallDetail,
  onOpenSettings,
  todayCount,
}) => {
  const [showTestModal, setShowTestModal] = useState(false);
  const [isTestRinging, setIsTestRinging] = useState(false);
  const [guardActive, setGuardActive] = useState(true);

  const handleTestRing = () => {
    setIsTestRinging(true);
    setShowTestModal(true);
    const stopAudio = playFriendlyRingTone(3);

    // Stop after 6 seconds if modal is closed
    setTimeout(() => {
      setIsTestRinging(false);
      stopAudio();
    }, 6000);
  };

  const handleCloseModal = () => {
    setShowTestModal(false);
    setIsTestRinging(false);
  };

  return (
    <div className="relative min-h-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] select-none">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-[#fcf9f8]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#f0edec]">
        <div className="h-16 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006e28] text-[26px]">
              verified_user
            </span>
            <h1 className="font-semibold text-[20px] text-[#1c1b1b] tracking-tight">
              Callshield
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSettings}
              aria-label="Profile and Settings"
              className="w-8 h-8 rounded-full bg-[#0058bc] flex items-center justify-center text-white shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-28 px-5">
        {/* Central Shield Protection Status */}
        <div className="flex flex-col items-center text-center mt-3 mb-6">
          <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-[#6ffb85]/30 mb-4 transition-transform duration-300 hover:scale-105 active:scale-95">
            {/* Ping aura */}
            <div className="absolute inset-0 rounded-full bg-[#6ffb85]/30 animate-ping opacity-40 pointer-events-none" />
            <div className="w-20 h-20 rounded-full bg-[#006e28] flex items-center justify-center shadow-md">
              <span
                className="material-symbols-outlined text-white text-[44px]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}
              >
                check
              </span>
            </div>
          </div>
          <h2 className="text-[26px] font-bold text-[#1c1b1b] mb-1 tracking-tight leading-tight">
            You are Protected
          </h2>
          <p className="text-[17px] text-[#414755] max-w-xs leading-relaxed">
            CallShield is actively blocking scam calls in the background.
          </p>
        </div>

        {/* 2-Column Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Today Card */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#f0edec] flex flex-col justify-between min-h-[135px]">
            <div className="flex items-center gap-2 text-[#414755]">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span className="text-[15px] font-semibold">Today</span>
            </div>
            <div>
              <div className="text-[24px] text-[#1c1b1b] font-bold tracking-tight">
                {todayCount} Calls
              </div>
              <p className="text-[15px] text-[#006e28] font-semibold mt-0.5">None Ringing</p>
            </div>
          </div>

          {/* Guard Card */}
          <div
            onClick={() => setGuardActive(!guardActive)}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#f0edec] flex flex-col justify-between min-h-[135px] cursor-pointer hover:border-[#adc6ff] transition-colors"
          >
            <div className="flex items-center gap-2 text-[#414755]">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
              <span className="text-[15px] font-semibold">Guard</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-3.5 h-3.5 rounded-full ${
                    guardActive ? 'bg-[#006e28] animate-pulse' : 'bg-amber-500'
                  } inline-block`}
                />
                <span className="text-[24px] text-[#1c1b1b] font-bold tracking-tight">
                  {guardActive ? 'Active' : 'Paused'}
                </span>
              </div>
              <p className="text-[15px] text-[#414755] mt-0.5">
                {guardActive ? 'Guarding 24/7' : 'Tap to Resume'}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Blocked Call Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[17px] font-semibold text-[#1c1b1b] tracking-tight">
              Recent Blocked Call
            </span>
            <span className="text-[14px] text-[#414755]">Automated</span>
          </div>

          <div
            onClick={() => {
              playSpeechClickSound();
              onOpenCallDetail(recentBlockedCall);
            }}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#f0edec] flex flex-col gap-3 cursor-pointer hover:border-[#adc6ff] transition-all active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffdad6]/60 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[22px]">
                    phone_disabled
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-[17px] text-[#1c1b1b] leading-tight">
                    Scam call avoided
                  </div>
                  <div className="text-[14px] text-[#414755]">
                    {recentBlockedCall.timestamp || 'Today, 2:41 PM'}
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#717786] text-[20px]">
                chevron_right
              </span>
            </div>

            {/* Blocked Number Container */}
            <div className="bg-[#f6f3f2] rounded-lg p-2.5 flex items-center justify-between">
              <span className="text-[18px] text-[#1c1b1b] font-bold tracking-wide">
                {recentBlockedCall.phoneNumber || '+1 (800) 492-7104'}
              </span>
              <span className="text-[13px] text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-0.5 rounded-full font-bold">
                Stopped
              </span>
            </div>

            {/* Warning tag */}
            <div className="flex items-center gap-2 text-[#414755] pt-0.5">
              <span className="material-symbols-outlined text-[18px] text-[#bc000a]">warning</span>
              <span className="text-[15px] font-medium text-[#414755]">
                {recentBlockedCall.scamType || 'IRS Impersonation Scam'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons & Family Status */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleTestRing}
            className="w-full h-15 rounded-xl bg-[#0058bc] text-white font-semibold text-[17px] shadow-sm flex items-center justify-center gap-2 hover:bg-[#004ca4] active:scale-[0.985] transition-all"
            id="test-alert-btn"
          >
            <span className="material-symbols-outlined text-[24px]">ring_volume</span>
            <span>Send Friendly Test Ring</span>
          </button>

          {/* Quick Simulation trigger for the Scam Screen */}
          <button
            onClick={() => onTriggerIncomingCall(recentBlockedCall)}
            className="w-full h-12 rounded-xl bg-[#f0edec] hover:bg-[#ebe7e7] text-[#bc000a] font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.985] transition-all border border-[#e5e2e1]"
          >
            <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
            <span>Simulate Incoming Scam Screen</span>
          </button>

          <div className="flex items-center justify-center gap-2 py-2 text-[#414755]">
            <span
              className="material-symbols-outlined text-[#006e28] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <span className="text-[15px] font-medium text-[#414755]">
              Family Key Connected: Daughter Sarah
            </span>
          </div>
        </div>
      </main>

      {/* Test Feedback Modal as defined in HTML */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#6ffb85]/40 flex items-center justify-center mb-3">
              <span className={`material-symbols-outlined text-[#006e28] text-[36px] ${isTestRinging ? 'animate-bounce' : ''}`}>
                phone_in_talk
              </span>
            </div>
            <h3 className="font-bold text-[20px] text-[#1c1b1b] mb-1">
              {isTestRinging ? 'Test Ringing...' : 'Test In Progress'}
            </h3>
            <p className="text-[15px] text-[#414755] mb-5 leading-normal">
              Your phone is safely configured and protected. You can close this anytime.
            </p>
            <div className="w-full flex flex-col gap-2">
              <button
                onClick={handleCloseModal}
                className="w-full h-12 rounded-xl bg-[#ebe7e7] hover:bg-[#e5e2e1] text-[#1c1b1b] font-semibold text-[16px] active:scale-95 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#fcf9f8]/90 backdrop-blur-xl border-t border-[#f0edec] shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-around h-18 px-6">
          <button
            className="flex flex-col items-center justify-center min-w-[64px] min-h-[52px] text-[#0058bc] font-semibold transition-colors"
          >
            <span
              className="material-symbols-outlined text-[26px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield
            </span>
            <span className="text-[13px] mt-0.5">Home</span>
          </button>

          <button
            onClick={onNavigateToRecent}
            className="flex flex-col items-center justify-center min-w-[64px] min-h-[52px] text-[#414755] hover:text-[#1c1b1b] transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">call_log</span>
            <span className="text-[13px] mt-0.5">Recent Calls</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

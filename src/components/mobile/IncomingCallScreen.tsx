import React, { useState, useEffect } from 'react';
import { CallRecord } from '../../types/callshield';
import { playBlockConfirmationSound, playFriendlyRingTone, stopRingTone } from '../../utils/audioEffects';

interface IncomingCallScreenProps {
  call: CallRecord;
  onDeclineAndBlock: (call: CallRecord) => void;
  onDismiss: () => void;
}

export const IncomingCallScreen: React.FC<IncomingCallScreenProps> = ({
  call,
  onDeclineAndBlock,
  onDismiss,
}) => {
  const [isBlocked, setIsBlocked] = useState(false);

  // Play ringing sound on mount until declined
  useEffect(() => {
    const stopAudio = playFriendlyRingTone(4);
    return () => {
      stopAudio();
      stopRingTone();
    };
  }, []);

  const handleDecline = () => {
    stopRingTone();
    playBlockConfirmationSound();

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([100, 50, 100]);
      } catch {
        // ignore
      }
    }

    setIsBlocked(true);

    // After 1.4 seconds of showing "Blocked & Protected", return
    setTimeout(() => {
      onDeclineAndBlock(call);
    }, 1400);
  };

  return (
    <div className="relative min-h-full w-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] select-none justify-between pt-safe pb-safe px-6 py-6 overflow-y-auto">
      {/* Top Status Pill: Verification State */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={onDismiss}
          className="w-9 h-9 rounded-full bg-[#f0edec] hover:bg-[#e5e2e1] flex items-center justify-center text-[#414755] transition-colors"
          title="Exit simulation"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffdad6] text-[#93000a]">
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shield_with_heart
          </span>
          <span className="text-[13px] font-semibold tracking-tight">
            Identity Unverified • No Family Key
          </span>
        </div>

        <div className="w-9" />
      </div>

      {/* Central Calling Entity & Alert Visual */}
      <div className="flex flex-col items-center text-center mt-6 w-full max-w-sm mx-auto">
        {/* Big Warning Glyph with Calming Pulse Shadow */}
        <div
          className={`relative flex items-center justify-center w-24 h-24 rounded-full mb-4 shadow-md transition-colors duration-300 ${
            isBlocked
              ? 'bg-[#6ffb85]/40 text-[#006e28]'
              : 'bg-[#ffdad5] text-[#bc000a] animate-pulse'
          }`}
        >
          <span
            className="material-symbols-outlined text-[52px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isBlocked ? 'verified_user' : 'front_hand'}
          </span>
        </div>

        {/* Incoming Call Identifier */}
        <span className="text-[16px] text-[#414755] mb-1 font-medium">
          Incoming Call
        </span>
        <h1 className="text-[32px] text-[#1c1b1b] tracking-tight font-bold mb-2 tabular-nums">
          {call.phoneNumber || '+1 (800) 492-7104'}
        </h1>

        {/* Clear Categorical Warning */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bc000a] text-white shadow-sm">
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            warning
          </span>
          <span className="text-[15px] font-bold">
            {call.scamType ? `Scam Call: ${call.scamType}` : 'Scam Call: Fake IRS'}
          </span>
        </div>
      </div>

      {/* High-Readability Guidance Card */}
      <div className="w-full max-w-sm my-6 rounded-2xl bg-white p-5 shadow-sm border border-[#ffdad6] text-center mx-auto">
        <h2 className="text-[24px] text-[#bc000a] uppercase tracking-wide font-extrabold mb-2">
          {call.warningTitle || 'DO NOT ANSWER'}
        </h2>
        <p className="text-[17px] text-[#1c1b1b] leading-relaxed font-normal">
          {call.warningDescription ||
            'This caller is pretending to be the IRS. Hang up or ignore this call. The IRS never calls asking for money.'}
        </p>
      </div>

      {/* Giant Native-Style Reject & Block Tap Action */}
      <div className="flex flex-col items-center w-full max-w-xs mx-auto mt-2">
        <button
          aria-label="Decline and block this caller"
          onClick={handleDecline}
          disabled={isBlocked}
          type="button"
          className={`group relative flex flex-col items-center justify-center w-24 h-24 rounded-full text-white shadow-xl active:scale-95 transition-all cursor-pointer ${
            isBlocked
              ? 'bg-[#006e28] scale-105'
              : 'bg-[#bc000a] hover:bg-[#a50009]'
          }`}
          id="declineBtn"
        >
          {isBlocked ? (
            <span
              className="material-symbols-outlined text-[44px] animate-scale-in"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check
            </span>
          ) : (
            <span
              className="material-symbols-outlined text-[44px] rotate-[135deg]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              call_end
            </span>
          )}
        </button>

        <span className="text-[18px] text-[#1c1b1b] mt-3 font-bold transition-all">
          {isBlocked ? 'Blocked & Protected' : 'Decline & Block'}
        </span>
      </div>

      {/* Calm Low-Distraction Safety Notice */}
      <div className="w-full text-center mt-6">
        <p className="text-[13px] text-[#414755] opacity-80">
          This call is recorded for safety of our customers.
        </p>
      </div>
    </div>
  );
};

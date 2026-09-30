import React, { useState } from 'react';
import { CallRecord } from '../../types/callshield';
import { playSpeechClickSound } from '../../utils/audioEffects';

interface CallDetailModalProps {
  call: CallRecord;
  onClose: () => void;
  onReplayIncomingAlert: (call: CallRecord) => void;
}

export const CallDetailModal: React.FC<CallDetailModalProps> = ({
  call,
  onClose,
  onReplayIncomingAlert,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [reported, setReported] = useState(false);

  const toggleAudio = () => {
    if (!isPlayingAudio) {
      setIsPlayingAudio(true);
      playSpeechClickSound();
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 5000);
    } else {
      setIsPlayingAudio(false);
    }
  };

  const isScam = call.category === 'scam';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-[#f0edec] max-h-[90vh] flex flex-col overflow-hidden text-[#1c1b1b]">
        {/* Header */}
        <div className="p-5 border-b border-[#f0edec] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                isScam ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#6ffb85]/40 text-[#006e28]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isScam ? 'phone_disabled' : 'verified_user'}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[17px] leading-tight">
                {isScam ? 'Scam Intercept Report' : 'Verified Call Record'}
              </h3>
              <span className="text-[13px] text-[#414755]">{call.timestamp}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebe7e7] hover:bg-[#e5e2e1] flex items-center justify-center text-[#414755] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-left">
          {/* Main Number Banner */}
          <div className="p-3.5 bg-[#f6f3f2] rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[12px] text-[#414755] font-semibold uppercase tracking-wider">
                Caller ID
              </div>
              <div className="text-[20px] font-bold text-[#1c1b1b] tabular-nums">
                {call.phoneNumber}
              </div>
              {call.callerName && (
                <div className="text-[13px] text-[#414755]">{call.callerName}</div>
              )}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-[13px] font-bold ${
                isScam
                  ? 'bg-[#ffdad6] text-[#ba1a1a]'
                  : 'bg-[#6ffb85]/50 text-[#006e28]'
              }`}
            >
              {call.status}
            </div>
          </div>

          {/* AI Risk Score Bar (for scams) */}
          {isScam && (
            <div className="p-3.5 rounded-xl border border-[#ffdad6] bg-[#ffdad5]/20 space-y-2">
              <div className="flex items-center justify-between text-[14px]">
                <span className="font-bold text-[#bc000a] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  AI Threat Probability
                </span>
                <span className="font-bold text-[#bc000a] tabular-nums">
                  {call.riskScore}% Scam Confidence
                </span>
              </div>
              <div className="w-full bg-[#ffdad6] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#bc000a] h-full rounded-full transition-all duration-500"
                  style={{ width: `${call.riskScore}%` }}
                />
              </div>
              <p className="text-[13px] text-[#414755] leading-relaxed pt-1">
                {call.warningDescription ||
                  'The automated caller used pressure tactics and illegal threats of arrest.'}
              </p>
            </div>
          )}

          {/* Audio Intercept / Voice Recording preview */}
          {call.transcriptSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#414755] uppercase tracking-wider">
                  Audio Intercept & Transcript
                </span>
                <button
                  onClick={toggleAudio}
                  className="text-[13px] font-semibold text-[#0058bc] hover:text-[#004ca4] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isPlayingAudio ? 'stop_circle' : 'play_circle'}
                  </span>
                  {isPlayingAudio ? 'Playing snippet...' : 'Play audio (0:34)'}
                </button>
              </div>

              {/* Animated audio bar */}
              {isPlayingAudio && (
                <div className="p-2.5 bg-[#f0edec] rounded-lg flex items-center gap-1.5 justify-center h-10">
                  {[40, 75, 100, 60, 90, 45, 80, 50, 95, 30, 85, 60].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#0058bc] rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 120}ms`,
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="p-3 bg-[#f6f3f2] rounded-xl text-[14px] text-[#1c1b1b] italic border-l-4 border-[#bc000a] leading-relaxed">
                "{call.transcriptSnippet}"
              </div>
            </div>
          )}

          {/* Technical metadata */}
          <div className="border-t border-[#f0edec] pt-3 grid grid-cols-2 gap-2 text-[13px]">
            <div>
              <span className="text-[#414755] block">Carrier Origin:</span>
              <span className="font-semibold text-[#1c1b1b]">
                {call.carrierOrigin || 'Unverified VoIP'}
              </span>
            </div>
            <div>
              <span className="text-[#414755] block">Protected Device:</span>
              <span className="font-semibold text-[#1c1b1b]">
                {call.targetDeviceName || "Mom's Phone"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#fcf9f8] border-t border-[#f0edec] flex flex-col gap-2">
          {isScam && (
            <button
              onClick={() => {
                onClose();
                onReplayIncomingAlert(call);
              }}
              className="w-full h-11 rounded-xl bg-[#bc000a] hover:bg-[#a50009] text-white font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">crisis_alert</span>
              <span>Test Screen Alert for This Call</span>
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setReported(true)}
              disabled={reported}
              className={`flex-1 h-10 rounded-xl border text-[14px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                reported
                  ? 'bg-[#6ffb85]/30 text-[#006e28] border-[#6ffb85]'
                  : 'bg-white text-[#414755] border-[#f0edec] hover:bg-[#f6f3f2]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {reported ? 'check' : 'report'}
              </span>
              {reported ? 'Reported to FTC Radar' : 'Report Number'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-10 rounded-xl bg-[#ebe7e7] hover:bg-[#e5e2e1] text-[#1c1b1b] font-semibold text-[14px] transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

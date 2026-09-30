import React, { useState } from 'react';
import { CallRecord } from '../../types/callshield';

interface RecentCallsScreenProps {
  calls: CallRecord[];
  onBackToHome: () => void;
  onOpenCallDetail: (call: CallRecord) => void;
  onTriggerIncomingCall: (call: CallRecord) => void;
}

export const RecentCallsScreen: React.FC<RecentCallsScreenProps> = ({
  calls,
  onBackToHome,
  onOpenCallDetail,
  onTriggerIncomingCall,
}) => {
  const [filter, setFilter] = useState<'all' | 'scam' | 'family'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalls = calls.filter((call) => {
    if (filter === 'scam' && call.category !== 'scam') return false;
    if (filter === 'family' && call.category !== 'family') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        call.phoneNumber.toLowerCase().includes(q) ||
        (call.callerName && call.callerName.toLowerCase().includes(q)) ||
        (call.scamType && call.scamType.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="relative min-h-full flex flex-col bg-[#fcf9f8] text-[#1c1b1b] select-none">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-[#fcf9f8]/90 backdrop-blur-xl border-b border-[#f0edec]">
        <div className="h-16 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              aria-label="Back to home"
              className="w-9 h-9 rounded-full bg-white border border-[#f0edec] flex items-center justify-center text-[#1c1b1b] hover:bg-[#f6f3f2] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h1 className="font-bold text-[20px] text-[#1c1b1b] tracking-tight">
              Call Log & Activity
            </h1>
          </div>
          <span className="text-[13px] font-medium text-[#006e28] bg-[#6ffb85]/30 px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006e28] inline-block" />
            Shield Active
          </span>
        </div>

        {/* Filter buttons */}
        <div className="px-5 pb-3 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-[14px] font-semibold transition-all whitespace-nowrap ${
              filter === 'all'
                ? 'bg-[#0058bc] text-white shadow-sm'
                : 'bg-white text-[#414755] border border-[#f0edec] hover:bg-[#f6f3f2]'
            }`}
          >
            All Calls ({calls.length})
          </button>
          <button
            onClick={() => setFilter('scam')}
            className={`px-3.5 py-1.5 rounded-lg text-[14px] font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filter === 'scam'
                ? 'bg-[#bc000a] text-white shadow-sm'
                : 'bg-white text-[#414755] border border-[#f0edec] hover:bg-[#f6f3f2]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">phone_disabled</span>
            Blocked Scams ({calls.filter((c) => c.category === 'scam').length})
          </button>
          <button
            onClick={() => setFilter('family')}
            className={`px-3.5 py-1.5 rounded-lg text-[14px] font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              filter === 'family'
                ? 'bg-[#006e28] text-white shadow-sm'
                : 'bg-white text-[#414755] border border-[#f0edec] hover:bg-[#f6f3f2]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            Family Key ({calls.filter((c) => c.category === 'family').length})
          </button>
        </div>
      </header>

      {/* Main List */}
      <main className="flex-1 flex flex-col pt-32 pb-24 px-5">
        {/* Search Bar */}
        <div className="mb-4 relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#717786] text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search phone number or scam type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-white rounded-xl border border-[#f0edec] text-[15px] focus:outline-none focus:border-[#0058bc] shadow-sm placeholder:text-[#717786]"
          />
        </div>

        {filteredCalls.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-[#f0edec] my-6">
            <span className="material-symbols-outlined text-[#717786] text-[40px] mb-2">
              shield_moon
            </span>
            <h3 className="font-bold text-[18px] text-[#1c1b1b]">No calls found</h3>
            <p className="text-[14px] text-[#414755] mt-1">
              No matching call logs in this category.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredCalls.map((call) => {
              const isScam = call.category === 'scam';
              const isFamily = call.category === 'family';

              return (
                <div
                  key={call.id}
                  onClick={() => onOpenCallDetail(call)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-[#f0edec] flex flex-col gap-2.5 cursor-pointer hover:border-[#adc6ff] transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          isScam
                            ? 'bg-[#ffdad6]/60 text-[#ba1a1a]'
                            : isFamily
                            ? 'bg-[#6ffb85]/40 text-[#006e28]'
                            : 'bg-[#ebe7e7] text-[#414755]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[22px]">
                          {isScam
                            ? 'phone_disabled'
                            : isFamily
                            ? 'verified_user'
                            : 'call_received'}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-[16px] text-[#1c1b1b] leading-tight">
                          {isScam
                            ? 'Scam call avoided'
                            : call.callerName || 'Trusted Caller'}
                        </div>
                        <div className="text-[13px] text-[#414755]">
                          {call.timestamp}
                        </div>
                      </div>
                    </div>

                    <span className="material-symbols-outlined text-[#717786] text-[20px]">
                      chevron_right
                    </span>
                  </div>

                  {/* Phone container */}
                  <div className="bg-[#f6f3f2] rounded-lg p-2.5 flex items-center justify-between">
                    <span className="text-[16px] text-[#1c1b1b] font-bold tracking-wide tabular-nums">
                      {call.phoneNumber}
                    </span>
                    <span
                      className={`text-[12px] px-2.5 py-0.5 rounded-full font-bold ${
                        isScam
                          ? 'text-[#ba1a1a] bg-[#ffdad6]'
                          : isFamily
                          ? 'text-[#006e28] bg-[#6ffb85]/50'
                          : 'text-[#0058bc] bg-[#adc6ff]/50'
                      }`}
                    >
                      {call.status}
                    </span>
                  </div>

                  {/* Label / reason */}
                  <div className="flex items-center justify-between text-[13px] pt-0.5">
                    <div className="flex items-center gap-1.5 text-[#414755]">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isScam ? 'text-[#bc000a]' : 'text-[#006e28]'
                        }`}
                      >
                        {isScam ? 'warning' : 'lock'}
                      </span>
                      <span className="font-medium truncate max-w-[200px]">
                        {call.scamType || call.warningTitle || 'Family Pass Connected'}
                      </span>
                    </div>

                    {isScam && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTriggerIncomingCall(call);
                        }}
                        className="text-[12px] text-[#0058bc] font-semibold hover:underline flex items-center gap-1"
                        title="Replay Alert"
                      >
                        <span className="material-symbols-outlined text-[14px]">replay</span>
                        Replay
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Fixed Bottom Tab Bar */}
      <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#fcf9f8]/90 backdrop-blur-xl border-t border-[#f0edec] shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-around h-18 px-6">
          <button
            onClick={onBackToHome}
            className="flex flex-col items-center justify-center min-w-[64px] min-h-[52px] text-[#414755] hover:text-[#1c1b1b] transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">shield</span>
            <span className="text-[13px] mt-0.5">Home</span>
          </button>

          <button className="flex flex-col items-center justify-center min-w-[64px] min-h-[52px] text-[#0058bc] font-semibold transition-colors">
            <span
              className="material-symbols-outlined text-[26px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              call_log
            </span>
            <span className="text-[13px] mt-0.5">Recent Calls</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

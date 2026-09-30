import React from 'react';

interface MobileShellProps {
  children: React.ReactNode;
  framed?: boolean;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children, framed = true }) => {
  if (!framed) {
    return <div className="w-full min-h-screen bg-[#fcf9f8]">{children}</div>;
  }

  return (
    <div className="relative mx-auto my-4 w-full max-w-[400px] h-[860px] bg-[#1c1b1b] rounded-[48px] p-3 shadow-2xl ring-1 ring-black/10 select-none">
      {/* Outer Phone Hardware Bezel */}
      <div className="relative w-full h-full bg-[#fcf9f8] rounded-[38px] overflow-hidden flex flex-col border border-black/10">
        {/* Dynamic Island / Hardware Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 w-28 h-6 bg-black rounded-full flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-[#333]" />
        </div>

        {/* Realistic Mobile Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-40 h-10 px-6 flex items-center justify-between text-[13px] font-bold text-[#1c1b1b] pointer-events-none">
          <span className="tabular-nums tracking-tight">2:41</span>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[16px]">wifi</span>
            <span className="material-symbols-outlined text-[18px]">battery_full</span>
          </div>
        </div>

        {/* Phone Content Screen */}
        <div className="w-full h-full flex flex-col overflow-y-auto">
          {children}
        </div>

        {/* Bottom Gesture Home Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-50 w-32 h-1 bg-black/30 rounded-full pointer-events-none" />
      </div>
    </div>
  );
};

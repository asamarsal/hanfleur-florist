import { Check } from 'lucide-react'

interface PhotoboxStepperProps {
  currentStep: 1 | 2 | 3;
  onStepClick?: (step: number) => void;
}

export function PhotoboxStepper({ currentStep, onStepClick }: PhotoboxStepperProps) {
  const steps = [
    { num: 1, label: 'Preview' },
    { num: 2, label: 'Edit Foto' },
    { num: 3, label: 'Desain' },
  ];

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 shrink-0 w-full max-w-[600px] mx-auto">
      {steps.map((step, idx) => {
        const isActive = currentStep === step.num;
        const isPast = currentStep > step.num;
        const isClickable = isPast && onStepClick;

        return (
          <div key={step.num} className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                if (isClickable) onStepClick(step.num);
              }}
              disabled={!isClickable}
              className={`flex items-center justify-center gap-1.5 px-2 sm:px-4 py-1.5 rounded-full transition-all duration-300 w-[100px] sm:w-[130px] ${
                isActive 
                  ? 'bg-white shadow-sm border border-pink-200' 
                  : isClickable 
                    ? 'border border-transparent opacity-70 hover:opacity-100 cursor-pointer group' 
                    : 'border border-transparent opacity-60 cursor-default'
              }`}
            >
              <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                isActive
                  ? 'bg-[#ff3a70] text-white shadow-sm'
                  : isPast
                    ? 'bg-transparent border-2 border-gray-300 text-gray-400 group-hover:border-[#ff3a70] group-hover:text-[#ff3a70]'
                    : 'bg-transparent border-2 border-gray-300 text-gray-400'
              }`}>
                {isPast ? <Check className="h-3 w-3" /> : step.num}
              </div>
              <span className={`font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? 'text-[#ff3a70]'
                  : isPast
                    ? 'text-gray-500 group-hover:text-[#ff3a70]'
                    : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </button>

            {idx < steps.length - 1 && (
              <div className="h-[1px] w-4 sm:w-12 border-t-2 border-dashed border-pink-200 shrink-0"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

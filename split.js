const fs = require('fs');
const path = require('path');

const pageFile = 'components/dialog/custombouquet-dialog/page.tsx';
const content = fs.readFileSync(pageFile, 'utf-8');
const lines = content.split('\n');

function extractBlock(startMarker, nextMarker) {
  const startIdx = lines.findIndex(l => l.includes(startMarker));
  const nextIdx = nextMarker ? lines.findIndex((l, i) => i > startIdx && l.includes(nextMarker)) : lines.findIndex(l => l.includes('{/* Bottom Sticky Bar */}'));
  
  // The block is between startIdx and nextIdx.
  // The block starts with `{step === X && (`
  // and ends with `)}`
  
  // Extract lines inside the condition
  const blockLines = lines.slice(startIdx + 1, nextIdx);
  // Remove the trailing `)}` and `</div>` from the previous block if nextMarker is there, wait actually the nextIdx points to the next `{step ===` or `Bottom Sticky Bar`.
  // So the block ends with `)}`
  let end = blockLines.length - 1;
  while(end > 0 && !blockLines[end].includes(')}')) {
    end--;
  }
  return blockLines.slice(0, end).join('\n');
}

const step1 = extractBlock('{step === 1 && (', '{step === 2 && (');
const step2 = extractBlock('{step === 2 && (', '{step === 3 && (');
const step3 = extractBlock('{step === 3 && (', '{step === 4 && (');
const step4 = extractBlock('{step === 4 && (', '{/* Bottom Sticky Bar */}');

const imports = `import React from 'react'
import Image from 'next/image'
import {
  ChevronDown,
  ChevronUp,
  Headphones,
  Check,
  MoreHorizontal,
  Upload,
  User,
  MessageCircle,
  Home,
  Building,
  FileText,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Mail,
  Clipboard,
  Pencil,
} from 'lucide-react'
import { cn } from '@/lib/utils'

`;

fs.mkdirSync('components/dialog/custombouquet-dialog/page', { recursive: true });

fs.writeFileSync('components/dialog/custombouquet-dialog/page/step-1.tsx', imports + `export function Step1Detail({ form, setForm, showConsult, setShowConsult }: any) {\n  return (\n${step1}\n  )\n}\n`);
fs.writeFileSync('components/dialog/custombouquet-dialog/page/step-2.tsx', imports + `export function Step2Tambahan({ form, setForm }: any) {\n  return (\n${step2}\n  )\n}\n`);
fs.writeFileSync('components/dialog/custombouquet-dialog/page/step-3.tsx', imports + `export function Step3Pengiriman({ form, setForm }: any) {\n  return (\n${step3}\n  )\n}\n`);
fs.writeFileSync('components/dialog/custombouquet-dialog/page/step-4.tsx', imports + `export function Step4Konfirmasi({ form, setStep }: any) {\n  return (\n${step4}\n  )\n}\n`);

// Now modify page.tsx
const startIdx = lines.findIndex(l => l.includes('{/* Content Steps */}'));
const endIdx = lines.findIndex(l => l.includes('{/* Bottom Sticky Bar */}'));

const newPageLines = [
  ...lines.slice(0, startIdx + 1),
  `          {step === 1 && <Step1Detail form={form} setForm={setForm} showConsult={showConsult} setShowConsult={setShowConsult} />}`,
  `          {step === 2 && <Step2Tambahan form={form} setForm={setForm} />}`,
  `          {step === 3 && <Step3Pengiriman form={form} setForm={setForm} />}`,
  `          {step === 4 && <Step4Konfirmasi form={form} setStep={setStep} />}`,
  `        </div>`, // closes flex-1
  ``,
  ...lines.slice(endIdx)
];

let newPageContent = newPageLines.join('\n');
newPageContent = `import { Step1Detail } from './page/step-1'\nimport { Step2Tambahan } from './page/step-2'\nimport { Step3Pengiriman } from './page/step-3'\nimport { Step4Konfirmasi } from './page/step-4'\n` + newPageContent;

fs.writeFileSync(pageFile, newPageContent);
console.log('Done splitting!');

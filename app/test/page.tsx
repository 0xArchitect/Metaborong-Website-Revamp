import ASCIIText from '@/components/ASCIIText';
export default function TestPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <ASCIIText
        text="M"
        textColor="#204AF8"
        asciiFontSize={8}
        imageSrc="/logo.png"
      />
    </div>
  );
}
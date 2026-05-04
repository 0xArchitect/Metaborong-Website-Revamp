import ASCIIText from '@/components/ASCIIText';

export default function TestPage2() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <ASCIIText
        text="M"
        textColor="#204AF8"
        asciiFontSize={8}
        imageSrc="/logo.png"
        charset=" abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      />
    </div>
  );
}

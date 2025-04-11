import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin  text-ethLime-300 " />
    </div>
  );
}

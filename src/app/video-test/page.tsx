import { HLSPlayer } from "@/components/video/HLSPlayer";

export default function VideoTestPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-bold">
        HLS Test
      </h1>

      <HLSPlayer
        src="http://localhost:8080/master.m3u8"
      />
    </main>
  );
}

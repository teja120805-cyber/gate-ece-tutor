// Visual identity per GATE EC subject: an icon and a decorative tone (not a data encoding).
import { Lightbulb, Sigma, CircuitBoard, AudioWaveform, Atom, Activity, Binary, Gauge, RadioTower, Magnet, BookOpen } from "lucide-react";
import type { Tone } from "@/components/ui";

type IconT = React.ComponentType<{ className?: string }>;
const META: Record<string, { icon: IconT; tone: Tone }> = {
  ga: { icon: Lightbulb, tone: "amber" },
  math: { icon: Sigma, tone: "violet" },
  net: { icon: CircuitBoard, tone: "sky" },
  ss: { icon: AudioWaveform, tone: "indigo" },
  edc: { icon: Atom, tone: "teal" },
  analog: { icon: Activity, tone: "rose" },
  dig: { icon: Binary, tone: "emerald" },
  ctrl: { icon: Gauge, tone: "orange" },
  comm: { icon: RadioTower, tone: "fuchsia" },
  em: { icon: Magnet, tone: "blue" },
};

export function subjectMeta(id: string | undefined | null): { icon: IconT; tone: Tone } {
  return (id && META[id]) || { icon: BookOpen, tone: "slate" };
}

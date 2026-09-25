import { DecupadorLab } from "./labs/decupador-lab";
import { PastasLab } from "./labs/pastas-lab";
import { AssetsLab } from "./labs/assets-lab";
import { DirecaoLab } from "./labs/direcao-lab";
import { TimelineLab } from "./labs/timeline-lab";

export function CourseLab({ phaseNumber }: { phaseNumber: number }) {
  switch (phaseNumber) {
    case 1:
      return <DecupadorLab />;
    case 2:
      return <PastasLab />;
    case 3:
      return <AssetsLab />;
    case 4:
      return <DirecaoLab />;
    case 5:
      return <TimelineLab />;
    default:
      return null;
  }
}

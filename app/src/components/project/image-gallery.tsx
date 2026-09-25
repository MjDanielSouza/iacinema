import Image from "next/image";
import { uploadProjectImage, deleteProjectAsset } from "@/app/projetos/actions";

interface ImageItem {
  id: string;
  url: string;
  label: string | null;
}

export function ImageGallery({
  projectId,
  phaseNumber,
  images,
}: {
  projectId: string;
  phaseNumber: number;
  images: ImageItem[];
}) {
  return (
    <div className="bg-[#0D0E12] border border-white/10 rounded-xl p-4">
      <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-3">
        Imagens de Referência
      </span>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {images.map((img) => (
            <div key={img.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-white/10 bg-[#050507] relative">
                <Image
                  src={img.url}
                  alt={img.label ?? ""}
                  fill
                  sizes="200px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="text-[11px] text-zinc-500 truncate mt-1">{img.label}</p>
              <form
                action={deleteProjectAsset.bind(null, img.id, projectId, phaseNumber, null)}
              >
                <button className="absolute top-1 right-1 text-[10px] bg-black/70 text-red-300 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  remover
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      <form action={uploadProjectImage} className="flex flex-col gap-2">
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="phaseNumber" value={phaseNumber} />
        <input
          type="text"
          name="label"
          placeholder="Descrição da imagem (opcional)"
          className="bg-[#050507] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200"
        />
        <div className="flex gap-2">
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            className="flex-1 text-xs text-zinc-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#14151B] file:text-zinc-300 file:text-xs"
          />
          <button className="px-4 py-2 rounded-lg bg-amber-500 text-[#050507] font-semibold text-xs shrink-0">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

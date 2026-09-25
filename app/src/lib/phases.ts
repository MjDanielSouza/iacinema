export interface TheoryCard {
  title: string;
  body: string;
  accent: "amber" | "cyan" | "purple" | "rose";
}

export interface PhaseMeta {
  number: 1 | 2 | 3 | 4 | 5;
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  objective: string;
  imagePrompt: string;
  theoryCards: TheoryCard[];
  checklistItems: string[];
}

export const PHASES: PhaseMeta[] = [
  {
    number: 1,
    slug: "roteiro-e-decupagem",
    kicker: "Fase 1 de 5 — Pré-Produção Narrativa",
    title: "Roteiro e Decupagem Inicial",
    subtitle: "Story & Script Breakdown",
    objective:
      "Extrair do roteiro os dados brutos — estilo visual, locais, personagens, artefatos, ação e falas — que vão guiar toda a produção com IA.",
    imagePrompt:
      "Cinematic concept art of a movie director's desk in a dimly lit studio, glowing digital tablet displaying a formatted screenplay with color-coded breakdown highlights for characters, locations, and props, holographic storyboards floating slightly above, warm tungsten desk lamp contrasting with cyan screen glow, 35mm anamorphic lens style, photorealistic, 8k --ar 16:9",
    theoryCards: [
      {
        title: "1. Definição de Estilo (Look & Tone)",
        body: "A estética macro que guia toda a obra — ex.: Cyberpunk Noir, Animação 3D Estilizada, Realismo Anamórfico Anos 70. É a “bússola visual” de todos os prompts que virão depois.",
        accent: "amber",
      },
      {
        title: "2. Cabeçalho e Locais (Sluglines)",
        body: "Onde a cena acontece (INT./EXT., local, período do dia) e a atmosfera do ambiente. Define o Set que será gerado na Fase 3.",
        accent: "cyan",
      },
      {
        title: "3. Descrição de Personagens",
        body: "Características físicas fixas, idade, expressões e personalidade — a base do Character Sheet consistente.",
        accent: "amber",
      },
      {
        title: "4. Elementos de Cena e Artefatos",
        body: "Menção clara a objetos importantes (Props) e veículos que entram em cada cena — tudo que precisa ser gerado isoladamente.",
        accent: "purple",
      },
      {
        title: "5. Ação e Falas (Diálogos)",
        body: "O que acontece fisicamente na cena e o que é dito — a matéria-prima da direção de cena na Fase 4.",
        accent: "rose",
      },
    ],
    checklistItems: [
      "Identifiquei corretamente todos os personagens mencionados no roteiro.",
      "Marquei os locais/sets e reconheço a slugline como definidora de ambiente.",
      "Listei ao menos dois artefatos (props) citados nas cenas.",
    ],
  },
  {
    number: 2,
    slug: "pesquisa-e-direcao-de-arte",
    kicker: "Fase 2 de 5 — Pré-Produção Visual",
    title: "Pesquisa, Direção de Arte e Pastas de Referência",
    subtitle: "Research & Art Department",
    objective:
      "Curar referências visuais do roteiro decupado e organizá-las em uma estrutura rígida de pastas — nada é gerado ainda.",
    imagePrompt:
      "Wide shot of a modern film production war room and art department wall covered in organized moodboards, reference photographs of character faces, period costumes, vintage motorcycles, medieval swords, and architectural locations connected by organized labels, digital folder structure projected on a sleek ultrawide monitor, cinematic lighting, 8k --ar 16:9",
    theoryCards: [
      {
        title: "Referências de Personagens",
        body: "Rostos, biotipos, expressões e detalhes de cabelo/maquiagem que fixam a identidade visual do personagem.",
        accent: "amber",
      },
      {
        title: "Figurino por Cena (Wardrobe)",
        body: "Referências exatas das roupas que o personagem usará em cada momento específico da história.",
        accent: "cyan",
      },
      {
        title: "Referências de Locais (Location Scouting)",
        body: "Fotos de arquitetura, iluminação ambiental, texturas de parede e paisagens.",
        accent: "purple",
      },
      {
        title: "Artefatos — Props e Veículos",
        body: "Armas, espadas, amuletos, carros, motos ou objetos especiais com destaque narrativo.",
        accent: "rose",
      },
    ],
    checklistItems: [
      "Organizei referências nas 5 categorias (roteiro, personagens, figurinos, locais, artefatos).",
      "Reconheço a diferença entre referência de figurino por cena e referência geral de personagem.",
      "Salvei pelo menos um artefato/prop de referência.",
    ],
  },
  {
    number: 3,
    slug: "criacao-de-assets",
    kicker: "Fase 3 de 5 — Criação de Assets",
    title: "Engenharia de Prompts e Criação de Assets",
    subtitle: "Character Sheets, Sets & Props",
    objective:
      "Transformar roteiro + referências em Assets de Produção isolados, gerados fora de cena para garantir raccord.",
    imagePrompt:
      "Split-screen technical showcase of AI filmmaking assets on a sleek dark interface: on the left, a full-body character turnaround sheet showing the same character in three different scene-specific outfits with accessories; in the center, isolated high-detail 3D prop renders of a futuristic motorcycle and an ancient sword; on the right, an empty cinematic environment clean plate set, studio presentation, 8k --ar 16:9",
    theoryCards: [
      {
        title: "Character Sheets por Cena",
        body: "Ficha de personagem com raccord de figurino: frente, perfil, corpo inteiro, fundo neutro, já vestindo a roupa e acessórios daquela cena específica.",
        accent: "amber",
      },
      {
        title: "Sets / Clean Plates",
        body: "Cenários vazios onde as cenas vão acontecer, respeitando a direção de arte e a iluminação planejada.",
        accent: "cyan",
      },
      {
        title: "Artefatos Isolados",
        body: "Objetos específicos (espadas, carros, tambores, armas) gerados a partir de referência + descrição do roteiro, prontos para uso.",
        accent: "purple",
      },
    ],
    checklistItems: [
      "Montei o prompt de Character Sheet combinando referência base + figurino da cena + acessório.",
      "Gerei o prompt de um Set/Cenário limpo (Clean Plate) para uma das cenas.",
      "Gerei o prompt de um Artefato/Prop isolado pronto para uso em cena.",
    ],
  },
  {
    number: 4,
    slug: "direcao-de-cena-e-video",
    kicker: "Fase 4 de 5 — Produção",
    title: "Direção de Cena, Fotografia e Geração de Vídeo",
    subtitle: "Principal Photography em IA",
    objective:
      "Unir Set + Character Sheet + Artefatos como insumos visuais e dirigir a cena com blocking, câmera e diálogo — sem redescrever o que a IA já recebeu como referência.",
    imagePrompt:
      "Cinematic behind-the-scenes visualization of AI video generation: a digital film set where a pre-designed character asset, a vintage car prop, and a desert camp background layer merge seamlessly into a live moving cinema frame, virtual cinema camera rig showing dolly movement arrows and lens focal length HUD, dramatic golden hour lighting, 8k --ar 16:9",
    theoryCards: [
      {
        title: "O que NÃO colocar no prompt",
        body: "Não descreva de novo o cenário nem como o personagem está vestido — a IA de vídeo já recebe o Set e o Character Sheet prontos como referência. Reescrever isso gera conflito e perda de consistência.",
        accent: "rose",
      },
      {
        title: "O que COLOCAR no prompt",
        body: "Blocking e ação física (o que o personagem faz e como interage com o cenário/artefato) e fotografia/câmera (enquadramento e movimento — Dolly In, Tracking Shot, Panorâmica, Handheld).",
        accent: "cyan",
      },
    ],
    checklistItems: [
      "Entendi por que não devemos redescrever roupa e cenário no prompt de vídeo.",
      "Escolhi um movimento de câmera e uma ação física coerente com a cena.",
      "Comparei o prompt redundante com o prompt técnico correto.",
    ],
  },
  {
    number: 5,
    slug: "pos-producao",
    kicker: "Fase 5 de 5 — Pós-Produção",
    title: "Montagem, Sound Design e Finalização",
    subtitle: "Post-Production & Finishing",
    objective:
      "Transformar os takes brutos da Fase 4 em um filme com ritmo, voz definitiva, atmosfera sonora e unidade visual.",
    imagePrompt:
      "Professional post-production color grading and editing suite in a dark room, ultrawide curved monitor displaying a multi-track video timeline, audio waveforms for ADR dubbing and sound design, and color wheels with a cinematic scene on the reference display, sleek studio speakers and control surface panel on the desk, moody ambient lighting, 8k --ar 16:9",
    theoryCards: [
      {
        title: "Montagem e Decupagem de Takes",
        body: "Cortar os vídeos gerados, aproveitar os melhores segundos de cada geração, estabelecer ritmo narrativo e continuidade de movimento entre cortes.",
        accent: "amber",
      },
      {
        title: "Voz, Dublagem e Lip-Sync (ADR)",
        body: "Substituir ou gerar vozes definitivas para os diálogos, aplicar dublagem com timbre específico e sincronizar os lábios.",
        accent: "cyan",
      },
      {
        title: "Sound Design e Foley",
        body: "Paisagem sonora (passos, motor, vento, impacto) e trilha musical que dão peso real às imagens geradas por IA.",
        accent: "purple",
      },
      {
        title: "Color Grading e Finalização (DI)",
        body: "Correção de cor, LUTs, granulação de película (Film Grain) e uniformização para parecer que tudo foi filmado pela mesma câmera.",
        accent: "rose",
      },
    ],
    checklistItems: [
      "Apliquei o corte de takes na trilha de vídeo (V1).",
      "Ativei a camada de dublagem/ADR e de sound design (A1/A2).",
      "Apliquei o color grading cinematográfico e finalizei o master do filme.",
    ],
  },
];

export function getPhase(number: number): PhaseMeta | undefined {
  return PHASES.find((p) => p.number === number);
}

export const ACCENT_CLASSES: Record<TheoryCard["accent"], string> = {
  amber: "text-amber-300",
  cyan: "text-lime",
  purple: "text-purple-300",
  rose: "text-rose-300",
};

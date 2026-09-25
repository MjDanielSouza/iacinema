export interface Scene {
  id: 1 | 2 | 3;
  name: string;
  character: string;
  actorBase: string;
  figurino: string;
  acessorio: string;
  setName: string;
  setDesc: string;
  prop: string;
  propDesc: string;
}

export const SCENES: Scene[] = [
  {
    id: 1,
    name: "Cena 01 — Confronto no Galpão",
    character: "Rafael",
    actorBase:
      "homem, 35 anos, rosto anguloso, cicatriz na sobrancelha esquerda, cabelo curto castanho escuro",
    figurino:
      "jaqueta de couro marrom surrada sobre camisa cinza, calça jeans escura, botas de trilha",
    acessorio: "lanterna a querosene na mão direita",
    setName: "Galpão Abandonado à Noite",
    setDesc:
      "interior de um galpão industrial abandonado, vigas de metal enferrujadas, luar entrando por venezianas quebradas, poeira suspensa no ar",
    prop: "Lanterna a Querosene Antiga",
    propDesc:
      "lanterna de metal envelhecido com vidro trincado, chama alaranjada tênue, estilo vintage industrial",
  },
  {
    id: 2,
    name: "Cena 02 — A Perseguição",
    character: "Rafael",
    actorBase:
      "homem, 35 anos, rosto anguloso, cicatriz na sobrancelha esquerda, cabelo curto castanho escuro",
    figurino:
      "jaqueta tática cinza-escura, colete com bolsos utilitários, calça cargo preta, coturno tático",
    acessorio: "motocicleta custom enferrujada",
    setName: "Beco Industrial Chuvoso",
    setDesc:
      "beco estreito entre galpões, chão molhado refletindo luzes de neon distante, fiação exposta nas paredes",
    prop: "Motocicleta Custom Enferrujada",
    propDesc:
      "motocicleta estilo bobber com ferrugem controlada, tanque pintado de preto fosco, escapamento cromado",
  },
  {
    id: 3,
    name: "Cena 03 — O Confronto Final",
    character: "Marina",
    actorBase:
      "mulher, 28 anos, cabelo curto grisalho, olhar determinado, estrutura atlética",
    figurino: "jaqueta tática cinza, camiseta preta, calça cargo, luvas sem dedos",
    acessorio: "chave de fenda segurada como arma improvisada",
    setName: "Telhado do Galpão ao Amanhecer",
    setDesc:
      "telhado industrial com dutos de ventilação, luz alaranjada do amanhecer, silhuetas da cidade ao fundo",
    prop: "Chave de Fenda Industrial",
    propDesc:
      "chave de fenda robusta de cabo amarelo desgastado, ponta metálica arranhada, aparência de ferramenta usada em combate improvisado",
  },
];

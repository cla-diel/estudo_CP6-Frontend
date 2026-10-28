// ============================================================
//  TODAS AS FALAS DO OWLBERT ficam aqui. É o arquivo para você editar!
//
//  Marcadores que o jogo troca sozinho:
//    {nome}     → nome da pessoa
//    {resposta} → o que a pessoa escreveu na pergunta
//    {rotulo}   → assunto de uma resposta antiga (usado nas lembranças)
//
//  Cada PERGUNTA tem:
//    id, nivel (1 a 4), texto
//    opcoes:  [{ texto, reacao, coruja?, humor? }]        → botões prontos
//    OU entrada: placeholder + reacao (com {resposta})     → campo para escrever
//    guardar + rotulo → o Owlbert lembra dessa resposta em visitas futuras
//
//  Níveis: 1 = coringas leves · 2 = pessoais leves · 3 = emocionais · 4 = profundas
//  O jogo começa no nível 1 e vai aprofundando a cada 3 respostas (somando todas as visitas).
//  Dentro de cada nível a ordem é sorteada: nunca é a mesma sequência.
//
//  Humor (fundo): 'noite' | 'profundo' | 'quente' | 'alegre'
//  Coruja: 'normal' | 'feliz' | 'triste' | 'surpresa'
//  Escreva sem definir gênero (nem da coruja, nem da pessoa).
// ============================================================

export const NOME_CORUJA = 'Owlbert'

// ---------- Primeira visita ----------
export const ABERTURA = {
  texto: 'Oi... você chegou na minha torre. Eu estava te esperando.',
  opcoes: [
    {
      texto: 'Posso ficar um pouquinho?',
      reacao: {
        texto: `Claro que pode! Faz tempo que ninguém sobe todos esses degraus. Pode me chamar de ${NOME_CORUJA}.`,
        coruja: 'feliz',
        humor: 'quente',
      },
    },
    {
      texto: 'Por que você mora aqui, longe de tudo?',
      reacao: {
        texto:
          'Você diz que moro longe de tudo. Eu não diria assim; tenho a lua, o vento e o sino da torre. Mas admito: conversar é bem melhor.',
        coruja: 'normal',
        humor: 'profundo',
      },
    },
  ],
  pedirNome: { texto: 'Mas chega de falar de mim. E você, como se chama?', placeholder: 'seu nome' },
  apresentacao: '{nome}... que nome bonito. Vou guardar ele aqui, bem pertinho do coração.',
}

// ---------- Quando a pessoa volta (por tempo de ausência, em horas) ----------
// festa: 0 = sem festa · 1 = festa · 2 = festa grande
export const VOLTAS = [
  { ate: 1, festa: 0, texto: 'Você voltou rápido, {nome}! Gosto disso.' },
  { ate: 12, festa: 1, texto: '{nome}! Que bom te ver de novo. A torre ficou mais quentinha agora.' },
  { ate: 48, festa: 1, texto: '{nome}! Eu fiquei olhando a escada da torre, esperando você. Que alegria!' },
  { ate: Infinity, festa: 2, texto: '{nome}!!! Faz dias! Contei as luas uma por uma. Senti muita saudade!' },
]

// ---------- Como a pessoa está (leve: true deixa as perguntas mais leves hoje) ----------
export const COMO_ESTA = {
  texto: 'Me conta, como você está hoje?',
  opcoes: [
    {
      texto: 'Estou bem',
      reacao: { texto: 'Que bom! Então vamos conversar com a cabeça leve.', coruja: 'feliz', humor: 'alegre' },
    },
    {
      texto: 'Mais ou menos',
      reacao: { texto: 'Então vamos devagar. Sem pressa nenhuma.', coruja: 'normal', humor: 'profundo' },
    },
    {
      texto: 'Está difícil hoje',
      leve: true,
      reacao: { texto: 'Então hoje a gente vai com calma, e eu fico bem pertinho.', coruja: 'triste', humor: 'profundo' },
    },
  ],
}

// ---------- Frases que antecedem cada pergunta (sorteadas) ----------
export const PONTES = [
  'Hmm... deixa eu pensar numa pergunta.',
  'Agora me bateu uma curiosidade:',
  'Posso te perguntar uma coisa?',
  'Tem uma coisa que eu queria saber:',
  'Fiquei pensando aqui na torre...',
  'Me conta uma coisa:',
  'O vento acabou de me trazer outra ideia:',
  'Enquanto a lanterna dança, fiquei pensando...',
  'Adoro descobrir esses pedacinhos da sua história. E esta:',
  'Mais uma pergunta, sem pressa:',
  'A noite ainda guarda uma curiosidade:',
  'Quero conhecer mais um cantinho do seu mundo:',
]

// ---------- Depois de 3 perguntas na mesma visita ----------
export const MAIS_UMA = {
  continuar: 'Pode perguntar mais',
  encerrar: 'Por hoje é só',
}

export const DESPEDIDA = {
  texto:
    'O sino vai tocar logo, {nome}. Fico feliz que você tenha subido até aqui. A lanterna fica acesa para quando você voltar.',
  botao: 'Ficar mais um pouco',
}

// ---------- Lembrança de uma resposta antiga ----------
export const LEMBRANCA = {
  texto:
    'Fiquei pensando numa coisa que você me contou. Sobre {rotulo}, você disse: “{resposta}”. E hoje, como está isso?',
  opcoes: [
    { texto: 'Continua assim', reacao: 'Algumas coisas ficam, e ainda bem.' },
    { texto: 'Mudou um pouco', reacao: 'Mudar também é um jeito de crescer.' },
    { texto: 'Prefiro não falar disso', reacao: 'Sem problemas. Esta torre guarda silêncios também.' },
  ],
}

// ---------- Cuidado: se a pessoa escrever algo muito pesado ----------
export const PADRAO_CUIDADO =
  /(me matar|suic[ií]d|morrer|n[aã]o quero (mais )?viver|me machucar|acabar com (tudo|a minha vida)|sumir para sempre)/i

export const CUIDADO = {
  texto:
    'Que bom que você me contou isso. Eu sou só uma coruja de torre, e você merece alguém de verdade por perto. Se estiver pesado demais, ligue para o CVV no 188 (gratuito, 24 horas) ou procure uma pessoa de confiança. Eu continuo aqui.',
  opcoes: [
    { texto: 'Quero continuar conversando', reacao: 'Então vamos com calma. Uma coisa de cada vez.' },
    { texto: 'Por hoje é só', reacao: null },
  ],
}

// ============================================================
//  BANCO DE PERGUNTAS
// ============================================================
export const PERGUNTAS = [
  // ---------- NÍVEL 1: coringas leves ----------
  {
    id: 'comida',
    nivel: 1,
    texto: 'Se você só pudesse comer uma coisa a semana inteira, o que seria?',
    opcoes: [
      { texto: 'Algo doce', reacao: 'Doce! Aposto que você sabe a hora exata em que o brigadeiro chama.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Algo salgado', reacao: 'Salgado! Eu sou mais de ratinho, mas respeito.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Depende do dia', reacao: 'Depende do dia... isso é ser flexível. Gosto!', coruja: 'feliz', humor: 'quente' },
    ],
  },
  {
    id: 'periodo',
    nivel: 1,
    texto: 'Você é mais de dia ou de noite?',
    opcoes: [
      { texto: 'De dia', reacao: 'De dia! Então a gente se completa: eu cuido da noite.', coruja: 'feliz', humor: 'quente' },
      { texto: 'De noite', reacao: 'De noite! Então somos da mesma turma.', coruja: 'feliz', humor: 'noite' },
      { texto: 'Dos dois', reacao: 'Dos dois... que equilíbrio bonito.', coruja: 'normal', humor: 'quente' },
    ],
  },
  {
    id: 'idade',
    nivel: 1,
    texto: 'Posso perguntar em que fase da vida você está? Pode escolher uma faixa ou preferir não dizer.',
    opcoes: [
      { texto: 'Até 17 anos', reacao: 'Ainda há tantos caminhos se abrindo. Espero que esta torre seja um cantinho tranquilo para você.', coruja: 'feliz', humor: 'quente' },
      { texto: '18 a 29 anos', reacao: 'Uma fase cheia de descobertas e mudanças para muita gente. Cada pessoa encontra o próprio ritmo.', coruja: 'normal', humor: 'quente' },
      { texto: '30 a 49 anos', reacao: 'Cada história tem seu tempo. Gosto de imaginar quantos capítulos você já escreveu.', coruja: 'feliz', humor: 'noite' },
      { texto: '50 anos ou mais', reacao: 'Há muita vida e experiência em cada caminho. Obrigado por dividir um pedacinho do seu com esta coruja.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Prefiro não dizer', reacao: 'Claro, você não precisa contar nada que não queira. O importante é você estar confortável aqui.', coruja: 'normal', humor: 'profundo' },
    ],
  },
  {
    id: 'cheiro',
    nivel: 1,
    texto: 'Que cheiro traz uma sensação boa para você?',
    opcoes: [
      { texto: 'Terra molhada', reacao: 'Depois da chuva, até a torre parece respirar mais devagar.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Comida feita em casa', reacao: 'Esse cheiro parece um abraço chegando antes de todo mundo.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Flores ou mato', reacao: 'A natureza tem um jeito bonito de nos trazer de volta para o presente.', coruja: 'normal', humor: 'quente' },
      { texto: 'Outro cheiro', reacao: 'Cada lembrança tem seu próprio perfume. Aposto que esse tem uma história.', coruja: 'normal', humor: 'noite' },
    ],
  },
  {
    id: 'viagem',
    nivel: 1,
    texto: 'Se pudesse aparecer em qualquer lugar agora, onde seria?',
    placeholder: 'um lugar',
    reacao: 'Um lugar assim pode dizer bastante sobre o que a gente está precisando.',
  },
  {
    id: 'musica',
    nivel: 1,
    texto: 'Que tipo de música combina com a sua noite de hoje?',
    opcoes: [
      { texto: 'Uma música animada', reacao: 'Então vou imaginar a torre inteira acompanhando o ritmo!', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Uma música bem tranquila', reacao: 'Uma melodia calma pode fazer companhia sem pedir nada em troca.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Algo que me faça lembrar de alguém', reacao: 'Tem canções que guardam pessoas inteiras dentro delas.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Prefiro o silêncio', reacao: 'O silêncio também tem sua própria música, principalmente aqui no alto.', coruja: 'normal', humor: 'noite' },
    ],
  },
  {
    id: 'estacao',
    nivel: 1,
    texto: 'Qual estação do ano parece mais com você hoje?',
    opcoes: [
      { texto: 'Verão', reacao: 'Verão tem essa energia de deixar as janelas abertas para o mundo.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Outono', reacao: 'Outono ensina que mudar também pode ser bonito.', coruja: 'normal', humor: 'quente' },
      { texto: 'Inverno', reacao: 'Inverno pede aconchego e um lugar quentinho para pousar.', coruja: 'feliz', humor: 'noite' },
      { texto: 'Primavera', reacao: 'Primavera sempre encontra um jeito de começar de novo.', coruja: 'feliz', humor: 'alegre' },
    ],
  },
  {
    id: 'passeio',
    nivel: 1,
    texto: 'Para um passeio sem pressa, você escolheria...',
    opcoes: [
      { texto: 'Um parque', reacao: 'Caminhar entre árvores ajuda o mundo a falar mais baixo.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Uma rua movimentada', reacao: 'Cada esquina guarda uma história diferente para observar.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Um lugar perto da água', reacao: 'Água em movimento tem um jeito próprio de acalmar.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Ficar em casa', reacao: 'Um passeio para dentro de casa também pode ser perfeito.', coruja: 'normal', humor: 'quente' },
    ],
  },
  {
    id: 'criatura',
    nivel: 1,
    texto: 'Se pudesse ter uma companhia mágica, qual escolheria?',
    opcoes: [
      { texto: 'Um dragão pequenino', reacao: 'Um dragão pequeno e corajoso caberia muito bem nesta torre.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Uma raposa que fala', reacao: 'Uma raposa falante com certeza conheceria muitos caminhos secretos.', coruja: 'feliz', humor: 'noite' },
      { texto: 'Uma estrela-guia', reacao: 'Uma estrelinha que acompanha sem apressar: gostei dessa ideia.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Nenhuma, gosto da vida real', reacao: 'A vida real também tem seus encantos inesperados.', coruja: 'normal', humor: 'quente' },
    ],
  },
  {
    id: 'talento',
    nivel: 2,
    texto: 'Que coisa você faz bem e gostaria de reconhecer mais?',
    placeholder: 'uma coisa que você faz bem',
    reacao: 'Às vezes a gente não percebe o próprio talento até alguém apontar.',
    guardar: true,
    rotulo: 'uma coisa que você faz bem',
  },
  {
    id: 'companhia',
    nivel: 2,
    texto: 'Que tipo de companhia faz você se sentir à vontade?',
    opcoes: [
      { texto: 'Alguém que escuta', reacao: 'Ser escutado sem pressa faz a gente caber melhor no mundo.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Alguém que me faz rir', reacao: 'Rir junto é uma forma ótima de descansar o coração.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Alguém que respeita meu silêncio', reacao: 'Uma presença tranquila pode dizer muito sem usar palavra nenhuma.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Gosto de ficar só', reacao: 'A própria companhia também pode ser um lugar seguro.', coruja: 'normal', humor: 'noite' },
    ],
  },
  {
    id: 'conquista',
    nivel: 2,
    texto: 'Que pequena conquista recente merece ser comemorada?',
    placeholder: 'uma conquista',
    reacao: 'Nem toda conquista precisa ser enorme para merecer um momento de orgulho.',
    guardar: true,
    rotulo: 'uma conquista recente',
  },
  {
    id: 'curiosidade',
    nivel: 2,
    texto: 'Que assunto desperta sua curiosidade ultimamente?',
    placeholder: 'um assunto',
    reacao: 'A curiosidade é uma janelinha que a gente abre para o mundo.',
    guardar: true,
    rotulo: 'um assunto que desperta sua curiosidade',
  },
  {
    id: 'ritual',
    nivel: 2,
    texto: 'Você tem algum pequeno ritual que deixa o dia mais seu?',
    placeholder: 'um ritual ou hábito',
    reacao: 'Um hábito pequeno pode virar um lugar conhecido no meio da correria.',
    guardar: true,
    rotulo: 'um pequeno ritual do seu dia',
  },
  {
    id: 'clima',
    nivel: 1,
    texto: 'Que tempo combina com você hoje?',
    opcoes: [
      { texto: 'Sol', reacao: 'Sol! Dá vontade de abrir as asas.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Chuva mansa', reacao: 'Chuva mansa... o barulho dela no telhado da torre é a minha música favorita.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Vento', reacao: 'Vento! Ele sempre traz notícia de longe.', coruja: 'normal', humor: 'noite' },
      { texto: 'Neblina', reacao: 'Neblina... quando tudo fica suave e a gente pode pensar devagar.', coruja: 'normal', humor: 'profundo' },
    ],
  },
  {
    id: 'som',
    nivel: 1,
    texto: 'Qual som acalma você?',
    opcoes: [
      { texto: 'Chuva', reacao: 'Chuva de novo! Acho que somos parecidos nisso.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Música calma', reacao: 'Música calma... deve ser uma boa companhia nos dias cheios.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Silêncio', reacao: 'Silêncio. Aqui na torre eu entendo bem esse tesouro.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Gente conversando ao longe', reacao: 'Gente conversando ao longe... é saber que o mundo está por perto, sem pedir nada.', coruja: 'normal', humor: 'quente' },
    ],
  },
  {
    id: 'cor',
    nivel: 1,
    texto: 'Se o seu dia fosse uma cor, qual seria?',
    placeholder: 'uma cor',
    reacao: '{resposta}... boa escolha. Vou pintar a torre dessa cor na minha cabeça.',
  },
  {
    id: 'bicho',
    nivel: 1,
    texto: 'Se você fosse outro bicho, qual seria?',
    placeholder: 'um bicho',
    reacao: 'Ah, {resposta}! Já consigo te imaginar assim. Combina.',
  },
  {
    id: 'lugar',
    nivel: 1,
    texto: 'Qual lugar faz você se sentir em casa?',
    opcoes: [
      { texto: 'Meu quarto', reacao: 'O quarto é o cantinho onde a gente pode ser inteiro.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Na rua, passeando', reacao: 'Na rua! Gosto de quem encontra casa no caminho.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Perto de quem eu gosto', reacao: 'Então casa é gente. Que coisa bonita.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Ainda estou procurando', reacao: 'Procurar também é um jeito de caminhar. Até lá, esta torre é um cantinho.', coruja: 'normal', humor: 'profundo' },
    ],
  },
  {
    id: 'energia',
    nivel: 1,
    texto: 'De uma a três estrelas, quanta energia você tem hoje?',
    opcoes: [
      { texto: 'Uma estrela', reacao: 'Uma estrelinha já brilha. Hoje é dia de poupar luz.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Duas estrelas', reacao: 'Duas estrelas: o suficiente para seguir sem correr.', coruja: 'normal', humor: 'noite' },
      { texto: 'Três estrelas', reacao: 'Três estrelas! A noite vai ficar bonita.', coruja: 'feliz', humor: 'alegre' },
    ],
  },

  // ---------- NÍVEL 2: pessoais leves ----------
  {
    id: 'melhora',
    nivel: 2,
    texto: 'O que costuma deixar o seu dia melhor?',
    placeholder: 'algo simples',
    reacao: '{resposta}... coisas simples carregam muito peso bom. Vou lembrar disso.',
    guardar: true,
    rotulo: 'o que deixa o seu dia melhor',
  },
  {
    id: 'livre',
    nivel: 2,
    texto: 'O que você faz quando tem tempo livre de verdade?',
    placeholder: 'o que você faz',
    reacao: 'Que legal: {resposta}. Quem tem um jeito próprio de descansar já está cuidando de si.',
    guardar: true,
    rotulo: 'o que você faz no tempo livre',
  },
  {
    id: 'pequeno',
    nivel: 2,
    texto: 'Qual é uma coisa pequena que você quer fazer em breve?',
    placeholder: 'uma coisa pequena',
    reacao: 'Gostei: {resposta}. As coisas pequenas são as que mais mudam o dia.',
    guardar: true,
    rotulo: 'uma coisa pequena que você quer fazer',
  },
  {
    id: 'descanso',
    nivel: 2,
    texto: 'Como você descansa melhor?',
    opcoes: [
      { texto: 'Em silêncio, sem ninguém', reacao: 'Descansar a sós também é uma forma de se abraçar.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Com amigos por perto', reacao: 'Descansar acompanhado: a conversa vira cobertor.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Dormindo', reacao: 'Dormir! Eu respeito muito. Só cuido para ser de dia, e não de noite.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Fazendo algo que gosto', reacao: 'Descansar fazendo o que ama... isso recarrega mais que parece.', coruja: 'feliz', humor: 'alegre' },
    ],
  },
  {
    id: 'infancia',
    nivel: 2,
    texto: 'Qual lembrança boa da infância vem agora?',
    placeholder: 'uma lembrança',
    reacao: 'Que lembrança bonita. {resposta}... dá para sentir daqui o calorzinho.',
    guardar: true,
    rotulo: 'uma lembrança boa da infância',
  },
  {
    id: 'especial',
    nivel: 2,
    texto: 'O que faz alguém virar especial para você?',
    opcoes: [
      { texto: 'Me escutar', reacao: 'Escutar de verdade é raro. Eu sei bem, é o meu ofício.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Me fazer rir', reacao: 'Rir junto é uma das coisas mais fortes que existem.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Estar por perto', reacao: 'Presença. Às vezes é tudo que a gente precisa.', coruja: 'normal', humor: 'quente' },
      { texto: 'Falar a verdade comigo', reacao: 'A verdade dita com cuidado vale ouro.', coruja: 'normal', humor: 'noite' },
    ],
  },
  {
    id: 'limite',
    nivel: 2,
    texto: 'O que ajuda você a perceber que está na hora de fazer uma pausa?',
    placeholder: 'um sinal ou sensação',
    reacao: 'Perceber os próprios limites é um jeito importante de se cuidar.',
    guardar: true,
    rotulo: 'o que mostra que é hora de pausar',
  },

  // ---------- NÍVEL 3: emocionais ----------
  {
    id: 'orgulho',
    nivel: 3,
    texto: 'Qual foi a última coisa que te deu orgulho de si?',
    placeholder: 'algo que você fez',
    reacao: '“{resposta}”. Isso merece ser lembrado. Você fez isso.',
    guardar: true,
    rotulo: 'o que te deu orgulho',
  },
  {
    id: 'cabeca',
    nivel: 3,
    texto: 'O que anda ocupando mais a sua cabeça?',
    opcoes: [
      { texto: 'Estudos ou trabalho', reacao: 'É muita coisa para carregar. Pausa também faz parte do caminho.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Pessoas', reacao: 'Pessoas ocupam muito espaço mesmo, no peito e na cabeça.', coruja: 'normal', humor: 'profundo' },
      { texto: 'O futuro', reacao: 'O futuro assusta e anima ao mesmo tempo. Dá para olhar um degrau por vez.', coruja: 'normal', humor: 'noite' },
      { texto: 'Nada em especial', reacao: 'Cabeça quieta é um presente. Aproveita.', coruja: 'feliz', humor: 'quente' },
    ],
  },
  {
    id: 'gentileza',
    nivel: 3,
    texto: 'Você costuma ser mais gentil com os outros ou consigo?',
    opcoes: [
      { texto: 'Com os outros', reacao: 'Quem cuida dos outros também precisa de cuidado. Você também merece receber esse carinho.', coruja: 'normal', humor: 'quente' },
      { texto: 'Comigo', reacao: 'Que bom! Isso não é pouca coisa.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Tento ser com todos', reacao: 'Tentar já é um bom começo. E incluir a si mesmo na lista também.', coruja: 'normal', humor: 'quente' },
    ],
  },
  {
    id: 'medo',
    nivel: 3,
    texto: 'Existe algo que você quer tentar, mas tem medo?',
    placeholder: 'algo que dá medo',
    reacao: '{resposta}... dá medo porque importa. Medo e coragem moram na mesma torre.',
    coruja: 'normal',
    guardar: true,
    rotulo: 'algo que você quer tentar mas tem medo',
  },
  {
    id: 'saudade',
    nivel: 3,
    texto: 'De quem ou de quê você sente saudade?',
    placeholder: 'uma saudade',
    reacao: 'Saudade é amor que ainda não encontrou o caminho de volta. Que bom que você me contou.',
    coruja: 'normal',
    guardar: true,
    rotulo: 'a sua saudade',
  },
  {
    id: 'ensinou',
    nivel: 3,
    texto: 'O que a vida ensinou a você que gostaria de ter sabido antes?',
    placeholder: 'um aprendizado',
    reacao: '“{resposta}”. Vou guardar isso como se fosse um tesouro.',
    coruja: 'normal',
    guardar: true,
    rotulo: 'o que a vida te ensinou',
  },
  {
    id: 'coragem',
    nivel: 3,
    texto: 'Em que momento recente você foi mais corajoso do que imaginava?',
    placeholder: 'um momento',
    reacao: 'Coragem nem sempre faz barulho; às vezes é só continuar mais um passo.',
    guardar: true,
    rotulo: 'um momento de coragem',
  },
  {
    id: 'apoio',
    nivel: 3,
    texto: 'Quando algo pesa, que tipo de apoio costuma ajudar de verdade?',
    opcoes: [
      { texto: 'Alguém me escutar', reacao: 'Ser escutado com atenção pode aliviar um pouco o peso.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Um conselho prático', reacao: 'Às vezes um próximo passo claro ajuda a organizar a noite.', coruja: 'normal', humor: 'noite' },
      { texto: 'Um tempo a sós', reacao: 'Um pouco de silêncio pode ajudar a entender o que se passa por dentro.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Uma ajuda concreta', reacao: 'Ajuda concreta também é uma forma bonita de cuidado.', coruja: 'feliz', humor: 'quente' },
    ],
  },
  {
    id: 'autocuidado',
    nivel: 3,
    texto: 'Que cuidado você oferece aos outros e gostaria de oferecer mais a si?',
    placeholder: 'um cuidado',
    reacao: 'Você também merece receber um pouco do cuidado que oferece.',
    guardar: true,
    rotulo: 'um cuidado que quer oferecer a si',
  },

  // ---------- NÍVEL 4: profundas ----------
  {
    id: 'recado',
    nivel: 4,
    texto: 'Se pudesse mandar um recado para você de cinco anos atrás, o que diria?',
    placeholder: 'um recado',
    reacao: '“{resposta}”. Esse recado também vale para o presente.',
    coruja: 'normal',
    guardar: true,
    rotulo: 'o recado para você de cinco anos atrás',
  },
  {
    id: 'importante',
    nivel: 4,
    texto: 'O que você acha que é o mais importante?',
    opcoes: [
      { texto: 'Ter alguém por perto', reacao: 'Eu também acho. Até quem vive numa torre precisa de alguém para dividir o silêncio.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Ser livre para voar', reacao: 'Voar! Sim! Mas aprendi que até quem voa gosta de ter um galho para onde voltar.', coruja: 'surpresa', humor: 'alegre' },
      { texto: 'Estar em paz', reacao: 'Paz... talvez seja o que todo mundo procura, cada um do seu jeito.', coruja: 'normal', humor: 'profundo' },
    ],
  },
  {
    id: 'lembranca',
    nivel: 4,
    texto: 'Que lembrança você gostaria de deixar nas pessoas que ama?',
    placeholder: 'uma lembrança',
    reacao: '{resposta}... isso já é um jeito lindo de viver.',
    guardar: true,
    rotulo: 'a lembrança que você quer deixar',
  },
  {
    id: 'recomecar',
    nivel: 4,
    texto: 'Se pudesse recomeçar uma coisa, qual seria?',
    placeholder: 'o que você recomeçaria',
    reacao: 'Você disse: “{resposta}”. Recomeços são só começos com mais bagagem.',
    coruja: 'normal',
    guardar: true,
    rotulo: 'o que você recomeçaria',
  },
  {
    id: 'paz',
    nivel: 4,
    texto: 'Quando foi a última vez que você sentiu paz de verdade?',
    placeholder: 'um momento',
    reacao: '“{resposta}”. Vamos guardar esse momento aqui, para você poder voltar nele.',
    guardar: true,
    rotulo: 'um momento de paz',
  },
  {
    id: 'ouvir',
    nivel: 4,
    texto: 'O que você precisa ouvir hoje?',
    placeholder: 'o que você precisa ouvir',
    reacao: 'Então escuta: “{resposta}”. É verdade, e eu estou aqui com você.',
    guardar: true,
    rotulo: 'o que você precisava ouvir',
  },
  {
    id: 'mudanca',
    nivel: 4,
    texto: 'Que mudança em você gostaria de acolher, em vez de tentar apressar?',
    placeholder: 'uma mudança',
    reacao: 'Nem todo crescimento precisa acontecer depressa. Às vezes, acolher o processo já é muito.',
    guardar: true,
    rotulo: 'uma mudança que você quer acolher',
  },
  {
    id: 'valor',
    nivel: 4,
    texto: 'Que valor você gostaria de levar consigo mesmo nos dias difíceis?',
    opcoes: [
      { texto: 'Paciência', reacao: 'Paciência não apaga a dificuldade, mas pode dar espaço para atravessá-la.', coruja: 'normal', humor: 'profundo' },
      { texto: 'Coragem', reacao: 'Coragem pode ser pedir ajuda, descansar ou tentar mais uma vez.', coruja: 'feliz', humor: 'quente' },
      { texto: 'Leveza', reacao: 'Leveza não é fingir que nada pesa; é também encontrar pausas.', coruja: 'feliz', humor: 'alegre' },
      { texto: 'Gentileza', reacao: 'Gentileza consigo pode mudar o tom de uma noite inteira.', coruja: 'normal', humor: 'quente' },
    ],
  },
  {
    id: 'futuro',
    nivel: 4,
    texto: 'Que detalhe simples você espera encontrar nos próximos dias?',
    placeholder: 'um detalhe',
    reacao: 'Às vezes, esperar por uma coisa simples já acende uma luz no caminho.',
    guardar: true,
    rotulo: 'um detalhe que espera encontrar',
  },
  {
    id: 'esperanca',
    nivel: 4,
    texto: 'Que pequena esperança você gostaria de levar consigo desta noite?',
    placeholder: 'uma esperança',
    reacao: 'Uma esperança pequena ainda pode iluminar bastante caminho.',
    guardar: true,
    rotulo: 'uma esperança para levar',
  },
]

import { useState, useEffect, useMemo, createContext, useContext, useCallback } from 'react';

const translations = {
  pt: {
    header: {
      home: 'Início',
      project: 'O Projeto',
      participate: 'Participar',
      language: 'Idioma',
      projectName: "Projeto Jardel Borges"
    },
    hero: {
      title: 'Do Acidente ao Milagre',
      subtitle: 'A História de Jardel Borges',
      description: 'Um livro sobre superação, fé e ressignificação após o acidente de helicóptero. Como uma tragédia se transformou em uma jornada de milagre, reconstrução e descoberta de um novo propósito de vida.',
      startProject: 'Conheça o Projeto',
      sendTestimony: 'Envie seu Depoimento'
    },
    impact: {
      mainTitle: "Nosso Compromisso",
      mainDescription: "Transformando uma história de milagre em fonte de esperança e apoio para pessoas que enfrentam seus próprios desafios.",
      book: "Livro Biográfico",
      bookDesc: "A jornada de fé e superação que vai inspirar milhares de pessoas",
      video: "Depoimentos",
      videoDesc: "Relatos emocionantes de pessoas que testemunharam essa história de milagre",
      social: "Propósito Social",
      socialDesc: "Transformando a experiência em apoio para quem mais precisa",
      response: "Atendimento",
      responseDesc: "Cuidado e atenção especial com cada pessoa que quer contribuir",
      transformTitle: "Uma História que Transforma Vidas",
      strengthTitle: "Força na Adversidade",
      strengthDesc: "A história de Jardel é um testemunho vivo de como a fé e a determinação podem superar os maiores desafios. Através deste projeto, queremos levar esperança e força para pessoas que estão enfrentando suas próprias batalhas.",
      lastingTitle: "Impacto Duradouro",
      lastingDesc: "Cada depoimento coletado não apenas enriquece a história de Jardel, mas também ajuda a criar uma rede de apoio e solidariedade. Parte dos recursos será destinada a apoiar pessoas em situação de vulnerabilidade."
    },
    miracle: {
      title: 'O Milagre da Transformação',
      subtitle: 'Como uma tragédia se tornou uma jornada de fé e propósito',
      description: 'Jardel Borges viveu uma experiência transformadora após o acidente de helicóptero que mudou sua vida para sempre. Sua história é um testemunho vivo de como a fé pode transformar dor em propósito, e como cada obstáculo pode se tornar uma oportunidade de crescimento e inspiração para outros.',
      hope: 'Esperança',
      hopeDesc: 'Encontrou luz nas trevas',
      purpose: 'Propósito',
      purposeDesc: 'Descobriu sua missão de vida',
      faith: 'Fé',
      faithDesc: 'Fortaleceu sua conexão espiritual'
    },
    story: {
      title: 'Uma História de Superação',
      beforeTitle: 'Antes do Acidente',
      beforeDesc: 'Jardel trabalhava como técnico de som e iluminação para grandes artistas, incluindo shows do cantor Marrone. Era uma carreira próspera no meio musical.',
      accidentTitle: 'O Acidente',
      accidentDesc: 'Um acidente de helicóptero mudou tudo. O que parecia ser o fim se tornou o início de uma jornada de descoberta e transformação pessoal.',
      afterTitle: 'A Transformação',
      afterDesc: 'Através da fé e determinação, Jardel encontrou um novo propósito: ajudar outras pessoas através de sua história de superação e milagre.'
    },
    participate: {
      title: 'Participe da História de Jardel',
      subtitle: 'Sua voz importa! Ajude-nos a contar esta história inspiradora de superação e fé.',
      contribute: {
        title: 'Como você pode contribuir',
        items: [
          'Compartilhe suas memórias e experiências com Jardel',
          'Conte como conheceu ou foi impactado por sua história',
          'Grave um depoimento em vídeo autêntico e do coração',
          'Seja parte desta jornada de transformação e esperança'
        ]
      },
      specs: {
        title: 'Especificações do Vídeo',
        duration: '1-4 minutos',
        format: 'MP4, MOV, AVI - VERTICAL',
        quality: 'HD (1080p)',
        size: 'Até 500MB'
      },
      professional: {
        title: 'Tratamento Profissional e Cuidadoso',
        description: 'Todos os depoimentos serão analisados pela jornalista Thaís Freitas com o cuidado e respeito que sua história merece. Você terá direito à aprovação prévia antes de qualquer uso.',
        orientations: 'Ver Orientações de Depoimento',
        faq: 'Perguntas Frequentes'
      },
      sidebar_description: 'Sua voz importa! Ajude-nos a contar esta história inspiradora de superação e fé.',
      sidebar_examples_button: 'Ver exemplos de depoimentos',
      sidebar_faq_button: 'Perguntas Frequentes'
    },
    form: {
      title: 'Envie seu Depoimento',
      subtitle: 'Deixe sua mensagem de apoio e faça parte desta corrente de fé.',
      fullName: 'Nome Completo',
      email: 'Email',
      phone: 'Telefone (opcional)',
      relationship: 'Sua relação com Jardel',
      selectRelation: 'Selecione sua relação',
      relations: {
        friend: 'Amigo pessoal',
        colleague: 'Colega de trabalho/música',
        family: 'Familiar',
        musician: 'Músico/Artista',
        witness: 'Testemunha da recuperação',
        other: 'Outro'
      },
      description: 'Descreva brevemente seu depoimento (opcional)',
      placeholder: 'Conte um pouco sobre sua relação com Jardel e o que gostaria de compartilhar...',
      videoUpload: 'Upload do Vídeo (OBRIGATÓRIO - FORMATO VERTICAL)',
      dragDrop: 'Arraste e solte seu vídeo aqui ou clique para selecionar',
      selectFile: 'Selecionar Arquivo',
      terms: 'Aceito os termos de uso e autorizo o uso da minha imagem para fins do projeto biográfico de Jardel Borges',
      volunteer: 'Confirmo que minha participação é totalmente voluntária e não espero nenhum benefício financeiro',
      submit: 'Enviar Depoimento',
      verticalWarning: "IMPORTANTE: Grave o vídeo no formato VERTICAL (celular em pé)",
      readAndAcceptTerms: "Leia e aceite os Termos de Uso e Participação",
      termsAccepted: "Termos aceitos."
    },
    examples: {
      title: 'Exemplos de Depoimentos',
      personal: {
        title: 'Exemplo 1: Amigo Pessoal',
        content: '"Oi, eu sou [Nome]. Conheci o Jardel há muitos anos, quando ele trabalhava com o Marrone. Sempre foi uma pessoa incrível, mas depois do acidente de helicóptero, vi uma transformação ainda maior nele. Ele encontrou um propósito lindo na vida, ajudando outras pessoas. É inspirador ver como ele transformou dor em esperança. Jardel, você é um exemplo para todos nós!"',
        duration: 'Duração: ~45 segundos',
        tone: 'Tom: Pessoal e carinhoso',
        verticalWarning: "IMPORTANTE: Grave o vídeo no formato VERTICAL (celular em pé)",
        readAndAcceptTerms: "Leia e aceite os Termos de Uso e Participação",
        termsAccepted: "Termos aceitos."
      },
      colleague: {
        title: 'Exemplo 2: Colega do Meio Musical',
        content: '"Eu trabalhei com o Jardel durante os shows do Marrone. Era sempre muito profissional e dedicado. Quando soube do acidente de helicóptero, fiquei muito preocupado. Mas ver a força dele para se recuperar e ainda por cima usar essa experiência para ajudar outras pessoas... isso é de uma grandeza que poucos têm. Jardel, sua história de milagre precisa ser contada!"',
        duration: 'Duração: ~1 minuto',
        tone: 'Tom: Profissional e admirativo',
        verticalWarning: "IMPORTANTE: Grave o vídeo no formato VERTICAL (celular em pé)",
        readAndAcceptTerms: "Leia e aceite os Termos de Uso e Participação",
        termsAccepted: "Termos aceitos."
      },
      witness: {
        title: 'Exemplo 3: Testemunha da Recuperação',
        content: '"Acompanhei o Jardel durante sua recuperação após o acidente. Foi um verdadeiro milagre vê-lo se levantar, não só fisicamente, mas espiritualmente. Ele nos ensinou que Deus tem um plano para cada um de nós. Ver ele ajudando outras pessoas, levando esperança... é emocionante. Essa história vai tocar muitos corações."',
        duration: 'Duração: ~50 segundos',
        tone: 'Tom: Emocional e inspirador',
        verticalWarning: "IMPORTANTE: Grave o vídeo no formato VERTICAL (celular em pé)",
        readAndAcceptTerms: "Leia e aceite os Termos de Uso e Participação",
        termsAccepted: "Termos aceitos."
      },
      tips: {
        title: 'Dicas Importantes',
        authentic: 'Seja autêntico: Fale com suas próprias palavras, do coração',
        miracle: 'Foque no milagre: Destaque a transformação e ressignificação após o acidente',
        brief: 'Seja breve: 1 a 4 minutos é o ideal',
        environment: 'Ambiente: Grave em local silencioso com boa iluminação',
        position: 'Posição: Segure o celular na VERTICAL (retrato) - MUITO IMPORTANTE',
        camera: 'Olhe para a câmera: Crie conexão com quem vai assistir',
        verticalWarning: "IMPORTANTE: Grave o vídeo no formato VERTICAL (celular em pé)",
        readAndAcceptTerms: "Leia e aceite os Termos de Uso e Participação",
        termsAccepted: "Termos aceitos."
      }
    },
    faq: {
      title: 'Perguntas Frequentes',
      q1: 'Por que vocês estão coletando esses depoimentos?',
      a1: 'Estamos criando um livro biográfico e um documentário sobre a história inspiradora de Jardel Borges. Seus depoimentos são fundamentais para contar essa história de superação.',
      q2: 'O que acontece com meu vídeo após o envio?',
      a2: 'Seu vídeo será analisado pela jornalista Thaís Freitas. Você terá direito à aprovação antes de qualquer uso público.',
      q3: 'Preciso ter alguma relação específica com Jardel?',
      a3: 'Não! Aceitamos depoimentos de amigos, colegas, familiares, músicos e até pessoas que foram inspiradas por sua história.',
      q4: 'Existe algum benefício financeiro?',
      a4: 'Não. A participação é 100% voluntária e sem qualquer benefício financeiro. O objetivo é puramente inspiracional e biográfico.',
      q5: 'Posso desistir depois de enviar?',
      a5: 'Sim, você pode retirar sua autorização a qualquer momento. Respeitamos completamente sua decisão.',
      q6: 'Como garanto que minha privacidade será respeitada?',
      a6: 'Todos os depoimentos passam por aprovação prévia. Nada será usado sem seu consentimento expresso.'
    },
    footer: {
      title: 'Projeto Jardel Borges',
      description: 'Uma história de superação, fé e transformação que inspira milhares de pessoas.',
      links: 'Links Úteis',
      contact: 'Contato',
      social: 'Apoio Social',
      socialDesc: 'Parte dos recursos será destinada ao apoio de ONGs e institutos que trabalham com pessoas em situação de vulnerabilidade.',
      rights: 'Todos os direitos reservados.',
      coordination: "Coordenação do Projeto",
      email: "fabricadeempresass@gmail.com"
    },
    specs: {
      duration: "Duração",
      format: "Formato",
      quality: "Qualidade",
      size: "Tamanho"
    },
    professional: {
      title: "Thaís Freitas",
      role: "Jornalista e Especialista em Marketing",
      features: {
        analysis: "Análise criteriosa de todos os depoimentos",
        treatment: "Tratamento profissional e ético",
        experience: "Experiência em projetos inspiracionais"
      }
    },
    terms: {
      title: "Termos e Condições",
      description: "Por favor, leia atentamente os termos antes de enviar seu depoimento.",
      tab_image_voice: "Uso de Imagem e Voz",
      tab_voluntary: "Participação Voluntária",
      accept_both_terms_part1: "Ao clicar em \"Aceitar e Continuar\", você confirma que leu e concorda com ",
      accept_both_terms_strong: "ambos",
      accept_both_terms_part2: " os termos.",
      cancel: "Cancelar",
      accept_and_continue: "Aceitar e Continuar",
      term_image_voice: {
        title: "TERMO DE AUTORIZAÇÃO DE USO DE IMAGEM E VOZ",
        p1: "Eu, {name}, de nacionalidade {nationality}, estado civil {maritalStatus}, profissão {profession}, portador(a) do RG nº {rg} e inscrito(a) no CPF/MF sob o nº {cpf}, residente e domiciliado(a) na {address}, doravante denominado(a) CEDENTE.",
        p2: "Pelo presente instrumento, AUTORIZO o uso da minha imagem e da minha voz, captadas em vídeo de depoimento pessoal enviado por mim, para o projeto biográfico de Jardel Borges, intitulado \"O Milagre da Ressignificação\" (doravante denominado PROJETO), de forma inteiramente gratuita, abrangendo o uso da imagem e da voz em sua totalidade ou em partes, para as seguintes finalidades:",
        list_item1_title: "Uso no Livro:",
        list_item1_content: "Autorizo a transcrição total ou parcial do meu depoimento, bem como a utilização de frames (imagens estáticas) do vídeo na versão impressa e digital do livro sobre a história de Jardel Borges.",
        list_item2_title: "Uso em Materiais de Divulgação:",
        list_item2_content: "Autorizo o uso da minha imagem e voz em todos os materiais de divulgação do PROJETO, incluindo, mas não se limitando a, redes sociais (Instagram, Facebook, YouTube, etc.), website oficial, anúncios, e-mail marketing, apresentações e materiais para a imprensa.",
        list_item3_title: "Uso em Documentário e Vídeos Relacionados:",
        list_item3_content: "Autorizo a inclusão do meu depoimento em vídeo, total ou parcialmente, em eventuais documentários, minidocumentários, trailers e outros vídeos produzidos como parte do PROJETO ou para sua divulgação.",
        p3: "Esta autorização é concedida a título gratuito, em caráter definitivo, irrevogável e irretratável, sem que nada haja a ser reclamado a título de direitos conexos à minha imagem, voz ou qualquer outro.",
        p4: "A presente autorização abrange o uso da imagem e voz em todo território nacional e internacional, por prazo indeterminado, em todas as suas modalidades e sem limite de tempo ou de número de utilizações.",
        p5: "O(A) CEDENTE declara que é o(a) único(a) e exclusivo(a) titular de todos os direitos sobre o vídeo enviado, e que o mesmo não viola quaisquer direitos de terceiros, incluindo direitos de propriedade intelectual, direitos de imagem ou privacidade.",
        p6: "Por esta ser a expressão da minha vontade, declaro que autorizo o uso acima descrito sem que nada haja a ser reclamado a título de direitos conexos à minha imagem, voz ou qualquer outro, e assino a presente autorização, que será validada eletronicamente mediante o aceite no formulário de envio."
      },
      term_voluntary: {
        title: "TERMO DE PARTICIPAÇÃO VOLUNTÁRIA",
        p1: "Eu, {name}, de nacionalidade {nationality}, estado civil {maritalStatus}, profissão {profession}, portador(a) do RG nº {rg} e CPF nº {cpf}, residente e domiciliado(a) na {address}, doravante denominado(a) PARTICIPANTE, por este instrumento, DECLARO e CONCORDO com os termos e condições abaixo, referentes à minha participação voluntária no projeto \"Projeto Biográfico de Jardel Borges - O Milagre da Ressignificação\".",
        list_item1_title: "OBJETO DA PARTICIPAÇÃO:",
        list_item1_content: "A presente declaração refere-se à minha participação voluntária no projeto, que visa a produção de um livro e materiais correlatos sobre a história de vida e superação de Jardel Borges, por meio do envio de um depoimento em vídeo.",
        list_item2_title: "NATUREZA VOLUNTÁRIA E GRATUITA:",
        list_item2_content: "O(A) PARTICIPANTE declara que sua participação no referido projeto é de natureza estritamente voluntária e gratuita, não havendo qualquer vínculo empregatício, societário, associativo ou de qualquer outra natureza que implique em remuneração, compensação financeira ou qualquer tipo de benefício econômico, presente ou futuro.",
        list_item3_title: "AUSÊNCIA DE VÍNCULO:",
        list_item3_content: "O(A) PARTICIPANTE reconhece e concorda que sua participação não gera qualquer tipo de vínculo empregatício, trabalhista, previdenciário ou de qualquer outra natureza com os organizadores, colaboradores ou parceiros do projeto, nem com Jardel Borges.",
        list_item4_title: "CONSCIÊNCIA E LIBERDADE:",
        list_item4_content: "O(A) PARTICIPANTE declara que a decisão de participar do projeto e de enviar seu depoimento em vídeo foi tomada de forma livre, espontânea e consciente, sem qualquer tipo de coação, pressão ou expectativa de contrapartida financeira ou material.",
        list_item5_title: "USO DO DEPOIMENTO:",
        list_item5_content: "O(A) PARTICIPANTE está ciente de que o depoimento em vídeo poderá ser utilizado para as finalidades do projeto, conforme detalhado no Termo de Autorização de Uso de Imagem e Voz, incluindo, mas não se limitando a, inclusão no livro, divulgação em mídias sociais e materiais promocionais. O(A) PARTICIPANTE concorda com a edição e adaptação do material, desde que não desvirtue o sentido original de sua mensagem.",
        list_item6_title: "DECLARAÇÕES DO PARTICIPANTE:",
        list_item6_content: "O(A) PARTICIPANTE declara, sob as penas da lei, que:",
        sublist_item1: "Possui plena capacidade civil para celebrar o presente Termo;",
        sublist_item2: "O conteúdo do vídeo enviado é de sua autoria e não viola direitos de terceiros, incluindo direitos autorais, de imagem ou de privacidade;",
        sublist_item3: "Está ciente e concorda com todas as condições estabelecidas neste Termo.",
        list_item7_title: "ACEITE ELETRÔNICO:",
        list_item7_content: "Ao marcar a caixa de seleção correspondente e prosseguir com o envio do depoimento, o(a) PARTICIPANTE declara ter lido, compreendido e concordado integralmente com todas as cláusulas e condições deste Termo de Participação Voluntária, conferindo-lhe plena validade jurídica como se fosse assinado fisicamente.",
        list_item8_title: "FORO:",
        list_item8_content: "Fica eleito o foro da comarca de [Cidade/Estado] para dirimir quaisquer dúvidas ou litígios decorrentes do presente Termo, com renúncia expressa a qualquer outro, por mais privilegiado que seja."
      }
    }
  },
  es: {
    header: {
      home: 'Inicio',
      project: 'El Proyecto',
      participate: 'Participar',
      language: 'Idioma',
      projectName: "Proyecto Jardel Borges"
    },
    hero: {
      title: 'Del Accidente al Milagro',
      subtitle: 'La Historia de Jardel Borges',
      description: 'Un libro sobre superación, fe y resignificación después del accidente de helicóptero. Cómo una tragedia se transformó en un viaje de milagro, reconstrucción y descubrimiento de un nuevo propósito de vida.',
      startProject: 'Conoce el Proyecto',
      sendTestimony: 'Envía tu Testimonio'
    },
    impact: {
      mainTitle: "Nuestro Compromiso",
      mainDescription: "Transformando una historia de milagro en fuente de esperanza y apoyo para personas que enfrentan sus propios desafíos.",
      book: "Libro Biográfico",
      bookDesc: "Un viaje de fe y superación que inspirará a miles de personas",
      video: "Testimonios",
      videoDesc: "Relatos conmovedores de personas que presenciaron esta historia de milagro",
      social: "Propósito Social",
      socialDesc: "Transformando la experiencia en apoyo para quienes más lo necesitan",
      response: "Atención",
      responseDesc: "Cuidado y atención especial con cada persona que quiere contribuir",
      transformTitle: "Una Historia que Transforma Vidas",
      strengthTitle: "Fuerza en la Adversidad",
      strengthDesc: "La historia de Jardel es un testimonio vivo de cómo la fe y la determinación pueden superar los mayores desafíos. A través de este proyecto, queremos llevar esperanza y fuerza a las personas que están enfrentando sus propias batallas.",
      lastingTitle: "Impacto Duradero",
      lastingDesc: "Cada testimonio recolectado no solo enriquece la historia de Jardel, sino que también ayuda a crear una red de apoyo y solidaridad. Parte de los recursos se destinará a apoyar a personas en situación de vulnerabilidad."
    },
    miracle: {
      title: 'El Milagro de la Transformación',
      subtitle: 'Cómo una tragedia se convirtió en un viaje de fe y propósito',
      description: 'Jardel Borges vivió una experiencia transformadora después del accidente de helicóptero que cambió su vida para siempre. Su historia es un testimonio vivo de cómo la fe puede transformar el dolor en propósito, y cómo cada obstáculo puede convertirse en una oportunidad de crecimiento e inspiración para otros.',
      hope: 'Esperanza',
      hopeDesc: 'Encontró luz en la oscuridad',
      purpose: 'Propósito',
      purposeDesc: 'Descubrió su misión de vida',
      faith: 'Fe',
      faithDesc: 'Fortaleció su conexión espiritual'
    },
    story: {
      title: 'Una Historia de Superación',
      beforeTitle: 'Antes del Accidente',
      beforeDesc: 'Jardel trabajaba como técnico de sonido e iluminación para grandes artistas, incluyendo shows del cantante Marrone. Era una carrera próspera en el medio musical.',
      accidentTitle: 'El Accidente',
      accidentDesc: 'Un accidente de helicóptero cambió todo. Lo que parecía ser el final se convirtió en el inicio de un viaje de descubrimiento y transformación personal.',
      afterTitle: 'La Transformación',
      afterDesc: 'A través de la fe y determinación, Jardel encontró un nuevo propósito: ayudar a otras personas a través de su historia de superación y milagro.'
    },
    participate: {
      title: 'Participa en la Historia de Jardel',
      subtitle: '¡Tu voz importa! Ayúdanos a contar esta historia inspiradora de superación y fe.',
      contribute: {
        title: 'Cómo puedes contribuir',
        items: [
          'Comparte tus recuerdos y experiencias con Jardel',
          'Cuenta cómo conociste o fuiste impactado por su historia',
          'Graba un testimonio en video auténtico y del corazón',
          'Sé parte de este viaje de transformación y esperanza'
        ]
      },
      specs: {
        title: 'Especificaciones del Video',
        duration: '1-4 minutos',
        format: 'MP4, MOV, AVI - VERTICAL',
        quality: 'HD (1080p)',
        size: 'Hasta 500MB'
      },
      professional: {
        title: 'Tratamiento Profesional y Cuidadoso',
        description: 'Todos los testimonios serán analizados por la periodista Thaís Freitas con el cuidado y respeto que tu historia merece. Tendrás derecho a aprobación previa antes de cualquier uso.',
        orientations: 'Ver Directrices de Testimonio',
        faq: 'Preguntas Frecuentes'
      },
      sidebar_description: '¡Tu voz importa! Ayúdanos a contar esta inspiradora historia de superación y fe.',
      sidebar_examples_button: 'Ver ejemplos de testimonios',
      sidebar_faq_button: 'Preguntas Frecuentes'
    },
    form: {
      title: 'Envía tu Testimonio',
      subtitle: 'Deja tu mensaje de apoyo y forma parte de esta cadena de fe.',
      fullName: 'Nombre Completo',
      email: 'Email',
      phone: 'Teléfono (opcional)',
      relationship: 'Tu relación con Jardel',
      selectRelation: 'Selecciona tu relación',
      relations: {
        friend: 'Amigo personal',
        colleague: 'Colega de trabajo/música',
        family: 'Familiar',
        musician: 'Músico/Artista',
        witness: 'Testigo de la recuperación',
        other: 'Otro'
      },
      description: 'Describe brevemente tu testimonio (opcional)',
      placeholder: 'Cuenta un poco sobre tu relación con Jardel y lo que te gustaría compartir...',
      videoUpload: 'Subida de Video (OBLIGATORIO - FORMATO VERTICAL)',
      dragDrop: 'Arrastra y suelta tu video aquí o haz clic para seleccionar',
      selectFile: 'Seleccionar Archivo',
      terms: 'Acepto los términos de uso y autorizo el uso de mi imagen para fines del proyecto biográfico de Jardel Borges',
      volunteer: 'Confirmo que mi participación es totalmente voluntaria y no espero ningún beneficio financiero',
      submit: 'Enviar Testimonio',
      verticalWarning: "IMPORTANTE: Graba el video en formato VERTICAL (teléfono en posición vertical)",
      readAndAcceptTerms: "Lee y acepta los Términos de Uso y Participación",
      termsAccepted: "Términos aceptados."
    },
    examples: {
      title: 'Ejemplos de Testimonios',
      personal: {
        title: 'Ejemplo 1: Amigo Personal',
        content: '"Hola, soy [Nombre]. I met Jardel many years ago, when he worked with Marrone. He was always an incredible person, but after the helicopter accident, I saw an even greater transformation in him. He found a beautiful purpose in life, helping other people. It\'s inspiring to see how he transformed pain into hope. Jardel, you are an example to all of us!"',
        duration: 'Duración: ~45 segundos',
        tone: 'Tono: Personal y cariñoso',
        verticalWarning: "IMPORTANTE: Graba el video en formato VERTICAL (móvil en pie)",
        readAndAcceptTerms: "Lee y acepta los Términos de Uso y Participación",
        termsAccepted: "Términos aceptados."
      },
      colleague: {
        title: 'Ejemplo 2: Colega del Medio Musical',
        content: '"Trabajé con Jardel durante los shows de Marrone. Siempre fue muy profesional y dedicado. Cuando supe del accidente de helicóptero, me preocupé mucho. Pero ver su fuerza para recuperarse y además usar esa experiencia para ayudar a otras personas... eso es una grandeza que pocos tienen. ¡Jardel, tu historia de milagro necesita ser contada!"',
        duration: 'Duración: ~1 minuto',
        tone: 'Tono: Profesional y admirativo',
        verticalWarning: "IMPORTANTE: Graba el video en formato VERTICAL (móvil en pie)",
        readAndAcceptTerms: "Lee y acepta los Términos de Uso y Participación",
        termsAccepted: "Términos aceptados."
      },
      witness: {
        title: 'Ejemplo 3: Testigo de la Recuperación',
        content: '"Acompañé a Jardel durante su recuperación después del accidente. Fue un verdadero milagro verlo levantarse, no solo físicamente, sino espiritualmente. Nos enseñó que Dios tiene un plano para cada uno de nosotros. Verlo ayudando a otras personas, llevando esperanza... es emocionante. Esta historia tocará muchos corazones."',
        duration: 'Duración: ~50 segundos',
        tone: 'Tono: Emocional e inspirador',
        verticalWarning: "IMPORTANTE: Graba el video en formato VERTICAL (móvil en pie)",
        readAndAcceptTerms: "Lee y acepta los Términos de Uso y Participación",
        termsAccepted: "Términos aceptados."
      },
      tips: {
        title: 'Consejos Importantes',
        authentic: 'Sé auténtico: Habla con tus propias palabras, del corazón',
        miracle: 'Enfócate en el milagro: Destaca la transformación y resignificación después del accidente',
        brief: 'Sé breve: 1 a 4 minutos es lo ideal',
        environment: 'Ambiente: Graba en lugar silencioso con buena iluminación',
        position: 'Posición: Sostén el celular en VERTICAL (retrato) - MUY IMPORTANTE',
        camera: 'Mira a la cámara: Crea conexión con quien va a ver',
        verticalWarning: "IMPORTANTE: Graba el video en formato VERTICAL (móvil en pie)",
        readAndAcceptTerms: "Lee y acepta los Términos de Uso y Participación",
        termsAccepted: "Términos aceptados."
      }
    },
    faq: {
      title: 'Preguntas Frecuentes',
      q1: '¿Por qué están recolectando estos testimonios?',
      a1: 'Estamos creando un libro biográfico y un documental sobre la inspiradora historia de Jardel Borges. Sus testimonios son fundamentales para contar esta historia de superación.',
      q2: '¿Qué sucede con mi video después de enviarlo?',
      a2: 'Su video será analizado por la periodista Thaís Freitas. Tendrá derecho a aprobación antes de cualquier uso público.',
      q3: '¿Necesito tener alguna relación específica con Jardel?',
      a3: '¡No! Aceptamos testimonios de amigos, colegas, familiares, músicos e incluso personas que se han inspirado en su historia.',
      q4: '¿Existe algún beneficio financiero?',
      a4: 'No. La participación es 100% voluntaria y sin ningún beneficio financiero. El objetivo es puramente inspiracional y biográfico.',
      q5: '¿Puedo desistir después de enviar?',
      a5: 'Sí, puedes retirar tu autorización en cualquier momento. Respetamos completamente tu decisión.',
      q6: '¿Cómo garantizo que mi privacidad será respetada?',
      a6: 'Todos los testimonios pasan por aprobación previa. Nada será usado sin tu consentimiento expreso.'
    },
    footer: {
      title: 'Proyecto Jardel Borges',
      description: 'Una historia de superación, fe y transformación que inspira a miles de personas.',
      links: 'Enlaces Útiles',
      contact: 'Contacto',
      social: 'Apoyo Social',
      socialDesc: 'Parte de los recursos se destinará a apoyar a ONGs e institutos que trabajan con personas en situación de vulnerabilidad.',
      rights: 'Todos los derechos reservados.',
      coordination: "Coordinación del Proyecto",
      email: "fabricadeempresass@gmail.com"
    },
    specs: {
      duration: "Duración",
      format: "Formato",
      quality: "Calidad",
      size: "Tamaño"
    },
    professional: {
      title: "Thaís Freitas",
      role: "Periodista y Especialista en Marketing",
      features: {
        analysis: "Análisis criterioso de todos los testimonios",
        treatment: "Tratamiento profesional y ético",
        experience: "Experiencia en proyectos inspiradores"
      }
    },
    terms: {
      title: "Términos y Condiciones",
      description: "Por favor, lee atentamente los términos antes de enviar tu testimonio.",
      tab_image_voice: "Uso de Imagen y Voz",
      tab_voluntary: "Participación Voluntaria",
      accept_both_terms_part1: "Al hacer clic en \"Aceptar y Continuar\", confirmas que has leído y estás de acuerdo con ",
      accept_both_terms_strong: "ambos",
      accept_both_terms_part2: " términos.",
      cancel: "Cancelar",
      accept_and_continue: "Aceptar y Continuar",
      term_image_voice: {
        title: "TÉRMINOS DE AUTORIZACIÓN DE USO DE IMAGEN Y VOZ",
        p1: "Yo, {name}, de nacionalidad {nationality}, estado civil {maritalStatus}, profesión {profession}, portador(a) del documento de identidad nº {rg} e inscrito(a) en el CPF/MF con el nº {cpf}, residente y domiciliado(a) en {address}, en adelante denominado(a) CEDENTE.",
        p2: "Por el presente instrumento, AUTORIZO el uso de mi imagen y mi voz, captadas en video de testimonio personal enviado por mí, para el proyecto biográfico de Jardel Borges, titulado \"El Milagro de la Resignificación\" (en adelante denominado PROYECTO), de forma totalmente gratuita, abarcando el uso de la imagen y la voz en su totalidad o en partes, para los siguientes fines:",
        list_item1_title: "Uso en el Libro:",
        list_item1_content: "Autorizo la transcripción total o parcial de mi testimonio, así como la utilización de fotogramas (imágenes estáticas) del video en la versión impresa y digital del libro sobre la historia de Jardel Borges.",
        list_item2_title: "Uso en Materiales de Divulgación:",
        list_item2_content: "Autorizo el uso de mi imagen y voz en todos los materiales de divulgación del PROYECTO, incluyendo, pero no limitándose a, redes sociales (Instagram, Facebook, YouTube, etc.), sitio web oficial, anuncios, e-mail marketing, presentaciones y materiales para la prensa.",
        list_item3_title: "Uso en Documental y Videos Relacionados:",
        list_item3_content: "Autorizo la inclusión de mi testimonio en video, total o parcialmente, en eventuales documentales, minidocumentales, tráileres y otros videos producidos como parte del PROYECTO o para su divulgación.",
        p3: "Esta autorización se concede a título gratuito, con carácter definitivo, irrevocable e irretratable, sin que haya nada que reclamar a título de derechos conexos a mi imagen, voz o cualquier otro.",
        p4: "La presente autorización abarca el uso de la imagen y voz en todo el territorio nacional e internacional, por tiempo indefinido, en todas sus modalidades y sin límite de tiempo o número de utilizaciones.",
        p5: "El(La) CEDENTE declara que es el(la) único(a) y exclusivo(a) titular de todos los derechos sobre el video enviado, y que el mismo no viola ningún derecho de terceros, incluyendo derechos de propiedad intelectual, derechos de imagen o privacidad.",
        p6: "Por ser esta la expresión de mi voluntad, declaro que autorizo el uso anteriormente descrito sin que haya nada que reclamar a título de derechos conexos a mi imagen, voz o cualquier otro, y firmo la presente autorización, que será validada electrónicamente mediante la aceptación en el formulario de envío."
      },
      term_voluntary: {
        title: "TÉRMINOS DE PARTICIPACIÓN VOLUNTARIA",
        p1: "Yo, {name}, de nacionalidad {nationality}, estado civil {maritalStatus}, profesión {profession}, portador(a) del documento de identidad nº {rg} y CPF nº {cpf}, residente y domiciliado(a) en {address}, en adelante denominado(a) PARTICIPANTE, por este instrumento, DECLARO y ACEPTO los términos y condiciones a continuación, referentes a mi participación voluntaria en el proyecto \"Proyecto Biográfico de Jardel Borges - El Milagro de la Resignificación\".",
        list_item1_title: "OBJETO DE LA PARTICIPACIÓN:",
        list_item1_content: "La presente declaración se refiere a mi participación voluntaria en el proyecto, que tiene como objetivo la producción de un libro y materiales relacionados sobre la historia de vida y superación de Jardel Borges, a través del envío de un testimonio en video.",
        list_item2_title: "NATURALEZA VOLUNTARIA Y GRATUITA:",
        list_item2_content: "El(La) PARTICIPANTE declara que su participación en dicho proyecto es de naturaleza estrictamente voluntaria y gratuita, no existiendo ningún vínculo laboral, societario, asociativo o de cualquier otra naturaleza que implique remuneración, compensación financiera o cualquier tipo de beneficio económico, presente o futuro.",
        list_item3_title: "AUSENCIA DE VÍNCULO:",
        list_item3_content: "El(La) PARTICIPANTE reconoce y acepta que su participación no genera ningún tipo de vínculo laboral, de empleo, previsional o de cualquier otra naturaleza con los organizadores, colaboradores o socios del proyecto, ni con Jardel Borges.",
        list_item4_title: "CONCIENCIA Y LIBERDADE:",
        list_item4_content: "El(La) PARTICIPANTE declara que la decisión de participar en el proyecto y de enviar su testimonio en video fue tomada de forma libre, espontánea y consciente, sin ningún tipo de coacción, presión o expectativa de contraprestación financiera o material.",
        list_item5_title: "USO DEL TESTIMONIO:",
        list_item5_content: "El(La) PARTICIPANTE es consciente de que el testimonio en video podrá ser utilizado para los fines del proyecto, según se detalla en los Términos de Autorización de Uso de Imagen y Voz, incluyendo, pero no limitándose a, la inclusión en el libro, divulgación en redes sociales y materiales promocionales. El(La) PARTICIPANTE acepta la edición y adaptación del material, siempre que no se desvirtúe el sentido original de su mensaje.",
        list_item6_title: "DECLARACIONES DEL PARTICIPANTE:",
        list_item6_content: "El(La) PARTICIPANTE declara, bajo pena de ley, que:",
        sublist_item1: "He/She has full civil capacity to enter into this Agreement;",
        sublist_item2: "The content of the submitted video is his/her own authorship and does not violate any third-party rights, including copyright, image, or privacy rights;",
        sublist_item3: "He/She is aware of and agrees to all the conditions set forth in this Agreement.",
        list_item7_title: "ELECTRONIC ACCEPTANCE:",
        list_item7_content: "By checking the corresponding checkbox and proceeding with the submission of the testimony, the PARTICIPANT declares to have read, understood, and fully agreed to all the clauses and conditions of this Voluntary Participation Agreement, giving it full legal validity as if it were physically signed.",
        list_item8_title: "FUERO:",
        list_item8_content: "Se elige el fuero de la comarca de [Ciudad/Estado] para dirimir cualquier duda o litigio derivado de los presentes Términos, con renuncia expresa a cualquier otro, por más privilegiado que sea."
      }
    }
  },
  en: {
    header: {
      home: 'Home',
      project: 'The Project',
      participate: 'Participate',
      language: 'Language',
      projectName: "Jardel Borges Project"
    },
    hero: {
      title: 'From Accident to Miracle',
      subtitle: 'The Story of Jardel Borges',
      description: 'A book about overcoming, faith and finding new meaning after a helicopter accident. How a tragedy transformed into a journey of miracle, reconstruction and discovery of a new life purpose.',
      startProject: 'Learn About the Project',
      sendTestimony: 'Send Your Testimony'
    },
    impact: {
      mainTitle: "Our Commitment",
      mainDescription: "Transforming a miracle story into a source of hope and support for people facing their own challenges.",
      book: "Biographical Book",
      bookDesc: "A journey of faith and overcoming that will inspire thousands of people",
      video: "Testimonials",
      videoDesc: "Moving accounts from people who witnessed this miracle story",
      social: "Social Purpose",
      socialDesc: "Transforming experience into support for those most in need",
      response: "Support",
      responseDesc: "Special care and attention for everyone who wants to contribute",
      transformTitle: "A Story that Transforms Lives",
      strengthTitle: "Strength in Adversity",
      strengthDesc: "Jardel's story is a living testimony of how faith and determination can overcome the greatest challenges. Through this project, we want to bring hope and strength to people who are facing their own battles.",
      lastingTitle: "Lasting Impact",
      lastingDesc: "Each testimony collected not only enriches Jardel's story but also helps create a network of support and solidarity. Part of the resources will be allocated to support people in vulnerable situations."
    },
    miracle: {
      title: 'The Miracle of Transformation',
      subtitle: 'How a tragedy became a journey of faith and purpose',
      description: 'Jardel Borges lived a transformative experience after the helicopter accident that changed his life forever. His story is a living testimony of how faith can transform pain into purpose, and how every obstacle can become an opportunity for growth and inspiration for others.',
      hope: 'Hope',
      hopeDesc: 'Found light in darkness',
      purpose: 'Purpose',
      purposeDesc: 'Discovered his life mission',
      faith: 'Faith',
      faithDesc: 'Strengthened his spiritual connection'
    },
    story: {
      title: 'A Story of Overcoming',
      beforeTitle: 'Before the Accident',
      beforeDesc: 'Jardel worked as a sound and lighting technician for great artists, including shows for singer Marrone. It was a prosperous career in the music industry.',
      accidentTitle: 'The Accident',
      accidentDesc: 'A helicopter accident changed everything. What seemed to be the end became the beginning of a journey of discovery and personal transformation.',
      afterTitle: 'The Transformation',
      afterDesc: 'Through faith and determination, Jardel found a new purpose: helping other people through his story of overcoming and miracle.'
    },
    participate: {
      title: 'Participate in Jardel\'s Story',
      subtitle: 'Your voice matters! Help us tell this inspiring story of overcoming and faith.',
      contribute: {
        title: 'How you can contribute',
        items: [
          'Share your memories and experiences with Jardel',
          'Tell how you met or were impacted by his story',
          'Record an authentic and heartfelt video testimony',
          'Be part of this journey of transformation and hope'
        ]
      },
      specs: {
        title: 'Video Specifications',
        duration: '1-4 minutes',
        format: 'MP4, MOV, AVI - VERTICAL',
        quality: 'HD (1080p)',
        size: 'Up to 500MB'
      },
      professional: {
        title: 'Professional and Careful Treatment',
        description: 'All testimonials will be analyzed by journalist Thaís Freitas with the care and respect your story deserves. You will have the right to prior approval before any use.',
        orientations: 'See Testimony Guidelines',
        faq: 'Frequently Asked Questions'
      },
      sidebar_description: 'Your voice matters! Help us tell this inspiring story of overcoming and faith.',
      sidebar_examples_button: 'See testimony examples',
      sidebar_faq_button: 'Frequently Asked Questions'
    },
    form: {
      title: 'Send your Testimony',
      subtitle: 'Leave your message of support and be part of this chain of faith.',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone (optional)',
      relationship: 'Your relationship with Jardel',
      selectRelation: 'Select your relationship',
      relations: {
        friend: 'Personal friend',
        colleague: 'Work/music colleague',
        family: 'Family member',
        musician: 'Musician/Artist',
        witness: 'Recovery witness',
        other: 'Other'
      },
      description: 'Briefly describe your testimony (optional)',
      placeholder: 'Tell us a bit about your relationship with Jardel and what you\'d like to share...',
      videoUpload: 'Video Upload (MANDATORY - VERTICAL FORMAT)',
      dragDrop: 'Drag and drop your video here or click to select',
      selectFile: 'Select File',
      terms: 'I accept the terms of use and authorize the use of my image for the purposes of Jardel Borges\' biographical project',
      volunteer: 'I confirm that my participation is completely voluntary and I expect no financial benefit',
      submit: 'Submit Testimony',
      verticalWarning: "IMPORTANT: Record the video in VERTICAL format (phone upright)",
      readAndAcceptTerms: "Read and accept the Terms of Use and Participation",
      termsAccepted: "Terms accepted."
    },
    examples: {
      title: 'Testimony Examples',
      personal: {
        title: 'Example 1: Personal Friend',
        content: '"Hi, I\'m [Name]. I met Jardel many years ago, when he worked with Marrone. He was always an incredible person, but after the helicopter accident, I saw an even greater transformation in him. He found a beautiful purpose in life, helping other people. It\'s inspiring to see how he transformed pain into hope. Jardel, you are an example to all of us!"',
        duration: 'Duration: ~45 seconds',
        tone: 'Tone: Personal and caring',
        verticalWarning: "IMPORTANT: Record the video in VERTICAL format (phone upright)",
        readAndAcceptTerms: "Read and accept the Terms of Use and Participation",
        termsAccepted: "Terms accepted."
      },
      colleague: {
        title: 'Example 2: Music Industry Colleague',
        content: '"I worked with Jardel during Marrone\'s shows. He was always very professional and dedicated. When I heard about the helicopter accident, I was very worried. But seeing his strength to recover and still use that experience to help other people... that\'s a greatness that few have. Jardel, your miracle story needs to be told!"',
        duration: 'Duration: ~1 minute',
        tone: 'Tone: Professional and admiring',
        verticalWarning: "IMPORTANT: Record the video in VERTICAL format (phone upright)",
        readAndAcceptTerms: "Read and accept the Terms of Use and Participation",
        termsAccepted: "Terms accepted."
      },
      witness: {
        title: 'Example 3: Recovery Witness',
        content: '"I accompanied Jardel during his recovery after the accident. It was a true miracle to see him rise, not only physically, but spiritually. He taught us that God has a plan for each of us. Seeing him helping other people, bringing hope... it\'s moving. This story will touch many hearts."',
        duration: 'Duration: ~50 seconds',
        tone: 'Tone: Emotional and inspiring',
        verticalWarning: "IMPORTANT: Record the video in VERTICAL format (phone upright)",
        readAndAcceptTerms: "Read and accept the Terms of Use and Participation",
        termsAccepted: "Terms accepted."
      },
      tips: {
        title: 'Important Tips',
        authentic: 'Be authentic: Speak with your own words, from the heart',
        miracle: 'Focus on the miracle: Highlight the transformation and new meaning after the accident',
        brief: 'Be brief: 1 to 4 minutes is ideal',
        environment: 'Environment: Record in a quiet place with good lighting',
        position: 'Position: Hold the phone VERTICALLY (portrait) - VERY IMPORTANT',
        camera: 'Look at the camera: Create connection with viewers',
        verticalWarning: "IMPORTANT: Record the video in VERTICAL format (phone upright)",
        readAndAcceptTerms: "Read and accept the Terms of Use and Participation",
        termsAccepted: "Terms accepted."
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      q1: 'Why are you collecting these testimonials?',
      a1: 'We are creating a biographical book and documentary about Jardel Borges\' inspiring story. Your testimonials are essential to tell this story of overcoming.',
      q2: 'What happens to my video after I send it?',
      a2: 'Your video will be analyzed by journalist Thaís Freitas. You will have the right to approval before any public use.',
      q3: 'Do I need to have a specific relationship with Jardel?',
      a3: 'No! We accept testimonials from friends, colleagues, family, musicians, and even people who were inspired by his story.',
      q4: 'Is there any financial benefit?',
      a4: 'No. Participation is 100% voluntary and without any financial benefit. The purpose is purely inspirational and biographical.',
      q5: 'Can I withdraw after submitting?',
      a5: 'Yes, you can withdraw your authorization at any time. We completely respect your decision.',
      q6: 'How do I ensure my privacy will be respected?',
      a6: 'All testimonials go through prior approval. Nothing will be used without your express consent.'
    },
    footer: {
      title: 'Jardel Borges Project',
      description: 'A story of overcoming, faith and transformation that inspires thousands of people.',
      links: 'Useful Links',
      contact: 'Contact',
      social: 'Social Support',
      socialDesc: 'Part of the resources will be destined to support NGOs and institutes that work with people in vulnerable situations.',
      rights: 'All rights reserved.',
      coordination: "Project Coordination",
      email: "fabricadeempresass@gmail.com"
    },
    specs: {
      duration: "Duration",
      format: "Format",
      quality: "Quality",
      size: "Size"
    },
    professional: {
      title: "Thaís Freitas",
      role: "Journalist and Marketing Specialist",
      features: {
        analysis: "Careful analysis of all testimonies",
        treatment: "Professional and ethical treatment",
        experience: "Experience in inspirational projects"
      }
    },
    terms: {
      title: "Terms and Conditions",
      description: "Please read the terms carefully before submitting your testimony.",
      tab_image_voice: "Image and Voice Use",
      tab_voluntary: "Voluntary Participation",
      accept_both_terms_part1: "By clicking \"Accept and Continue\", you confirm that you have read and agree to ",
      accept_both_terms_strong: "both",
      accept_both_terms_part2: " terms.",
      cancel: "Cancel",
      accept_and_continue: "Accept and Continue",
      term_image_voice: {
        title: "IMAGE AND VOICE USE AUTHORIZATION AGREEMENT",
        p1: "I, {name}, of {nationality} nationality, {maritalStatus} marital status, {profession} profession, holder of ID card No. {rg} and registered with CPF/MF under No. {cpf}, residing at {address}, hereinafter referred to as the GRANTOR.",
        p2: "By this instrument, I AUTHORIZE the use of my image and my voice, captured in a personal testimony video sent by me, for the biographical project of Jardel Borges, titled \"The Miracle of Reframing\" (hereinafter referred to as the PROJECT), entirely free of charge, covering the use of the image and voice in whole or in part, for the following purposes:",
        list_item1_title: "Use in the Book:",
        list_item1_content: "I authorize the total or partial transcription of my testimony, as well as the use of frames (static images) from the video in the printed and digital version of the book about Jardel Borges's story.",
        list_item2_title: "Use in Promotional Materials:",
        list_item2_content: "I authorize the use of my image and voice in all promotional materials for the PROJECT, including, but not limited to, social media (Instagram, Facebook, YouTube, etc.), official website, advertisements, email marketing, presentations, and press materials.",
        list_item3_title: "Use in Documentary and Related Videos:",
        list_item3_content: "I authorize the inclusion of my video testimony, in whole or in part, in any documentaries, mini-documentaries, trailers, and other videos produced as part of the PROJECT or for its promotion.",
        p3: "This authorization is granted free of charge, definitively, irrevocably, and non-retractably, with nothing to be claimed regarding rights related to my image, voice, or any other.",
        p4: "This authorization covers the use of the image and voice throughout the national and international territory, for an indefinite period, in all its forms and without limitation of time or number of uses.",
        p5: "The GRANTOR declares that he/she is the sole and exclusive owner of all rights to the submitted video, and that it does not violate any third-party rights, including intellectual property rights, image rights, or privacy.",
        p6: "As this is the expression of my will, I declare that I authorize the use described above with nothing to be claimed regarding rights related to my image, voice, or any other, and I sign this authorization, which will be electronically validated upon acceptance in the submission form."
      },
      term_voluntary: {
        title: "VOLUNTARY PARTICIPATION AGREEMENT",
        p1: "I, {name}, of {nationality} nationality, {maritalStatus} marital status, {profession} profession, holder of ID card No. {rg} and CPF No. {cpf}, residing at {address}, hereinafter referred to as the PARTICIPANT, by this instrument, DECLARE and AGREE to the terms and conditions below, regarding my voluntary participation in the project \"Jardel Borges's Biographical Project - The Miracle of Reframing\".",
        list_item1_title: "OBJECT OF PARTICIPATION:",
        list_item1_content: "This declaration refers to my voluntary participation in the project, which aims to produce a book and related materials about the life story and overcoming of Jardel Borges, through the submission of a video testimony.",
        list_item2_title: "VOLUNTARY AND FREE NATURE:",
        list_item2_content: "The PARTICIPANT declares that his/her participation in the said project is strictly voluntary and free of charge, with no employment, corporate, associative, or any other type of relationship that implies remuneration, financial compensation, or any kind of economic benefit, present or future.",
        list_item3_title: "NO BINDING RELATIONSHIP:",
        list_item3_content: "The PARTICIPANT acknowledges and agrees that his/her participation does not create any type of employment, labor, social security, or any other kind of relationship with the organizers, collaborators, or partners of the project, nor with Jardel Borges.",
        list_item4_title: "AWARENESS AND FREEDOM:",
        list_item4_content: "The PARTICIPANT declares that the decision to participate in the project and to submit his/her video testimony was made freely, spontaneously, and consciously, without any kind of coercion, pressure, or expectation of financial or material consideration.",
        list_item5_title: "USE OF TESTIMONY:",
        list_item5_content: "The PARTICIPANT is aware that the video testimony may be used for the purposes of the project, as detailed in the Image and Voice Use Authorization Agreement, including, but not limited to, inclusion in the book, dissemination on social media, and promotional materials. The PARTICIPANT agrees to the editing and adaptation of the material, provided that it does not distort the original meaning of his/her message.",
        list_item6_title: "PARTICIPANT'S DECLARATIONS:",
        list_item6_content: "The PARTICIPANT declares, under penalty of law, that:",
        sublist_item1: "He/She has full civil capacity to enter into this Agreement;",
        sublist_item2: "The content of the submitted video is his/her own authorship and does not violate any third-party rights, including copyright, image, or privacy rights;",
        sublist_item3: "He/She is aware of and agrees to all the conditions set forth in this Agreement.",
        list_item7_title: "ELECTRONIC ACCEPTANCE:",
        list_item7_content: "By checking the corresponding checkbox and proceeding with the submission of the testimony, the PARTICIPANT declares to have read, understood, and fully agreed to all the clauses and conditions of this Voluntary Participation Agreement, giving it full legal validity as if it were physically signed.",
        list_item8_title: "JURISDICTION:",
        list_item8_content: "The jurisdiction of the district of [City/State] is chosen to settle any doubts or disputes arising from this Agreement, with express waiver of any other, however privileged it may be."
      }
    }
  }
};

type Language = 'pt' | 'en' | 'es';

interface TranslationContextType {
  t: (key: string) => string | string[];
  language: Language;
  setLanguage: (language: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Tenta recuperar o idioma salvo no localStorage, ou usa 'pt' como padrão
    const saved = localStorage.getItem('language') as Language;
    return saved || 'pt';
  });

  useEffect(() => {
    // Salva o idioma selecionado no localStorage
    localStorage.setItem('language', language);
    // Atualiza o atributo lang do HTML para acessibilidade
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((key: string): string | string[] => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }

    // Se a tradução não for encontrada, retorna a chave ou a versão em português
    if (value === undefined) {
      console.warn(`Translation missing for key "${key}" in language "${language}"`);
      return translations.pt[keys[0]]?.[keys[1]] || key;
    }

    return value;
  }, [language]);

  const value = useMemo(() => ({
    t,
    language,
    setLanguage
  }), [t, language]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

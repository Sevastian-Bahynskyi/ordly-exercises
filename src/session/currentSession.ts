import type { PracticeSession } from '../types'

export const currentSession: PracticeSession = {
  id: '2026-09-22-a1-weak-words-v1',
  title: 'Today’s Danish practice',
  subtitle: 'Short A1 exercises based on your weak and new words.',
  level: 'A1',
  exercises: [
    {
      id: 'match-core-1', type: 'match', title: 'Match the meanings',
      focusWords: ['få','besøge','bange','kun'],
      pairs: [
        { left: 'få', right: 'получать' },
        { left: 'besøge', right: 'навещать' },
        { left: 'bange', right: 'испуганный / бояться' },
        { left: 'kun', right: 'только' },
      ],
      explanation: 'These are four high-priority words from your current learning set.',
    },
    {
      id: 'choice-kun', type: 'choice', title: 'Choose the right word',
      prompt: 'Jeg har ___ ti minutter.', options: ['kun','lige','hvor'], answer: 'kun',
      focusWords: ['kun'], explanation: 'Jeg har kun ti minutter. = У меня только десять минут.',
    },
    {
      id: 'drag-faa', type: 'drag-gap', title: 'Complete the sentence',
      before: 'Jeg', after: 'en besked.', options: ['får','slår','besøger'], answer: 'får',
      focusWords: ['få'], explanation: 'Jeg får en besked. = Я получаю сообщение.',
    },
    {
      id: 'order-besoeg', type: 'order', title: 'Build the sentence',
      tokens: ['min','ven.','Jeg','besøger'], answer: ['Jeg','besøger','min','ven.'],
      focusWords: ['besøge'], explanation: 'Jeg besøger min ven. = Я навещаю моего друга.',
    },
    {
      id: 'binary-bange', type: 'binary', title: 'True or false?',
      statement: '“Jeg er bange for hunde.” means “Я боюсь собак.”', correct: true,
      focusWords: ['bange'], explanation: 'The useful pattern is: være bange for + something.',
    },
    {
      id: 'dialogue-sige', type: 'dialogue', title: 'Choose the reply',
      speakerA: 'Undskyld, jeg forstår ikke.', speakerBPrompt: 'What should you say?',
      options: ['Kan du sige det igen?','Hvor bor du?','Jeg er bange.'], answer: 'Kan du sige det igen?',
      focusWords: ['sige'], explanation: 'Kan du sige det igen? = Можешь сказать это ещё раз?',
    },
    {
      id: 'type-hvor', type: 'type', title: 'Write a short question',
      prompt: 'How do you say “Где ты живёшь?” in Danish?', accepted: ['Hvor bor du?','Hvor bor du'],
      focusWords: ['hvor'], placeholder: 'Hvor …', answerLabel: 'Answer',
      explanation: 'Hvor = where. A very useful A1 question.',
    },
    {
      id: 'listen-sige', type: 'listen-choice', title: 'Listen and choose',
      text: 'Kan du sige det igen?', options: ['Можешь сказать это ещё раз?','Ты где живёшь?','Я скоро приду.'],
      answer: 'Можешь сказать это ещё раз?', focusWords: ['sige'],
      explanation: 'Try to recognise the whole phrase, not each word separately.',
    },
    {
      id: 'odd-pronouns', type: 'odd-one-out', title: 'Odd one out',
      prompt: 'Three are people/pronouns. One is not.', items: ['hun','du','jeg','hvor'], answer: 'hvor',
      focusWords: ['hun','hvor'], explanation: 'hvor = where. The others refer to people.',
    },
    {
      id: 'sort-action-time', type: 'category-sort', title: 'Sort the words',
      categories: ['Verb','Not a verb'],
      items: [
        { text: 'besøge', category: 'Verb' },
        { text: 'sige', category: 'Verb' },
        { text: 'kun', category: 'Not a verb' },
        { text: 'lige', category: 'Not a verb' },
      ],
      focusWords: ['besøge','sige','kun','lige'],
      explanation: 'besøge and sige are verbs. kun and lige are not verbs.',
    },
    {
      id: 'flash-noedvendig', type: 'flash-reveal', title: 'Recall the meaning',
      prompt: 'nødvendig', answer: 'необходимый / нужный', focusWords: ['nødvendig'],
      explanation: 'You have struggled with this word several times, so active recall matters here.',
    },
    {
      id: 'choice-noedvendigt', type: 'choice', title: 'Choose the natural form',
      prompt: 'Det er ___ .', options: ['nødvendigt','nødvendig','bange'], answer: 'nødvendigt',
      focusWords: ['nødvendig'], explanation: 'With “det er”, the adjective is often the neuter form: nødvendigt.',
    },
    {
      id: 'match-new-1', type: 'match', title: 'Match new words',
      pairs: [
        { left: 'ville', right: 'хотел бы / хотел' },
        { left: 'sig', right: 'себя' },
        { left: 'nu', right: 'сейчас' },
        { left: 'ud', right: 'наружу / из' },
      ],
      focusWords: ['ville','sig','nu','ud'],
      explanation: 'These are common words worth recognising quickly.',
    },
    {
      id: 'drag-sig', type: 'drag-gap', title: 'Complete the sentence',
      before: 'Han vasker', after: '.', options: ['sig','sin','hun'], answer: 'sig',
      focusWords: ['sig'], explanation: 'Han vasker sig. = Он моется.',
    },
    {
      id: 'order-ville', type: 'order', title: 'Build the sentence',
      tokens: ['gerne','Jeg','kaffe.','vil','have'], answer: ['Jeg','vil','gerne','have','kaffe.'],
      focusWords: ['ville'], explanation: 'Jeg vil gerne have kaffe. = Я хотел бы кофе.',
    },
    {
      id: 'choice-lige', type: 'choice', title: 'Choose the right word',
      prompt: 'Jeg er ___ kommet hjem. (Я только что пришёл домой.)', options: ['lige','kun','hvor'], answer: 'lige',
      focusWords: ['lige'], explanation: 'lige can mean “just / just now” in this context.',
    },
    {
      id: 'binary-nogensinde', type: 'binary', title: 'True or false?',
      statement: '“Har du nogensinde været i Sverige?” asks if you have ever been to Sweden.', correct: true,
      focusWords: ['nogensinde'], explanation: 'nogensinde = ever, often used in questions.',
    },
    {
      id: 'type-nogensinde', type: 'type', title: 'Complete the question',
      prompt: 'Har du ___ set en hval?', accepted: ['nogensinde'], placeholder: 'one word',
      focusWords: ['nogensinde'], answerLabel: 'Answer', explanation: 'Har du nogensinde …? = Have you ever …?',
    },
    {
      id: 'listen-hvor', type: 'listen-choice', title: 'Listen and choose',
      text: 'Hvor bor du?', options: ['Где ты живёшь?','Как тебя зовут?','Куда ты идёшь?'], answer: 'Где ты живёшь?',
      focusWords: ['hvor'], explanation: 'Hvor bor du? is one of the most useful A1 questions.',
    },
    {
      id: 'dialogue-besoeg', type: 'dialogue', title: 'Choose what fits',
      speakerA: 'Hvad laver du i weekenden?', speakerBPrompt: 'You want to say you visit your friend.',
      options: ['Jeg besøger min ven.','Jeg får min ven.','Jeg slår min ven.'], answer: 'Jeg besøger min ven.',
      focusWords: ['besøge'], explanation: 'besøge = to visit.',
    },
  ],
}

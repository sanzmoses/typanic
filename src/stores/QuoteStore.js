import { defineStore } from 'pinia'

export const useQuoteStore = defineStore('QuoteStore', {
    state: () => ({
      quotes: [
        {
            words: 'It always seems impossible until its done.',
            author: 'Nelson Mandela'  
        },
        {
            words: 'Believe and act as if it were impossible to fail.',
            author: 'Charles Kettering'
        },
        {
            words: 'Worry is a misuse of your imagination.',
            author: 'Dan Zadra'
        },
        {
            words: 'Fortune favors the prepared mind.',
            author: 'Louis Pasteur'
        },
        {
            words: 'Work until your idols become rivals.',
            author: 'Anonymous'
        },
        {
            words: 'You are your own limit.',
            author: 'Anonymous'
        },
        {
            words: 'Carpe Diem!',
            author: 'Horace'
        },
        {
            words: 'He who is brave is free.',
            author: 'Seneca'
        },
        {
            words: 'Life, if well lived, is long enough.',
            author: 'Seneca'
        },
        {
            words: 'Well begun is half done.',
            author: 'Aristotle'
        },
        {
            words: 'Smile, breathe, and go slowly.',
            author: 'Thich Nhat Hanh'
        },
        {
            words: 'Good software, like wine, takes time.',
            author: 'Joel Spolsky'
        },
        {
            words: '2b || !2b, That is the question.',
            author: 'Anonymous'
        },
        {
            words: 'While (!successful) { try() };',
            author: 'Anonymous'
        },
        {
            words: 'First, solve the problem. Then, write the code.',
            author: 'John Johnson'
        },
        {
            words: 'The more you sweat in practice, the less you bleed in battle.',
            author: 'Anonymous'
        },
        {
            words: 'The best way to predict the future is to to create it.',
            author: 'Abraham Lincoln'
        },
        {
            words: 'One line of code at a time.',
            author: 'Anonymous'
        },
        {
            words: 'The more you sweat in practice, the less you bleed in battle.',
            author: 'Anonymous'
        },
        {
            words: 'The best way to predict the future is to to create it.',
            author: 'Abraham Lincoln'
        },
      ]
    }),
    actions: {
      SET_SKILL(data) {
        this.skills.push(data)
      },
    },
})
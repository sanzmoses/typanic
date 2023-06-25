import { defineStore } from 'pinia'

export const useExpStore = defineStore('ExpStore', {
    state: () => ({
      experience: [
        {
          id: 10,
          company: 'ZTM Academy',
          address: 'Udemy Course',
          role: 'Student',
          experience: {
            type: 'Online Course',
            description: 'Javascript: The Advanced Concepts', 
          },
          datestamp: {
            start: '2023-01-01',
            end: '2023-31-01'
          },
          description: 'Key concepts, best practices and latest features of Javascript.'
        },
        {
          id: 9,
          company: 'RemotePro.ph',
          address: 'Davao City',
          role: 'Front End Developer',
          experience: {
            type: 'Employment',
            description: 'Self-employed',
          },
          datestamp: {
            start: '2021-02-01',
            end: 'present'
          },
          description: 'Develops web app as front-end developer for an engineering firm using vue and laravel'
        },
        {
          id: 8,
          company: 'Link Value Inc.',
          address: 'Davao City',
          role: 'Front End Developer',
          experience: {
            type: 'Employment',
            description: 'Self-employed',
          },
          datestamp: {
            start: '2020-02-01',
            end: '2021-10-01'
          },
          description: 'Develops web app as front-end developer - with Vue and Nuxt as JS framework, UIKit as library and GIT as version control. Working on Social site for a crypto coin in thailand called LVC.'
        },
        {
          id: 7,
          company: 'Cre8iv.click',
          address: 'Sydney, Australia',
          role: 'Front-end Developer',
          experience: {
            type: 'Employment',
            description: 'Full-time',
          },
          datestamp: {
            start: '2019-08-01',
            end: '2020-01-01'
          },
          description: 'Develops websites for clients and uses mostly plain CSS and Javascript, UIKIT as library, GIT as version control.'
        },
        {
          id: 6,
          company: 'OptiDig AB.',
          address: 'Sweden, UK, Philippines',
          role: 'Full-stack Web Developer',
          experience: {
            type: 'Employment',
            description: 'Remote',
          },
          datestamp: {
            start: '2019-04-01',
            end: '2019-08-01'
          },
          description: 'Development of plugins in a web marketing app,  and automated testings using selenium and codeception.'
        },
        {
          id: 5,
          company: 'Synapsetech Enterpries Inc.',
          address: 'Davao City',
          role: 'Full-stack Web Developer',
          experience: {
            type: 'Side Project',
            description: 'Freelance',
          },
          datestamp: {
            start: '2019-02-01',
            end: '2019-04-01'
          },
          description: 'Development of web app using Laravel and VueJS, and Gitlab CI for automated deployment. Involved in the whole Software Development Life Cycle, design, implementation, production, update and maintenance.'
        },
        {
          id: 4,
          company: 'U:Hack X Tech Up Agri Hackathon',
          address: 'Azuela Cove, Davao City',
          role: 'Front-end',
          experience: {
            type: 'Event', 
            description: 'Hackathon',
          },
          datestamp: {
            start: '2018-08-25',
            end: '2018-08-26'
          },
          description: 'Prototype for a block chain app called AXONN'
        },
        {
          id: 3,
          company: 'Vizwoz SDS Inc.',
          address: 'FTC Tower, Malvar St. Davao City.',
          role: 'Web Developer',
          experience: {
            type: 'Employment', // Event
            description: 'Full-time', // Hackathon
          },
          datestamp: {
            start: '2018-04-01',
            end: '2019-02-01'
          },
          description: 'Developing and maintaining cms, microsites and web applications for marketing purpose using Wordpress, OctoberCMS and Laravel framework. Assigned in both back-end and front-end tasks as well as documentations. Working with tools like Git, Gitlab CI, APIs and SaaS integrations.'
        },
        {
          id: 2,
          company: 'PLDT 88 Hackathon Challenge',
          address: 'PLDT Innolab, Ponciano st. Davao City',
          role: 'Backend',
          experience: {
            type: 'Event',
            description: 'Hackathon',
          },
          datestamp: {
            start: '2016-11-19',
            end: '2016-11-20'
          },
          description: 'Trying to build a prototype of a smart kiosk machine, just for the sake of it, using Arduino and Java as backend for data storage'
        },
        {
          id: 1,
          company: 'St. John Paul II College of Davao',
          address: 'Davao City',
          role: 'Student',
          experience: {
            type: 'Bachelor',
            description: 'B.S. Information Technology', 
          },
          datestamp: {
            start: '2014-11-01',
            end: '2018-04-21'
          },
          description: ''
        },
      ],
    }),
})
